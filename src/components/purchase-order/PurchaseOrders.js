/**
 * Author: Kartik Gevariya
 */
import './purchase-order.css';
import React from 'react';
import {Accordion, Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Modal, Row} from "react-bootstrap";
import {faAngleDown, faAngleUp, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ApplicationContainer from "../ApplicationContainer";
import axios from "axios";
import {toast} from "react-toastify";
import {GET_PURCHASE_ORDERS, DELETE_PURCHASE_ORDER, PLACE_PURCHASE_ORDER, RECEIVE_PURCHASE_ORDER, ARCHIVE_PURCHASE_ORDER} from "../../config";

let openPurchaseOrders = []
let placedPurchaseOrders = []
let receivedPurchaseOrders = []

export default class PurchaseOrders extends ApplicationContainer {

  constructor(props) {
    super(props);

    this.state = {
      openPurchaseOrders: openPurchaseOrders,
      placedPurchaseOrders: placedPurchaseOrders,
      receivedPurchaseOrders: receivedPurchaseOrders,
      isOpenOrderAccordionOpen: true,
      isPlacedOrderAccordionOpen: true,
      isReceivedOrderAccordionOpen: true,
      loading: false,
      deleteModal: {
        show: false,
        order: {}
      }
    }
  }

  componentDidMount = async () => {
    this.setState({loading: true});

    await axios
      .get(GET_PURCHASE_ORDERS)
      .then((response) => {
        this.setState({loading: false});

        console.log(response);

        let allOrders = response.data.purchaseOrders;

        openPurchaseOrders = allOrders.filter(order => { return order.status === 'OPEN'});
        placedPurchaseOrders = allOrders.filter(order => { return order.status === 'PLACED'});
        receivedPurchaseOrders = allOrders.filter(order => { return order.status === 'RECEIVED'});

        this.setState({
          openPurchaseOrders: openPurchaseOrders,
          placedPurchaseOrders: placedPurchaseOrders,
          receivedPurchaseOrders: receivedPurchaseOrders
        });

        console.log(this.state);
      })
      .catch((error) => {
        this.setState({loading: false});
        console.error(error);
        toast.error("Error occurred while fetching purchase orders.");
      });
  }

  createPurchaseOrder = () => {
    this.props.history.push({
      pathname: '/purchase-order/create'
    });
  }

  filterOrders = (e) => {
    e.preventDefault();
    const {value} = e.target;

    this.setState({
      openPurchaseOrders: openPurchaseOrders.filter(order => order.orderNumber.toLowerCase().includes(value.toLowerCase())),
      placedPurchaseOrders: placedPurchaseOrders.filter(order => order.orderNumber.toLowerCase().includes(value.toLowerCase())),
      receivedPurchaseOrders: receivedPurchaseOrders.filter(order => order.orderNumber.toLowerCase().includes(value.toLowerCase()))
    });
  }

  deletePurchaseOrderConfirmation = (order) => {
    let state = {...this.state};

    state.deleteModal.order = order;

    this.setState(state);

    this.showModal();
  }

  deletePurchaseOrder = async (order) => {
    this.setState({loading: true});

    await axios
      .delete(DELETE_PURCHASE_ORDER + "/" + order.orderNumber)
      .then((response) => {
        this.setState({loading: false});
        toast.success("Purchase Order deleted successfully.");
        openPurchaseOrders = openPurchaseOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase());
        this.setState({
          openPurchaseOrders: this.state.openPurchaseOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase())
        });

        this.closeModal();
      })
      .catch((error) => {
        this.setState({loading: false});
        console.error(error);
        toast.error("Error occurred while deleting purchase orders.");

        this.closeModal();
      });
  }

  archivePurchaseOrder = async (order) => {
    this.setState({loading: true});

    await axios
      .post(ARCHIVE_PURCHASE_ORDER + "/" + order.orderNumber)
      .then((response) => {
        this.setState({loading: false});
        toast.success("Purchase Order archived successfully.");
        receivedPurchaseOrders = receivedPurchaseOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase());
        this.setState({
          receivedPurchaseOrders: this.state.receivedPurchaseOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase())
        });
      })
      .catch((error) => {
        this.setState({loading: false});
        console.error(error);
        toast.error("Error occurred while deleting purchase orders.");

        this.closeModal();
      });
  }

  placePurchaseOrder = async (order) => {
    this.setState({loading: true});

    await axios
      .post(PLACE_PURCHASE_ORDER + "/" + order.orderNumber)
      .then((response) => {
        this.setState({loading: false});
        toast.success("Purchase Order placed successfully.");
        let openOrders = [...this.state.openPurchaseOrders];
        let placedOrders = [...this.state.placedPurchaseOrders];

        openOrders = openOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase());
        placedOrders.unshift(order);
        console.log(placedOrders);
        this.setState({
          openPurchaseOrders: openOrders,
          placedPurchaseOrders: placedOrders
        });

        openPurchaseOrders = openPurchaseOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase());
        placedPurchaseOrders.unshift(order);
      })
      .catch((error) => {
        this.setState({loading: false});
        console.error(error);
        toast.error("Error occurred while deleting purchase orders.");

        this.closeModal();
      });
  }

  receivePurchaseOrder = async (order) => {
    this.setState({loading: true});

    await axios
      .post(RECEIVE_PURCHASE_ORDER + "/" + order.orderNumber)
      .then((response) => {
        this.setState({loading: false});
        toast.success("Purchase Order received successfully.");
        let placedOrders = [...this.state.placedPurchaseOrders];
        let receivedOrders = [...this.state.receivedPurchaseOrders];

        placedOrders = placedOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase());
        receivedOrders.unshift(order);
        this.setState({
          placedPurchaseOrders: placedOrders,
          receivedPurchaseOrders: receivedOrders
        });

        placedPurchaseOrders = placedPurchaseOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase());
        receivedPurchaseOrders.unshift(order);
      })
      .catch((error) => {
        this.setState({loading: false});
        console.error(error);
        toast.error("Error occurred while deleting purchase orders.");

        this.closeModal();
      });
  }

  toggleOpenOrderAccordion = event => {
    let state = {...this.state};
    state.isOpenOrderAccordionOpen = !state.isOpenOrderAccordionOpen;
    this.setState(state);
  }

  togglePlacedOrderAccordion = event => {
    let state = {...this.state};
    state.isPreppingOrderAccordionOpen = !state.isPreppingOrderAccordionOpen;
    this.setState(state);
  }

  toggleReceivedOrderAccordion = event => {
    let state = {...this.state};
    state.isPackagedOrderAccordionOpen = !state.isPackagedOrderAccordionOpen;
    this.setState(state);
  }

  showModal = () => {
    let state = {...this.state};

    state.deleteModal.show = true;

    this.setState(state);
  }

  closeModal = () => {
    let state = {...this.state};

    state.deleteModal.show = false;

    this.setState(state);
  }

  render() {
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
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Purchase Orders</h2>
            <hr/>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={8} className={"text-left"}>
            <Button variant={"primary"} onClick={this.createPurchaseOrder}>Create Purchase Order</Button>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <InputGroup>
                <FormControl placeholder="Search"
                             onChange={this.filterOrders}
                             aria-label="Search"
                             aria-describedby="search-control"/>
                <InputGroup.Append>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch}/>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={12}>
            <Accordion className={"text-left"} defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header}
                                  onClick={this.toggleOpenOrderAccordion}
                                  className={"po-list-header"} eventKey="0">
                  <Row>
                    <Col sm={11}>
                      <h4>Open Orders</h4>
                    </Col>
                    <Col sm={1} className={"text-right"}>
                      {
                        !this.state.isOpenOrderAccordionOpen &&
                        <FontAwesomeIcon size={"2x"} icon={faAngleDown} className={"secondary"}/>
                      }
                      {
                        this.state.isOpenOrderAccordionOpen &&
                        <FontAwesomeIcon size={"2x"} icon={faAngleUp} className={"secondary"}/>
                      }
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <ListGroup className={"mt-3"}>
                      <ListGroup.Item>
                        <Row>
                          <Col sm={2} className={"pl-3 text-left"}>
                            <h5>
                              <span><strong>Order Number</strong></span>
                            </h5>
                          </Col>
                          <Col sm={2} className={"pl-3"}>
                            <h5>
                              <span><strong>Vendor</strong></span>
                            </h5>
                          </Col>
                          <Col sm={3} className={"pl-3"}>
                            <h5>
                              <span><strong>Raw Materials</strong></span>
                            </h5>
                          </Col>
                          <Col sm={2}>
                            <h5>
                              <span><strong>Price</strong></span>
                            </h5>
                          </Col>
                          <Col sm={3}>
                            <h5>
                              <span><strong>Action</strong></span>
                            </h5>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {this.state.openPurchaseOrders.length !== 0 ?
                        <section className={"po-selected-raw-material-list"}>
                          {this.state.openPurchaseOrders.map((order) =>
                            <ListGroup.Item key={order.orderNumber}>
                              <Row>
                                <Col sm={2} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.orderNumber}</span>
                                  </h6>
                                </Col>
                                <Col sm={2} className={"pl-3"}>
                                  <h6>
                                    <span>{order.vendor.vendorName}</span>
                                  </h6>
                                </Col>
                                <Col sm={3} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.raw_materials.map(rawMaterial => { return rawMaterial.rawMaterialName}).join(", \r\n")}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <h6>
                                    <span>{order.totalCost}</span>
                                  </h6>
                                </Col>
                                <Col sm={3}>
                                  <Button variant={"warning"} className={"mr-5"}
                                          onClick={() => this.placePurchaseOrder(order)}>Place Order</Button>
                                  <FontAwesomeIcon icon={faTrashAlt} color={"#BC3347CC"}
                                                   onClick={() => this.deletePurchaseOrderConfirmation(order)}/>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}
                        </section>
                        :
                        <ListGroup.Item>No open orders found.</ListGroup.Item>
                      }
                    </ListGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={12}>
            <Accordion className={"text-left"}>
              <Card>
                <Accordion.Toggle as={Card.Header} onClick={this.togglePlacedOrderAccordion}
                                  className={"po-list-header"} eventKey="0">
                  <Row>
                    <Col sm={11}>
                      <h4>Placed Orders</h4>
                    </Col>
                    <Col sm={1} className={"text-right"}>
                      {
                        this.state.isPlacedOrderAccordionOpen &&
                        <FontAwesomeIcon size={"2x"} icon={faAngleDown} className={"secondary"}/>
                      }
                      {
                        !this.state.isPlacedOrderAccordionOpen &&
                        <FontAwesomeIcon size={"2x"} icon={faAngleUp} className={"secondary"}/>
                      }
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <ListGroup className={"mt-3"}>
                      <ListGroup.Item>
                        <Row>
                          <Col sm={2} className={"pl-3 text-left"}>
                            <h5>
                              <span><strong>Order Number</strong></span>
                            </h5>
                          </Col>
                          <Col sm={2} className={"pl-3"}>
                            <h5>
                              <span><strong>Vendor</strong></span>
                            </h5>
                          </Col>
                          <Col sm={3} className={"pl-3"}>
                            <h5>
                              <span><strong>Raw Materials</strong></span>
                            </h5>
                          </Col>
                          <Col sm={2}>
                            <h5>
                              <span><strong>Price</strong></span>
                            </h5>
                          </Col>
                          <Col sm={3}>
                            <h5>
                              <span><strong>Action</strong></span>
                            </h5>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {this.state.placedPurchaseOrders.length !== 0 ?
                        <section className={"po-selected-raw-material-list"}>
                          {this.state.placedPurchaseOrders.map((order) =>
                            <ListGroup.Item key={order.orderNumber}>
                              <Row>
                                <Col sm={2} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.orderNumber}</span>
                                  </h6>
                                </Col>
                                <Col sm={2} className={"pl-3"}>
                                  <h6>
                                    <span>{order.vendor.vendorName}</span>
                                  </h6>
                                </Col>
                                <Col sm={3} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.raw_materials.map(rawMaterial => { return rawMaterial.rawMaterialName}).join(", \r\n")}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <h6>
                                    <span>{order.totalCost}</span>
                                  </h6>
                                </Col>
                                <Col sm={3}>
                                  <Button variant={"secondary"} className={"mr-5"}
                                          onClick={() => this.receivePurchaseOrder(order)}>Receive Order</Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}
                        </section>
                        :
                        <ListGroup.Item>No placed orders found.</ListGroup.Item>
                      }
                    </ListGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={12}>
            <Accordion className={"text-left"}>
              <Card>
                <Accordion.Toggle as={Card.Header} onClick={this.toggleReceivedOrderAccordion}
                                  className={"po-list-header"} eventKey="0">
                  <Row>
                    <Col sm={11}>
                      <h4>Received Orders</h4>
                    </Col>
                    <Col sm={1} className={"text-right"}>
                      {
                        this.state.isReceivedOrderAccordionOpen &&
                        <FontAwesomeIcon size={"2x"} icon={faAngleDown} className={"secondary"}/>
                      }
                      {
                        !this.state.isReceivedOrderAccordionOpen &&
                        <FontAwesomeIcon size={"2x"} icon={faAngleUp} className={"secondary"}/>
                      }
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <ListGroup className={"mt-3"}>
                      <ListGroup.Item>
                        <Row>
                          <Col sm={2} className={"pl-3 text-left"}>
                            <h5>
                              <span><strong>Order Number</strong></span>
                            </h5>
                          </Col>
                          <Col sm={2} className={"pl-3"}>
                            <h5>
                              <span><strong>Vendor</strong></span>
                            </h5>
                          </Col>
                          <Col sm={3} className={"pl-3"}>
                            <h5>
                              <span><strong>Raw Materials</strong></span>
                            </h5>
                          </Col>
                          <Col sm={2}>
                            <h5>
                              <span><strong>Price</strong></span>
                            </h5>
                          </Col>
                          <Col sm={3}>
                            <h5>
                              <span><strong>Action</strong></span>
                            </h5>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {this.state.receivedPurchaseOrders.length !== 0 ?
                        <section className={"po-selected-raw-material-list"}>
                          {this.state.receivedPurchaseOrders.map((order) =>
                            <ListGroup.Item key={order.orderNumber}>
                              <Row>
                                <Col sm={2} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.orderNumber}</span>
                                  </h6>
                                </Col>
                                <Col sm={2} className={"pl-3"}>
                                  <h6>
                                    <span>{order.vendor.vendorName}</span>
                                  </h6>
                                </Col>
                                <Col sm={3} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.raw_materials.map(rawMaterial => { return rawMaterial.rawMaterialName}).join(", \r\n")}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <h6>
                                    <span>{order.totalCost}</span>
                                  </h6>
                                </Col>
                                <Col sm={3}>
                                  <Button variant={"danger"} className={"mr-5"}
                                          onClick={() => this.archivePurchaseOrder(order)}>Archive Order</Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}
                        </section>
                        :
                        <ListGroup.Item>No received orders found.</ListGroup.Item>
                      }
                    </ListGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
        <Modal show={this.state.deleteModal.show} animation={false} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label className={"m-0"}>
                <strong>
                  Are you sure you want to delete {this.state.deleteModal.order.orderNumber}?{" "}
                </strong>
              </Form.Label>
              <Form.Label className={"m-0"}>
                All related raw materials will be deleted too.
              </Form.Label>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => this.deletePurchaseOrder(this.state.deleteModal.order)}
            >
              Yes
            </Button>
            <Button variant="secondary" onClick={this.closeModal}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}
