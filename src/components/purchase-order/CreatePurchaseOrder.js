/**
 * Author: Kartik Gevariya
 */
import './purchase-order.css';
import React from 'react';
import {Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Modal, Row} from "react-bootstrap";
import Select from "react-select";
import {faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ApplicationContainer from "../ApplicationContainer";
import {toast} from "react-toastify";
import axios from "axios";
import {GET_VENDORS, GET_RAW_MATERIALS, CREATE_PURCHASE_ORDER} from "../../config";

let vendors = [];
let rawMaterials = [];
let mounted = true;

export default class CreatePurchaseOrder extends ApplicationContainer {
  constructor(props) {
    super(props)

    let currentDate = Date.now();

    this.state = {
      loading: false,
      rawMaterials: rawMaterials,
      vendors: vendors,
      order: {
        orderNumber: 'PO-' + currentDate,
        selectedVendor: '',
        selectedRawMaterials: [],
        totalCost: 0
      },
      rawMaterialQuantityModal: {
        show: false,
        selectedRawMaterial: '',
        selectedRawMaterialQuantity: 0
      },
      isError: {
        selectedVendor: '',
        selectedRawMaterials: '',
        selectedRawMaterialQuantity: ''
      }
    }
  }

  componentDidMount = async () => {
    this.setState({loading: true});

    await axios
      .get(GET_VENDORS)
      .then((response) => {
        this.setState({loading: false});

        vendors = response.data.vendors;

        this.setState({
          vendors: vendors,
        });
      })
      .catch((error) => {
        this.setState({loading: false});
        console.error(error);
        toast.error("Error occurred while fetching vendors.");
      });

    await axios
      .get(GET_RAW_MATERIALS)
      .then((response) => {
        this.setState({loading: false});

        rawMaterials = response.data.rawMaterials;

        this.setState({
          rawMaterials: rawMaterials,
        });
      })
      .catch((error) => {
        this.setState({loading: false});
        console.error(error);
        toast.error("Error occurred while fetching raw materials.");
      });
  }

  componentWillUnmount() {
    mounted = false;
  }

  formatVendorOption = ({vendorName, contactPersonName}) => (
    <Row className="d-flex">
      <Col>{vendorName}</Col>
      <Col className="ml-3 select-option-city">
        <small>{contactPersonName}</small>
      </Col>
    </Row>
  );

  filterRawMaterial = (e) => {
    e.preventDefault();
    const {value} = e.target;

    this.setState({
      rawMaterials: rawMaterials.filter(rawMaterial => rawMaterial.rawMaterialName.toLowerCase().includes(value.toLowerCase()))
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();

    let isError = {...this.state.isError};

    this.validator('vendor', this.state.order.selectedVendor, isError);
    this.validator('rawMaterials', this.state.order.selectedRawMaterials, isError);

    let isValid = true;
    Object.values(isError).forEach(error => {
      if (error.length > 0) {
        isValid = false
      }
    });

    if (isValid) {
      let bodyData = {
        orderNumber: this.state.order.orderNumber,
        totalCost: this.state.order.totalCost,
        vendorId: this.state.order.selectedVendor.id,
        selectedRawMaterials: this.state.order.selectedRawMaterials
      }

      this.setState({loading: true});

      await axios
        .post(CREATE_PURCHASE_ORDER, bodyData)
        .then((response) => {
          this.setState({loading: false});
          toast.success("Purchase Order created successfully. !");
          this.props.history.push({
            pathname: '/purchase-orders'
          });
        })
        .catch((error) => {
          this.setState({loading: false});
          console.error(error);
          toast.error("Purchase Order was not added. Please try again. !");
        });
    }

    if (mounted) {
      this.setState({
        isError: isError
      });
    }
  };

  onVendorSelect = (selectedVendor) => {

    let state = {...this.state};

    state.order.selectedVendor = {...selectedVendor};

    this.validator('vendor', this.state.order.selectedVendor, state.isError);

    this.setState(state);
  }

  validator = (name, value, isError) => {
    switch (name) {
      case "modalRawMaterialQuantity":
        isError.selectedRawMaterialQuantity = "";
        if (value.length === 0 || value <= 0) {
          isError.selectedRawMaterialQuantity = "Quantity should be greater than 0";
        }
        break;
      case "vendor":
        isError.selectedVendor = "";
        if (!value || value.length === 0) {
          isError.selectedVendor = "Please select vendor";
        }
        break;
      case "rawMaterials":
        isError.selectedRawMaterials = "";
        if (value.length === 0) {
          isError.selectedRawMaterials = "Please select one or more raw materials";
        }
        break;
      default:
        break;
    }
  }

  addRawMaterial = rawMaterial => {
    let state = {...this.state};

    state.rawMaterialQuantityModal.selectedRawMaterial = {...rawMaterial};

    this.setState(state);

    this.showModal();
  };

  deleteRawMaterial = rawMaterial => {
    let state = {...this.state};

    state.order.selectedRawMaterials = state.order.selectedRawMaterials.filter(e => e.id !== rawMaterial.id);

    state.order.totalCost -= (rawMaterial.unitCost * rawMaterial.quantity);

    this.validator('rawMaterials', this.state.order.selectedRawMaterials, state.isError);

    this.setState(state);
  };

  closeModal = () => {
    let state = {...this.state};

    state.rawMaterialQuantityModal.show = false;

    this.setState(state);
  }

  addRawMaterialToOrder = (e) => {
    e.preventDefault();

    let state = {...this.state};

    if (state.rawMaterialQuantityModal.selectedRawMaterialQuantity > 0) {
      state.rawMaterialQuantityModal.selectedRawMaterial['quantity'] = parseFloat(state.rawMaterialQuantityModal.selectedRawMaterialQuantity);

      let rawMaterialFound = false;
      state.order.selectedRawMaterials.forEach(rawMaterial => {
        if (rawMaterial.id === state.rawMaterialQuantityModal.selectedRawMaterial.id) {
          rawMaterial.quantity += parseFloat(state.rawMaterialQuantityModal.selectedRawMaterialQuantity);
          state.order.totalCost += (state.rawMaterialQuantityModal.selectedRawMaterial.unitCost * state.rawMaterialQuantityModal.selectedRawMaterialQuantity);
          rawMaterialFound = true;
        }
      });

      if (!rawMaterialFound) {
        state.order.selectedRawMaterials.push(state.rawMaterialQuantityModal.selectedRawMaterial);
        state.order.totalCost += (state.rawMaterialQuantityModal.selectedRawMaterial.unitCost * state.rawMaterialQuantityModal.selectedRawMaterialQuantity);
      }

      state.rawMaterialQuantityModal.selectedRawMaterial = '';
      state.rawMaterialQuantityModal.selectedRawMaterialQuantity = 0;
      state.rawMaterialQuantityModal.show = false;

      this.validator('rawMaterials', this.state.order.selectedRawMaterials, state.isError);
    } else {
      this.validator('modalRawMaterialQuantity', 0, state.isError);
    }

    this.setState(state);
  }

  rawMaterialQuantityChangeListener = e => {
    e.preventDefault();
    const {name, value} = e.target;
    let state = {...this.state};

    this.validator(name, value, state.isError);

    state.rawMaterialQuantityModal.selectedRawMaterialQuantity = value;

    this.setState(state);
  };

  showModal = () => {
    let state = {...this.state};

    state.rawMaterialQuantityModal.show = true;

    this.setState(state);
  }

  render() {
    const {isError} = this.state;

    return (
      <section>
        {this.state.loading &&
        <div className="dialog-background">
          <div className="dialog-loading-wrapper">
            <img src={"/confirmation.gif"} alt={"Loading..."} className={"loading-img"}/>
          </div>
        </div>
        }
        {super.render()}
        <Row className={"m-3"}>
          <Col sm={5}>
            <Card>
              <Card.Body>
                <Card.Title>Order Details</Card.Title>
                <Card.Text>
                  <strong>Order Number:</strong> {this.state.order.orderNumber}
                </Card.Text>
                {this.state.order.selectedVendor &&
                (
                  <Card.Text>
                    <strong>Vendor :</strong> {this.state.order.selectedVendor.vendorName}
                  </Card.Text>
                )
                }
                {this.state.order.selectedRawMaterials && this.state.order.selectedRawMaterials.length > 0 &&
                (
                  <section className={"mt-5"}>
                    <strong>Selected Raw Materials</strong>
                    <ListGroup className={"mt-3 po-selected-raw-material-list"}>
                      {this.state.order.selectedRawMaterials.map((rawMaterial) =>
                        <ListGroup.Item key={rawMaterial.id}>
                          <Row>
                            <Col sm={4} className={"pl-3 text-left"}>
                              <h6>
                                <span>{rawMaterial.rawMaterialName}</span>
                                <br/>
                                <span><small>Unit Measurement: {rawMaterial.unitMeasurement}</small></span>
                              </h6>
                            </Col>
                            <Col sm={4} className={"pl-3"}>
                              <h6>
                                <span><strong>Quantity</strong></span>
                                <br/>
                                <span>{rawMaterial.quantity}</span>
                              </h6>
                            </Col>
                            <Col sm={3}>
                              <h6>
                                <span><strong>Unit Price</strong></span>
                                <br/>
                                <span>${rawMaterial.unitCost}</span>
                              </h6>
                            </Col>
                            <Col sm={1}>
                              <FontAwesomeIcon icon={faTrashAlt} color={"#ba2311"}
                                               onClick={() => this.deleteRawMaterial(rawMaterial)}/>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </section>
                )
                }
                <Card.Text className="mt-5">
                  <strong>Total Cost :</strong> {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(this.state.order.totalCost)}
                </Card.Text>
                <Button variant={"primary"} className="mt-3" onClick={this.onSubmit} block>Create Order</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={7}>
            <Card>
              <Card.Body className={"text-left"}>
                <Card.Title>New Purchase Order</Card.Title>
                <Row className={"mt-3"}>
                  <Col sm={12}>
                    <Form.Group controlId="vendor">
                      <Form.Label><strong>Vendor</strong></Form.Label>
                      <Select
                        isClearable
                        className={isError.selectedVendor ? "is-invalid" : ""}
                        formatOptionLabel={this.formatVendorOption}
                        options={this.state.vendors}
                        placeholder="Select Vendor"
                        onChange={this.onVendorSelect}
                      />
                      {isError.selectedVendor.length > 0 && (
                        <Form.Control.Feedback
                          type={"invalid"}>{isError.selectedVendor}</Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={"mt-3"}>
                  <Col>
                    <Form.Group controlId="rawMaterials">
                      <Row>
                        <Col sm={7} className={"pt-2"}>
                          <Form.Label><strong>Raw Materials</strong></Form.Label>
                        </Col>
                        <Col sm={5}>
                          <InputGroup>
                            <FormControl placeholder="Search"
                                         onChange={this.filterRawMaterial}
                                         aria-label="Search"
                                         aria-describedby="search-control"/>
                            <InputGroup.Append>
                              <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch}/>
                              </InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Col>
                      </Row>
                      {this.state.rawMaterials.length !== 0 ?
                        <ListGroup
                          className={isError.selectedRawMaterials.length > 0 ? "is-invalid mt-3 po-raw-material-list" : "mt-3 po-raw-material-list"}>
                          {this.state.rawMaterials.map((rawMaterial) =>
                            <ListGroup.Item key={rawMaterial.id}>
                              <Row>
                                <Col sm={5} className={"pl-3"}>
                                  <h6>
                                    <span>{rawMaterial.rawMaterialName}</span>
                                    <br/>
                                    <span><small>Unit Measurement: {rawMaterial.unitMeasurement}</small></span>
                                  </h6>
                                </Col>
                                <Col sm={5}>
                                  <h6>
                                    <span><strong>Unit Price:</strong></span>
                                    <span> ${rawMaterial.unitCost}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <Button variant={"secondary"}
                                          onClick={() => this.addRawMaterial(rawMaterial)}>Add</Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}
                        </ListGroup>
                        :
                        <ListGroup className={"mt-3 po-raw-material-list"}><ListGroup.Item>No raw materials found.</ListGroup.Item></ListGroup>
                      }
                      {isError.selectedRawMaterials.length > 0 && (
                        <Form.Control.Feedback
                          type={"invalid"}>{isError.selectedRawMaterials}</Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Modal show={this.state.rawMaterialQuantityModal.show} animation={false} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Quantity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className={"m-0"}><strong>Raw Material</strong></Form.Label>
                <Form.Control plaintext readOnly
                              defaultValue={this.state.rawMaterialQuantityModal.selectedRawMaterial.rawMaterialName}
                              className={"p-0"}/>
              </Form.Group>
              <Form.Group>
                <Form.Label><strong>Quantity : </strong></Form.Label>
                <Form.Control
                  name={"modalRawMaterialQuantity"}
                  type="number"
                  step=".01"
                  onChange={this.rawMaterialQuantityChangeListener}
                  className={isError.selectedRawMaterialQuantity.length > 0 ? "is-invalid" : ""}
                  placeholder="Enter Quantity"/>
                {isError.selectedRawMaterialQuantity.length > 0 && (
                  <Form.Control.Feedback
                    type={"invalid"}>{isError.selectedRawMaterialQuantity}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.addRawMaterialToOrder}>Add to Order</Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </section>
    );
  }
}
