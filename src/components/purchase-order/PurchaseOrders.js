import './purchase-order.css';
import React, {Component} from 'react';
import {Accordion, Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Row} from "react-bootstrap";
import {faAngleDown, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

let openPurchaseOrders = [
    {orderNumber: "PO-1234567891", price: "20.5", vendor: "Rifraf", rawMaterials: ["Bread", "Mayonnaise"]},
    {orderNumber: "PO-1234567992", price: "113.0", vendor: "Honeyville Inc.", rawMaterials: ["Meat", "Lettuce", "Sunflower Oil", "Mayonnaise", "Tomato"]},
    {orderNumber: "PO-1234567793", price: "36.8", vendor: "Milne MicroDried", rawMaterials: ["Egg", "Wheat", "Rice"]}
]

let placedPurchaseOrders = [
    {orderNumber: "PO-1234567894", price: "6.5", vendor: "Glory Bee", rawMaterials: ["Bread"]},
    {orderNumber: "PO-1234567995", price: "10.3", vendor: "Real Good Dairy", rawMaterials: ["Egg", "Lettuce", "Tomato"]},
    {orderNumber: "PO-1234567796", price: "30.6", vendor: "Honeyville Inc.", rawMaterials: ["Mayonnaise", "Lettuce", "Rice"]}
]

let receivedPurchaseOrders = [
    {orderNumber: "PO-1234567897", price: "17.0", vendor: "Pilotworks Brooklyn", rawMaterials: ["Wheat", "Mayonnaise"]},
    {orderNumber: "PO-1234567998", price: "45.5", vendor: "Rifraf", rawMaterials: ["Mayonnaise", "Bread", "Wheat", "Meat"]},
    {orderNumber: "PO-1234567799", price: "8.8", vendor: "Real Good Dairy", rawMaterials: ["Rice"]}
]

export default class PurchaseOrders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openPurchaseOrders: openPurchaseOrders,
            placedPurchaseOrders: placedPurchaseOrders,
            receivedPurchaseOrders: receivedPurchaseOrders
        }
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

    deletePurchaseOrder = (order) => {
        openPurchaseOrders = openPurchaseOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase());
        this.setState({
            openPurchaseOrders: this.state.openPurchaseOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase())
        });
    }

    archivePurchaseOrder = (order) => {
        receivedPurchaseOrders = receivedPurchaseOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase());
        this.setState({
            receivedPurchaseOrders: this.state.receivedPurchaseOrders.filter(openOrder => openOrder.orderNumber.toLowerCase() !== order.orderNumber.toLowerCase())
        });
    }

    placePurchaseOrder = (order) => {
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
    }

    receivePurchaseOrder = (order) => {
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
    }

    render() {
        return (
            <section>
                <Row className="m-3">
                    <Col className={"text-left"}>
                        <h2>Purchase Orders</h2>
                    </Col>
                </Row>
                <Row className="m-3">
                    <Col sm={8} className={"text-left"}>
                        <Button variant={"success"} onClick={this.createPurchaseOrder}>Create Purchase Order</Button>
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
                                <Accordion.Toggle as={Card.Header} className={"po-list-header"} eventKey="0">
                                    <Row>
                                        <Col sm={11}>
                                            <h4>Open Orders</h4>
                                        </Col>
                                        <Col sm={1} className={"text-right"}>
                                            <FontAwesomeIcon size={"2x"} icon={faAngleDown} className={"secondary"}/>
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
                                                                        <span>{order.vendor}</span>
                                                                    </h6>
                                                                </Col>
                                                                <Col sm={3} className={"pl-3 text-left"}>
                                                                    <h6>
                                                                        <span>{order.rawMaterials.join(", \r\n")}</span>
                                                                    </h6>
                                                                </Col>
                                                                <Col sm={2}>
                                                                    <h6>
                                                                        <span>{order.price}</span>
                                                                    </h6>
                                                                </Col>
                                                                <Col sm={3}>
                                                                    <Button variant={"primary"} className={"mr-5"}
                                                                            onClick={() => this.placePurchaseOrder(order)}>Place Order</Button>
                                                                    <FontAwesomeIcon icon={faTrashAlt} color={"#ba2311"}
                                                                                     onClick={() => this.deletePurchaseOrder(order)}/>
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
                                <Accordion.Toggle as={Card.Header} className={"po-list-header"} eventKey="0">
                                    <Row>
                                        <Col sm={11}>
                                            <h4>Placed Orders</h4>
                                        </Col>
                                        <Col sm={1} className={"text-right"}>
                                            <FontAwesomeIcon size={"2x"} icon={faAngleDown} className={"secondary"}/>
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
                                                                        <span>{order.vendor}</span>
                                                                    </h6>
                                                                </Col>
                                                                <Col sm={3} className={"pl-3 text-left"}>
                                                                    <h6>
                                                                        <span>{order.rawMaterials.join(", \r\n")}</span>
                                                                    </h6>
                                                                </Col>
                                                                <Col sm={2}>
                                                                    <h6>
                                                                        <span>{order.price}</span>
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
                                <Accordion.Toggle as={Card.Header} className={"po-list-header"} eventKey="0">
                                    <Row>
                                        <Col sm={11}>
                                            <h4>Received Orders</h4>
                                        </Col>
                                        <Col sm={1} className={"text-right"}>
                                            <FontAwesomeIcon size={"2x"} icon={faAngleDown} className={"secondary"}/>
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
                                                                        <span>{order.vendor}</span>
                                                                    </h6>
                                                                </Col>
                                                                <Col sm={3} className={"pl-3 text-left"}>
                                                                    <h6>
                                                                        <span>{order.rawMaterials.join(", \r\n")}</span>
                                                                    </h6>
                                                                </Col>
                                                                <Col sm={2}>
                                                                    <h6>
                                                                        <span>{order.price}</span>
                                                                    </h6>
                                                                </Col>
                                                                <Col sm={3}>
                                                                    <Button variant={"warning"} className={"mr-5"} onClick={() => this.archivePurchaseOrder(order)}>Archive Order</Button>
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
            </section>
        );
    }
}
