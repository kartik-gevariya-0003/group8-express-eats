import React, {Component} from "react";
import {Accordion, Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Row} from "react-bootstrap";
import {faAngleDown, faAngleUp, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ManufacturingOrders extends Component {

  constructor(props) {
    super(props);
    this.originalOrder = {
      openOrders: [
        {
          orderNumber: "#10BN1233",
          price: '$160.65',
          foodItems: [{name: 'Egg Sandwich', quantity: 23}, {name: 'Pepperoni Pizza', quantity: 3}]
        },
        {
          orderNumber: "#10BN1234",
          price: '$125.43',
          foodItems: [{name: 'Cheese Burger', quantity: 3}, {name: 'Fish and Chips', quantity: 1}]
        },
        {
          orderNumber: "#10BN1235",
          price: '$134.12',
          foodItems: [{name: 'Cheese Burger', quantity: 1}, {name: 'Dim Sums', quantity: 5}]
        },
      ],
      preppingOrders: [
        {
          orderNumber: "#10PR1733",
          price: '$432.15',
          foodItems: [{name: 'Tacos', quantity: 23}, {name: 'Pepperoni Pizza', quantity: 3}, {
            name: 'Greek Salad',
            quantity: 4
          }]
        },
        {
          orderNumber: "#10PR6523",
          price: '$343.86',
          foodItems: [{name: 'Tom Yum Kung', quantity: 8}, {name: 'Greek Salad', quantity: 10}]
        },
        {
          orderNumber: "#10PR2235",
          price: '$323.43',
          foodItems: [{name: 'Tom Yum Kung', quantity: 8}, {name: 'Sushi', quantity: 10}]
        },
      ],
      packagedOrders: [
        {
          orderNumber: "#10PC4323",
          price: '$896.65',
          foodItems: [{name: 'Sushi', quantity: 18}, {name: 'Greek Salad', quantity: 10}]
        },
        {
          orderNumber: "#10PC8565",
          price: '$234.42',
          foodItems: [{name: 'Tom Yum Kung', quantity: 8}, {name: 'Pepperoni Pizza', quantity: 10}]
        },
        {
          orderNumber: "#10PC2124",
          price: '$654.21',
          foodItems: [{name: 'Tom Yum Kung', quantity: 34}, {name: 'Dim Sums', quantity: 32}]
        },
      ]
    }
    this.state = {
      openOrders: this.originalOrder.openOrders,
      preppingOrders: this.originalOrder.preppingOrders,
      packagedOrders: this.originalOrder.packagedOrders,
      isOpenOrderAccordionOpen: true,
      isPreppingOrderAccordionOpen: true,
      isPackagedOrderAccordionOpen: true
    }
  }

  updateOriginalOrders(item, status) {
    if (status === 'Open') {
      this.originalOrder.openOrders = this.originalOrder.openOrders.filter(openOrder => openOrder.orderNumber !== item.orderNumber)
    }
    if (status === 'Prepping') {
      this.originalOrder.preppingOrders.unshift(item)
      this.originalOrder.openOrders = this.originalOrder.openOrders.filter(openOrder => openOrder.orderNumber !== item.orderNumber)
    } else if (status === 'Packaged') {
      this.originalOrder.packagedOrders.unshift(item)
      this.originalOrder.preppingOrders = this.originalOrder.preppingOrders.filter(preppingOrders => preppingOrders.orderNumber !== item.orderNumber)
    } else if (status === 'Archived') {
      this.originalOrder.packagedOrders = this.originalOrder.packagedOrders.filter(packagedOrder => packagedOrder.orderNumber !== item.orderNumber)
    }
  }

  moveToPrepping(item, event) {
    let preppingOrders = this.state.preppingOrders;
    let openOrders = this.state.openOrders;
    preppingOrders.unshift(item)
    openOrders = openOrders.filter(openOrder => openOrder.orderNumber !== item.orderNumber)
    this.setState({openOrders, preppingOrders})
    this.updateOriginalOrders(item, 'Prepping')
  }

  moveToPackaged(item, event) {
    let packagedOrders = this.state.packagedOrders;
    let preppingOrders = this.state.preppingOrders;
    packagedOrders.unshift(item)
    preppingOrders = preppingOrders.filter(preppingOrder => preppingOrder.orderNumber !== item.orderNumber)
    this.setState({preppingOrders, packagedOrders})
    this.updateOriginalOrders(item, 'Packaged')
  }

  deleteOpenManufacturingOrder = (item) => {
    let openOrders = this.state.openOrders;
    openOrders = openOrders.filter(openOrder => openOrder.orderNumber !== item.orderNumber)
    this.setState({openOrders})
    this.updateOriginalOrders(item, 'Open');
  }

  archiveManufacturingOrder = (item) => {
    let packagedOrders = this.state.packagedOrders;
    packagedOrders = packagedOrders.filter(packagedOrder => packagedOrder.orderNumber !== item.orderNumber)
    this.setState({packagedOrders})
    this.updateOriginalOrders(item, 'Archived');
  }

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

  goToCreateManufacturingOrder(event) {
    this.props.history.push('/manufacturing-order/create')
  }

  toggleOpenOrderAccordion = event => {
    let state = {...this.state};
    state.isOpenOrderAccordionOpen = !state.isOpenOrderAccordionOpen;
    this.setState(state);
  }

  togglePreppingOrderAccordion = event => {
    let state = {...this.state};
    state.isPreppingOrderAccordionOpen = !state.isPreppingOrderAccordionOpen;
    this.setState(state);
  }

  togglePackagedOrderAccordion = event => {
    let state = {...this.state};
    state.isPackagedOrderAccordionOpen = !state.isPackagedOrderAccordionOpen;
    this.setState(state);
  }

  render() {
    return (
      <section>
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Manufacturing Orders</h2>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={8} className={"text-left"}>
            <Button variant={"success"} onClick={this.goToCreateManufacturingOrder}>Create Manufacturing
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
                                <Col sm={2} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.orderNumber}</span>
                                  </h6>
                                </Col>
                                <Col sm={5} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.foodItems.map(foodItem => foodItem.name).join(', ')}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <h6>
                                    <span>{order.price}</span>
                                  </h6>
                                </Col>
                                <Col sm={3}>
                                  <Button variant={"primary"} className={"mr-5"}
                                          onClick={() => this.moveToPrepping(order)}>Prep
                                    Order</Button>
                                  <FontAwesomeIcon icon={faTrashAlt} color={"#ba2311"}
                                                   onClick={() => this.deleteOpenManufacturingOrder(order)}/>
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
                      {this.state.preppingOrders.length !== 0 ?
                        <section className={"po-selected-raw-material-list"}>
                          {this.state.preppingOrders.map((order) =>
                            <ListGroup.Item key={order.orderNumber}>
                              <Row>
                                <Col sm={2} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.orderNumber}</span>
                                  </h6>
                                </Col>
                                <Col sm={5} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{order.foodItems.map(foodItem => foodItem.name).join(', ')}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <h6>
                                    <span>{order.price}</span>
                                  </h6>
                                </Col>
                                <Col sm={3}>
                                  <Button variant={"secondary"} className={"mr-5"}
                                          onClick={() => this.moveToPackaged(order)}>Package
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
                                    <span>{order.foodItems.map(foodItem => foodItem.name).join(', ')}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <h6>
                                    <span>{order.price}</span>
                                  </h6>
                                </Col>
                                <Col sm={3}>
                                  <Button variant={"warning"} className={"mr-5"}
                                          onClick={() => this.archiveManufacturingOrder(order)}>Archive
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
        </Row>
      </section>
    )
  }
}

export default ManufacturingOrders