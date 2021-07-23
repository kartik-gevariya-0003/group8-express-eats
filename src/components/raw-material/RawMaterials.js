// Author: Karishma Suresh Lalwani
/*
* Functionality for displaying all the raw material details in the system
* which also includes search, edit and delete features.
* */

import React from "react";
import {Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import ApplicationContainer from "../ApplicationContainer";
import axios from "axios";
import {DELETE_RAW_MATERIAL, GET_RAW_MATERIALS} from "../../config";
import {toast} from "react-toastify";

export default class RawMaterials extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.originalRawMaterialsList = [];
    this.state = {
      loading: false,
      rawMaterialList: [],
      deleteRawMaterialModal: {
        show: false,
        id: -1,
        rawMaterialName: " "
      }
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      const headers = {
        'Authorization': 'Bearer ' + user.token
      }
      this.getRawMaterials(headers)
    }
  }

  // GET API call to fetch all the raw material details in the system
  getRawMaterials = (headers) => {
    this.setState({loading: true})
    axios.get(GET_RAW_MATERIALS, {headers: headers}).then(result => {
      let rawMaterials = result.data['rawMaterials']
      this.originalRawMaterialsList = rawMaterials;
      this.setState({rawMaterialList: rawMaterials})
      this.setState({loading: false})
    }).catch(error => {
      console.log(error)
      toast.error("Error while fetching raw materials");
      this.setState({loading: false})
    })
  }

  goToAddRawMaterial(event) {
    this.props.history.push('/raw-material/add')
  }

  goToEditRawMaterial = (rawMaterial) => {
    this.props.history.push({
      pathname: "/raw-material/update",
      state: rawMaterial.id,
    });
  }

  //DELETE API call to delete a raw material
  deleteRawMaterial(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      const headers = {
        'Authorization': 'Bearer ' + user.token
      }
      this.setState({loading: false})
      axios.delete(DELETE_RAW_MATERIAL + id, {headers: headers}).then(() => {
        this.getRawMaterials(headers)
        toast.success("Raw material deleted successfully.")
        this.closeModal();
      }).catch(error => {
        this.setState({loading: false});
        console.log(error);
        toast.error("Error while deleting the raw material");
      })
    }
  }

  showModal = (rawMaterial) => {
    let state = {...this.state};
    state.deleteRawMaterialModal.show = true;
    state.deleteRawMaterialModal.id = rawMaterial.id;
    state.deleteRawMaterialModal.rawMaterialName = rawMaterial.rawMaterialName;
    this.setState(state);
  };

  closeModal = () => {
    let state = {...this.state};
    state.deleteRawMaterialModal.show = false;
    state.deleteRawMaterialModal.id = -1;
    state.deleteRawMaterialModal.rawMaterialName = "";
    this.setState(state);
  };

  // Search-bar functionality
  filterRawMaterial = (e) => {
    e.preventDefault();
    const {value} = e.target;
    this.setState({
      rawMaterialList: this.originalRawMaterialsList.filter((rawMaterial) =>
        rawMaterial.rawMaterialName.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  render() {
    return (
      <section className={"pb-5"}>
        {super.render()}
        {this.state.loading && (
          <div className="dialog-background">
            <div className="dialog-loading-wrapper">
              <img
                src={"/confirmation.gif"}
                alt={"Loading..."}
                className={"loading-img"}
              />
            </div>
          </div>
        )}
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Raw Materials</h2>
            <hr/>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={8} className={"text-left"}>
            <Button variant={"primary"} onClick={this.goToAddRawMaterial.bind(this)}>
              Add Raw Material
            </Button>
          </Col>
          <Col sm={4}>
            <InputGroup>
              <FormControl placeholder="Search" onChange={this.filterRawMaterial}
                           aria-label="Search" aria-describedby="search-control"/>
              <InputGroup.Append>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch}/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={12}>
            <Card>
              <Card.Body>
                <ListGroup className={"mt-3"}>
                  <ListGroup.Item>
                    <Row>
                      <Col sm={3} className={"pl-3 text-left"}>
                        <h5>
                          <span><strong>Name</strong></span>
                        </h5>
                      </Col>
                      <Col sm={2} className={"pl-3 text-left"}>
                        <h5>
                          <span><strong>Vendor</strong></span>
                        </h5>
                      </Col>
                      <Col sm={3} className={"pl-3 text-left"}>
                        <h5>
                          <span><strong>Unit Measurement</strong></span>
                        </h5>
                      </Col>
                      <Col sm={2} className={"pl-3 text-left"}>
                        <h5>
                          <span><strong>Price</strong></span>
                        </h5>
                      </Col>
                      <Col sm={2}>
                        <h5>
                          <span><strong>Action</strong></span>
                        </h5>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {this.state.rawMaterialList.length !== 0 ?
                    <section className={"po-selected-raw-material-list"}>
                      {this.state.rawMaterialList.map((item) =>
                        <ListGroup.Item key={item.rawMaterialName}>
                          <Row>
                            <Col sm={3} className={"pl-3 text-left"}>
                              <h6>
                                <span>{item.rawMaterialName}</span>
                              </h6>
                            </Col>
                            <Col sm={2} className={"pl-3 text-left"}>
                              <h6>
                                <span>{item.vendors.map(vendor => vendor.vendorName).join(", ")}</span>
                              </h6>
                            </Col>
                            <Col sm={3} className={"pl-3 text-left"}>
                              <h6>
                                <span>{item.unitMeasurement}</span>
                              </h6>
                            </Col>
                            <Col sm={2} className={"pl-3 text-left"}>
                              <h6>
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(item.unitCost)}
                              </h6>
                            </Col>
                            <Col sm={2}>
                              <FontAwesomeIcon icon={faPen} className={"mr-5"}
                                               color={"#035384AA"}
                                               onClick={() => this.goToEditRawMaterial(item)}/>
                              <FontAwesomeIcon icon={faTrashAlt} color={"#BC3347CC"}
                                               onClick={() => {
                                                 this.showModal(item);
                                               }}/>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      <Modal
                        show={this.state.deleteRawMaterialModal.show}
                        animation={false}
                        onHide={this.closeModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Group>
                            <Form.Label className={"m-0"}>
                              Are you sure you want to delete{" "}
                              <strong>
                                {this.state.deleteRawMaterialModal.rawMaterialName}
                              </strong>?
                            </Form.Label>
                          </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="primary"
                            onClick={() =>
                              this.deleteRawMaterial(this.state.deleteRawMaterialModal.id)
                            }>
                            Yes
                          </Button>
                          <Button variant="danger" onClick={this.closeModal}>
                            No
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </section>
                    :
                    <ListGroup.Item>No raw material available.</ListGroup.Item>
                  }
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}


