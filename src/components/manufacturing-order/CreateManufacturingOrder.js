/*
Author: Mansi Gevariya
* */
import './manufacturing-order.css';
import React from "react";
import {Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import ApplicationContainer from "../ApplicationContainer";
import axios from "axios";
import {POST_CREATE_MANUFACTURING_ORDER} from "../../config";

const foodItems = [
  {id: 1, name: 'Egg Sandwich', unitPrice: 4.50},
  {id: 2, name: 'Dim Sums', unitPrice: 5.00},
  {id: 3, name: 'Cheese Burger', unitPrice: 1.50},
  {id: 4, name: 'Pepperoni Pizza', unitPrice: 4.50},
  {id: 5, name: 'Fish and Chips', unitPrice: 2.50},
  {id: 6, name: 'Tom Yum Kung', unitPrice: 1.50},
  {id: 7, name: 'Tacos', unitPrice: 3.00},
  {id: 8, name: 'Sushi', unitPrice: 5.00},
  {id: 9, name: 'Greek Salad', unitPrice: 2.50},
]

class CreateManufacturingOrder extends ApplicationContainer {

  constructor(props) {
    super(props);
    let currentDate = Date.now();
    this.state = {
      order: {
        orderNumber: 'MO-' + currentDate,
        selectedFoodItems: [],
        totalPrice: 0
      },
      foodItems: foodItems,
      foodItemQuantityModal: {
        show: false,
        selectedFoodItem: '',
        selectedFoodItemQuantity: 0
      },
      isError: {
        selectedFoodItem: '',
        selectedFoodItemQuantity: ''
      }
    }

  }

  goToManufacturingOrders = (event) => {
    this.props.history.push('/manufacturing-orders')
  }

  filterFoodItems(event) {
    event.preventDefault()
    const {value} = event.target;
    this.setState({
      foodItems: foodItems.filter(foodItem => foodItem.name.toLowerCase().includes(value.toLowerCase()))
    })
  }

  addFoodItem = foodItem => {
    let state = {...this.state};
    state.foodItemQuantityModal.selectedFoodItem = foodItem;
    this.setState(state);
    this.showModal();
  };

  showModal = () => {
    let state = {...this.state};
    state.foodItemQuantityModal.show = true;
    this.setState(state);
  }

  closeModal = () => {
    let state = {...this.state};
    state.foodItemQuantityModal.show = false;
    this.setState(state);
  }

  validator = (name, value, isError) => {
    switch (name) {
      case "modalFoodItemQuantity":
        isError.selectedFoodItemQuantity = "";
        if (value.length === 0 || value <= 0) {
          isError.selectedFoodItemQuantity = "Quantity should be greater than 0";
        }
        break;
      case "foodItems":
        isError.selectedFoodItem = "";
        if (value.length === 0) {
          isError.selectedFoodItem = "Please select one or more Food Items";
        }
        break;
      default:
        break;
    }
  }

  calculateTotalCost = (event) => {
    let state = {...this.state};
    state.order.totalPrice = this.state.order.selectedFoodItems.reduce((sum, item) => {
      return sum + item.unitPrice * +item.quantity;
    }, 0);
    this.setState(state)
  }

  addFoodItemToOrder = (e) => {
    e.preventDefault();
    let state = {...this.state};
    if (state.foodItemQuantityModal.selectedFoodItemQuantity > 0) {
      state.foodItemQuantityModal.selectedFoodItem['quantity'] = state.foodItemQuantityModal.selectedFoodItemQuantity;
      state.order.selectedFoodItems.push(state.foodItemQuantityModal.selectedFoodItem);
      state.foodItemQuantityModal.selectedFoodItem = '';
      state.foodItemQuantityModal.selectedFoodItemQuantity = 0;
      state.foodItemQuantityModal.show = false;
      this.validator('foodItems', this.state.order.selectedFoodItems, state.isError);
    } else {
      this.validator('modalFoodItemQuantity', 0, state.isError);
    }
    this.setState(state);
    this.calculateTotalCost();
  }

  onSubmit(e) {
    e.preventDefault();
    let isError = {...this.state.isError};
    let state = this.state;
    this.validator('foodItems', this.state.order.selectedFoodItems, isError);
    let isValid = true;
    Object.values(isError).forEach(error => {
      if (error.length > 0) {
        isValid = false
      }
    });

    this.setState({
      isError: isError
    })

    if (isValid) {
      const postData = state.order
      axios.post(POST_CREATE_MANUFACTURING_ORDER, postData).then(result => {
        this.props.history.push({
          pathname: '/manufacturing-orders',
        });
      })
    }
  };

  foodItemQuantityChangeListener = e => {
    e.preventDefault();
    const {name, value} = e.target;
    let state = {...this.state};
    this.validator(name, value, state.isError);
    state.foodItemQuantityModal.selectedFoodItemQuantity = value;
    this.setState(state);
  };

  deleteFoodItem = foodItem => {
    let state = {...this.state};
    state.order.selectedFoodItems = state.order.selectedFoodItems.filter(e => e.id !== foodItem.id);
    state.order.totalPrice -= (foodItem.unitPrice * foodItem.quantity);
    this.validator('foodItems', this.state.order.selectedFoodItems, state.isError);
    this.setState(state);
  };

  render() {
    return (
      <section>
        {super.render()}
        <Row className={"m-3"}>
          <Col sm={5}>
            <Card>
              <Card.Body>
                <Card.Title>Order Details</Card.Title>
                <Card.Text>
                  <strong>Order Number:</strong> {this.state.order.orderNumber}
                </Card.Text>
                {this.state.order.selectedFoodItems && this.state.order.selectedFoodItems.length > 0 &&
                (<section className={"mt-5"}>
                  <strong>Selected Food Items</strong>
                  <ListGroup className={"mt-3 mo-selected-food-item-list"}>
                    {this.state.order.selectedFoodItems.map((foodItem) =>
                      <ListGroup.Item key={foodItem.id}>
                        <Row>
                          <Col sm={4} className={"pl-3 text-left"}>
                            <h6>
                              <span>{foodItem.name}</span>
                            </h6>
                          </Col>
                          <Col sm={4} className={"pl-3"}>
                            <h6>
                              <span><strong>Quantity</strong></span>
                              <br/>
                              <span>{foodItem.quantity}</span>
                            </h6>
                          </Col>
                          <Col sm={3}>
                            <h6>
                              <span><strong>Unit Price</strong></span>
                              <br/>
                              <span>${foodItem.unitPrice}</span>
                            </h6>
                          </Col>
                          <Col sm={1}>
                            <FontAwesomeIcon icon={faTrashAlt} color={"#ba2311"}
                                             onClick={() => this.deleteFoodItem(foodItem)}/>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                  <Card.Text className="mt-5">
                    <strong>Total Cost :</strong>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(this.state.order.totalPrice)}
                  </Card.Text>
                </section>)
                }
                <Button variant={"primary"} className="mt-3" onClick={this.onSubmit.bind(this)} block>Create
                  Order</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={7}>
            <Card>
              <Card.Body className="text-left">
                <Card.Title>New Manufacturing Order</Card.Title>
                <Row>
                  <Col>
                    <Form.Group controlId="foodItems">
                      <Row>
                        <Col sm={7} className={"pt-2"}>
                          <Form.Label><strong>Food Items</strong></Form.Label>
                        </Col>
                        <Col sm={5}>
                          <InputGroup>
                            <FormControl
                              placeholder="Search"
                              onChange={this.filterFoodItems.bind(this)}
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
                      <ListGroup
                        className={this.state.isError.selectedFoodItem.length > 0 ? "is-invalid mt-3 mo-food-items-list" : "mt-3 mo-food-items-list"}>
                        {this.state.foodItems.map((foodItem) =>
                          <ListGroup.Item key={foodItem.id}>
                            <Row>
                              <Col sm={5} className={"pl-3"}>
                                <h6>
                                  <span>{foodItem.name}</span>
                                </h6>
                              </Col>
                              <Col sm={5}>
                                <h6>
                                  <span><strong>Unit Price:</strong></span>
                                  <span> ${foodItem.unitPrice}</span>
                                </h6>
                              </Col>
                              <Col sm={2}>
                                <Button variant={"secondary"}
                                        onClick={() => this.addFoodItem(foodItem)}>
                                  Add
                                </Button>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                      {this.state.isError.selectedFoodItem && (
                        <Form.Control.Feedback
                          type={"invalid"}>{this.state.isError.selectedFoodItem}</Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Modal show={this.state.foodItemQuantityModal.show} animation={false} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Quantity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className={"m-0"}><strong>Food Item</strong></Form.Label>
                <Form.Control plaintext readOnly
                              defaultValue={this.state.foodItemQuantityModal.selectedFoodItem.name}
                              className={"p-0"}/>
              </Form.Group>
              <Form.Group>
                <Form.Label><strong>Quantity : </strong></Form.Label>
                <Form.Control
                  name={"modalFoodItemQuantity"}
                  type="number"
                  step=".01"
                  onChange={this.foodItemQuantityChangeListener}
                  className={this.state.isError.selectedFoodItemQuantity.length > 0 ? "is-invalid" : ""}
                  placeholder="Enter Quantity"/>
                {this.state.isError.selectedFoodItemQuantity.length > 0 && (
                  <Form.Control.Feedback
                    type={"invalid"}>{this.state.isError.selectedFoodItemQuantity}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.addFoodItemToOrder}>Add To Order</Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </section>
    )
  }
}

export default CreateManufacturingOrder