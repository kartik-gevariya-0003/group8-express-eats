/*
Author: Mansi Gevariya
*/
import './manufacturing-order.css';
import React from "react";
import {Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import ApplicationContainer from "../ApplicationContainer";
import axios from "axios";
import {GET_FOOD_ITEMS, POST_CREATE_MANUFACTURING_ORDER} from "../../config";
import {toast} from "react-toastify";

class CreateManufacturingOrder extends ApplicationContainer {

  constructor(props) {
    super(props);
    let currentDate = Date.now();
    this.originalFoodItems = [];
    this.state = {
      order: {
        orderNumber: 'MO-' + currentDate,
        selectedFoodItems: [],
        totalPrice: 0
      },
      foodItems: [],
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

  componentDidMount() {
    this.setState({loading: true});
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      const headers = {
        'Authorization': 'Bearer ' + user.token
      }
      this.getFoodItems(headers)
    }
  }

  getFoodItems = (headers) => {
    axios.get(GET_FOOD_ITEMS, {headers: headers}).then(result => {
      let foodItems = result.data['foodItems'];
      this.originalFoodItems = foodItems;
      this.setState({foodItems: foodItems, loading: false});
    }).catch(error => {
      this.setState({loading: false});
      console.error(error);
      toast.error("Error occurred while fetching food items.");
    })
  }

  goToManufacturingOrders = () => {
    this.props.history.push('/manufacturing-orders')
  }

  filterFoodItems(event) {
    event.preventDefault()
    const {value} = event.target;
    this.setState({
      foodItems: this.originalFoodItems.filter(foodItem => foodItem.foodItemName.toLowerCase().includes(value.toLowerCase()))
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

  calculateTotalCost = () => {
    let state = {...this.state};
    state.order.totalPrice = this.state.order.selectedFoodItems.reduce((sum, item) => {
      return sum + item.totalCost * +item.quantity;
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
      this.setState({loading: true});
      const postData = state.order
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        const headers = {
          'Authorization': 'Bearer ' + user.token
        }
        axios.post(POST_CREATE_MANUFACTURING_ORDER, postData, {headers: headers}).then(() => {
          this.setState({loading: false});
          toast.success("Manufacturing Order created successfully.");
          this.props.history.push({
            pathname: '/manufacturing-orders',
          });
        })
      }
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
    state.order.totalPrice -= (foodItem.totalCost * foodItem.quantity);
    this.validator('foodItems', this.state.order.selectedFoodItems, state.isError);
    this.setState(state);
  };

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
            <h2>New Manufacturing Order</h2>
            <hr/>
          </Col>
        </Row>
        <Row className={"m-3"}>
          <Col sm={5}>
            <Card>
              <Card.Body>
                <Card.Title>Order Details</Card.Title>
                <hr/>
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
                              <span>{foodItem.foodItemName}</span>
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
                              <span>${foodItem.totalCost}</span>
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
                <Row>
                  <Col>
                    <Form.Group controlId="foodItems">
                      <Row>
                        <Col sm={7} className={"pt-2"}>
                          <Card.Title>Food Items</Card.Title>
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
                      {
                        this.state.foodItems.length > 0 ?
                          <ListGroup
                            className={this.state.isError.selectedFoodItem.length > 0 ? "is-invalid mt-3 mo-food-items-list" : "mt-3 mo-food-items-list"}>
                            {this.state.foodItems.map((foodItem) =>
                              <ListGroup.Item key={foodItem.id}>
                                <Row>
                                  <Col sm={5} className={"pl-3"}>
                                    <h6>
                                      <span>{foodItem.foodItemName}</span>
                                    </h6>
                                  </Col>
                                  <Col sm={5}>
                                    <h6>
                                      <span><strong>Unit Price:</strong></span>
                                      <span> ${foodItem.totalCost}</span>
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
                          :
                          <ListGroup className={"mt-3 mo-food-items-list"}><ListGroup.Item>No food items found.</ListGroup.Item></ListGroup>
                      }
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
                              defaultValue={this.state.foodItemQuantityModal.selectedFoodItem.foodItemName}
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