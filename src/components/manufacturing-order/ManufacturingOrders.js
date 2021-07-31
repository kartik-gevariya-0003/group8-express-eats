/**
 * Author: Mansi Gevariya
 */
import React from "react";
import {Accordion, Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Modal, Row} from "react-bootstrap";
import {faAngleDown, faAngleUp, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ApplicationContainer from "../ApplicationContainer";
import axios from "axios";
import {CHANGE_MANUFACTURING_ORDER_STATUS, DELETE_MANUFACTURING_ORDER, GET_MANUFACTURING_ORDERS} from "../../config";
import {toast} from "react-toastify";

const MANUFACTURING_ORDER_STATUS = {
  OPEN: 'OPEN',
  PREPPING: 'PREPPING',
  PACKAGED: 'PACKAGED',
  ARCHIVED: 'ARCHIVED'
}

class ManufacturingOrders extends ApplicationContainer {

  constructor(props) {
    super(props);
    this.originalOrder = {}
    this.state = {
      openOrders: [],
      preppingOrders: [],
      packagedOrders: [],
      isOpenOrderAccordionOpen: true,
      isPreppingOrderAccordionOpen: true,
      isPackagedOrderAccordionOpen: true,
      loading: false,
      deleteModal: {
        show: false,
        orderNumber: null
      },
      archiveModal: {
        show: false,
        order: {}
      }
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      const headers = {
        'Authorization': 'Bearer ' + user.token
      }
      this.getManufacturingOrders(headers)
    }
  }

  /**
   * Function to get manufacturing order list by making a GET call
   **/
  getManufacturingOrders = (headers) => {
    this.setState({loading: true});
    axios.get(GET_MANUFACTURING_ORDERS, {headers: headers}).then(result => {
      let manufacturingOrders = result.data['manufacturingOrders'];
      this.originalOrder.openOrders = manufacturingOrders.filter(manufacturingOrder => manufacturingOrder.status === MANUFACTURING_ORDER_STATUS.OPEN)
      this.originalOrder.preppingOrders = manufacturingOrders.filter(manufacturingOrder => manufacturingOrder.status === MANUFACTURING_ORDER_STATUS.PREPPING)
      this.originalOrder.packagedOrders = manufacturingOrders.filter(manufacturingOrder => manufacturingOrder.status === MANUFACTURING_ORDER_STATUS.PACKAGED)
      this.setState({
        openOrders: this.originalOrder.openOrders,
        preppingOrders: this.originalOrder.preppingOrders,
        packagedOrders: this.originalOrder.packagedOrders,
        loading: false
      })
    }).catch(error => {
      this.setState({loading: false});
      if (error.response.status === 401) {
        toast.error('Session is expired. Please login again.');
        localStorage.removeItem('user');
        this.props.history.push({
          pathname: '/login'
        });
      } else {
        toast.error(error.response.data.message);
      }
    })
  }

  /**
   * Function to change the status of a manufacturing order by making a PUT call
   **/
  changeOrderStatus = (item, status) => {
    this.setState({loading: true});
    const putData = {
      order: item,
      status: status
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      const headers = {
        'Authorization': 'Bearer ' + user.token
      }
      axios.put(CHANGE_MANUFACTURING_ORDER_STATUS, putData, {headers: headers}).then(() => {
        this.getManufacturingOrders(headers);
        toast.success("Manufacturing Order " + item.orderNumber + " moved to " + status);
        this.setState({loading: false});
      }).catch(error => {
        this.setState({loading: false});
        console.error(error);
        if (error.response && error.response.status === 412) {
          toast.error("The manufacturing order cannot be moved to Prepping state as there are not enough raw materials in the inventory.");
        } else {
          if (error.response.status === 401) {
            toast.error('Session is expired. Please login again.');
            localStorage.removeItem('user');
            this.props.history.push({
              pathname: '/login'
            });
          } else {
            toast.error(error.response.data.message);
          }
        }
      })
    }
  }

  openDeleteModal = (item) => {
    let state = this.state;
    state.deleteModal.show = true;
    state.deleteModal.orderNumber = item.orderNumber
    this.setState(state)
  }

  closeDeleteModal = () => {
    let state = this.state;
    state.deleteModal.show = false;
    state.deleteModal.orderNumber = null;
    this.setState(state)
  }

  openArchiveModal = (item) => {
    let state = this.state;
    state.archiveModal.show = true;
    state.archiveModal.order = item
    this.setState(state)
  }

  closeArchiveModal = () => {
    let state = this.state;
    state.archiveModal.show = false;
    state.archiveModal.order = {};
    this.setState(state)
  }

  /**
   * Function to delete a manufacturing order by making a DELETE call.
   **/
  deleteOpenManufacturingOrder = () => {
    let state = this.state
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      const headers = {
        'Authorization': 'Bearer ' + user.token
      }
      this.setState({loading: true});
      const deleteUrl = DELETE_MANUFACTURING_ORDER + "/" + state.deleteModal.orderNumber;
      axios.delete(deleteUrl, {headers: headers}).then(() => {
        this.closeDeleteModal();
        toast.success("Manufacturing Order " + state.deleteModal.orderNumber + " deleted successfully.");
        this.getManufacturingOrders(headers);
        this.setState({loading: false});
      }).catch(error => {
        this.setState({loading: false});
        if (error.response.status === 401) {
          toast.error('Session is expired. Please login again.');
          localStorage.removeItem('user');
          this.props.history.push({
            pathname: '/login'
          });
        } else {
          toast.error(error.response.data.message);
        }
      })
    }
  }

  archiveManufacturingOrder = () => {
    this.changeOrderStatus(this.state.archiveModal.order, MANUFACTURING_ORDER_STATUS.ARCHIVED)
    this.closeArchiveModal();
  }

  /**
   * Function to search a manufacturing order
   **/
  searchOrder = (event) => {
    let searchText = event.target.value
    let openOrders = this.originalOrder.openOrders;
    let preppingOrders = this.originalOrder.preppingOrders;
    let packagedOrders = this.originalOrder.packagedOrders;
    if (searchText) {
      openOrders = openOrders.filter(item => item.orderNumber.includes(searchText))
      preppingOrders = preppingOrders.filter(item => item.orderNumber.includes(searchText))
      packagedOrders = packagedOrders.filter(item => item.orderNumber.includes(searchText))
    }
    this.setState({openOrders, preppingOrders, packagedOrders})
  }

  goToCreateManufacturingOrder = () => {
    this.props.history.push('/manufacturing-order/create')
  }

  toggleOpenOrderAccordion = () => {
    let state = {...this.state};
    state.isOpenOrderAccordionOpen = !state.isOpenOrderAccordionOpen;
    this.setState(state);
  }

  togglePreppingOrderAccordion = () => {
    let state = {...this.state};
    state.isPreppingOrderAccordionOpen = !state.isPreppingOrderAccordionOpen;
    this.setState(state);
  }

  togglePackagedOrderAccordion = () => {
    let state = {...this.state};
    state.isPackagedOrderAccordionOpen = !state.isPackagedOrderAccordionOpen;
    this.setState(state);
  }

  render() {
    return (
      <section className={"pb-5"}>
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
            <h2>Manufacturing Orders</h2>
            <hr/>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={8} className={"text-left"}>
            <Button variant={"primary"} onClick={this.goToCreateManufacturingOrder}>Create Manufacturing
              Order</Button>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <InputGroup>
                <FormControl placeholder="Search"
                             onChange={this.searchOrder}
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
                <Accordion.Toggle as={Card.Header} onClick={this.toggleOpenOrderAccordion}
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
                          <Col sm={3} className={"pl-3 text-left"}>
                            <h5>
                              <span><strong>Order Number</strong></span>
                            </h5>
                          </Col>
                          <Col sm={4} className={"pl-3"}>
                            <h5>
                              <span><strong>Food Items</strong></span>
                            </h5>
                          </Col>
                          <Col sm={2}>
                            <h5>
                              <span><strong>Total Price</strong></span>
                            </h5>
                          </Col>
                          <Col sm={3}>
                            <h5>
                              <span><strong>Action</strong></span>
                            </h5>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {this.state.openOrders.length !== 0 ?
                        <section className={"po-selected-raw-material-list"}>
                          {this.state.openOrders.map((order) =>
                            <ListGroup.Item key={order.orderNumber}>
                              <Row>
                                <Col sm={3} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.orderNumber}</span>
                                  </h6>
                                </Col>
                                <Col sm={4} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order['food_items'].map(foodItem => foodItem.foodItemName).join(', ')}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <h6>
                                    <span>{new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD'
                                    }).format(order.totalPrice)}</span>
                                  </h6>
                                </Col>
                                <Col sm={3}>
                                  <Button variant={"warning"} className={"mr-5"}
                                          onClick={() => this.changeOrderStatus(order, MANUFACTURING_ORDER_STATUS.PREPPING)}>Prep
                                    Order</Button>
                                  <FontAwesomeIcon icon={faTrashAlt} color={"#BC3347CC"}
                                                   onClick={() => this.openDeleteModal(order)}/>
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
                <Accordion.Toggle as={Card.Header} onClick={this.togglePreppingOrderAccordion}
                                  className={"po-list-header"} eventKey="0">
                  <Row>
                    <Col sm={11}>
                      <h4>Prepping Orders</h4>
                    </Col>
                    <Col sm={1} className={"text-right"}>
                      {
                        this.state.isPreppingOrderAccordionOpen &&
                        <FontAwesomeIcon size={"2x"} icon={faAngleDown} className={"secondary"}/>
                      }
                      {
                        !this.state.isPreppingOrderAccordionOpen &&
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
                          <Col sm={3} className={"pl-3 text-left"}>
                            <h5>
                              <span><strong>Order Number</strong></span>
                            </h5>
                          </Col>
                          <Col sm={4} className={"pl-3"}>
                            <h5>
                              <span><strong>Food Items</strong></span>
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
                      {this.state.preppingOrders.length !== 0 ?
                        <section className={"po-selected-raw-material-list"}>
                          {this.state.preppingOrders.map((order) =>
                            <ListGroup.Item key={order.orderNumber}>
                              <Row>
                                <Col sm={3} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.orderNumber}</span>
                                  </h6>
                                </Col>
                                <Col sm={4} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order['food_items'].map(foodItem => foodItem.foodItemName).join(', ')}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <h6>
                                    <span>{new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD'
                                    }).format(order.totalPrice)}</span>
                                  </h6>
                                </Col>
                                <Col sm={3}>
                                  <Button variant={"secondary"} className={"mr-5"}
                                          onClick={() => this.changeOrderStatus(order, MANUFACTURING_ORDER_STATUS.PACKAGED)}>Package
                                    Order</Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}
                        </section>
                        :
                        <ListGroup.Item>No prepping orders found.</ListGroup.Item>
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
                <Accordion.Toggle as={Card.Header} onClick={this.togglePackagedOrderAccordion}
                                  className={"po-list-header"} eventKey="0">
                  <Row>
                    <Col sm={11}>
                      <h4>Packaged Orders</h4>
                    </Col>
                    <Col sm={1} className={"text-right"}>
                      {
                        this.state.isPackagedOrderAccordionOpen &&
                        <FontAwesomeIcon size={"2x"} icon={faAngleDown} className={"secondary"}/>
                      }
                      {
                        !this.state.isPackagedOrderAccordionOpen &&
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
                          <Col sm={5} className={"pl-3"}>
                            <h5>
                              <span><strong>Food Items</strong></span>
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
                      {this.state.packagedOrders.length !== 0 ?
                        <section className={"po-selected-raw-material-list"}>
                          {this.state.packagedOrders.map((order) =>
                            <ListGroup.Item key={order.orderNumber}>
                              <Row>
                                <Col sm={2} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.orderNumber}</span>
                                  </h6>
                                </Col>
                                <Col sm={5} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order['food_items'].map(foodItem => foodItem.foodItemName).join(', ')}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <h6>
                                    <span>{new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD'
                                    }).format(order.totalPrice)}</span>
                                  </h6>
                                </Col>
                                <Col sm={3}>
                                  <Button variant={"danger"} className={"mr-5"}
                                          onClick={() => this.openArchiveModal(order)}>Archive
                                    Order</Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}
                        </section>
                        :
                        <ListGroup.Item>No packaged orders found.</ListGroup.Item>
                      }
                    </ListGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Modal show={this.state.deleteModal.show} animation={false} onHide={this.closeDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className={"m-0"}>
                  Are you sure you want to delete the order with order number {this.state.deleteModal.orderNumber}?{" "}
                </Form.Label>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={this.deleteOpenManufacturingOrder}
              >
                Yes
              </Button>
              <Button variant="danger" onClick={this.closeDeleteModal}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.archiveModal.show} animation={false} onHide={this.closeArchiveModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className={"m-0"}>
                  Are you sure you want to archive the order with order
                  number {this.state.archiveModal.order.orderNumber}?{" "}
                </Form.Label>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={this.archiveManufacturingOrder}
              >
                Yes
              </Button>
              <Button variant="danger" onClick={this.closeArchiveModal}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </section>
    )
  }
}

export default ManufacturingOrders