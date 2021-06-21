import "./food-item.css";
import React, {Component} from "react";
import Header from "../headers/Header";
import {Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Modal, Row,} from "react-bootstrap";
import {faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const rawMaterials = [
  {
    id: 1,
    name: "Bread",
    unitPrice: 1.5,
    category: "Grains/Cereals",
    quantity: 20,
  },
  {
    id: 2,
    name: "Egg",
    unitPrice: 0.8,
    category: "Meat, poultry, fish, and eggs",
    quantity: 2,
  },
  {id: 3, name: "Mayonnaise", unitPrice: 4.5, category: "Oils", quantity: 10},
  {
    id: 4,
    name: "Tomato",
    unitPrice: 2.0,
    category: "Vegetables",
    quantity: 1,
  },
  {
    id: 5,
    name: "Meat",
    unitPrice: 4.3,
    category: "Meat, poultry, fish, and eggs",
    quantity: 5,
  },
  {
    id: 6,
    name: "Lettuce",
    unitPrice: 8.0,
    category: "Vegetables",
    quantity: 25,
  },
  {
    id: 7,
    name: "Wheat",
    unitPrice: 10.0,
    category: "Grains/Cereals",
    quantity: 40,
  },
  {
    id: 8,
    name: "Rice",
    unitPrice: 12.7,
    category: "Grains/Cereals",
    quantity: 35,
  },
  {
    id: 9,
    name: "Sunflower Oil",
    unitPrice: 24.0,
    category: "Oils",
    quantity: 8,
  },
];

export default class EditFoodItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawMaterials: rawMaterials,
      foodItem: {
        foodItemName: "Egg Sandwich",
        selectedRawMaterials: [
          {
            id: 2,
            name: "Egg",
            unitPrice: 0.8,
            category: "Meat, poultry, fish, and eggs",
            quantity: 2,
          },
          {
            id: 1,
            name: "Bread",
            unitPrice: 1.5,
            category: "Grains/Cereals",
            quantity: 1,
          },
        ],
        manufacturerCost: 20,
        totalCost: 23.1,
      },
      rawMaterialQuantityModal: {
        show: false,
        selectedRawMaterial: "",
        selectedRawMaterialQuantity: 0,
      },
      isError: {
        foodItemName: "",
        selectedRawMaterials: "",
        selectedRawMaterialQuantity: "",
        manufacturerCost: "",
      },
    };
  }

  filterRawMaterial = (e) => {
    e.preventDefault();
    const {value} = e.target;

    this.setState({
      rawMaterials: rawMaterials.filter((rawMaterial) =>
        rawMaterial.name.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let isError = {...this.state.isError};

    this.validator("foodItemName", this.state.foodItem.foodItemName, isError);
    this.validator(
      "rawMaterials",
      this.state.foodItem.selectedRawMaterials,
      isError
    );
    this.validator(
      "manufacturerCost",
      this.state.foodItem.manufacturerCost,
      isError
    );

    let isValid = true;
    Object.values(isError).forEach((error) => {
      if (error.length > 0) {
        isValid = false;
      }
    });

    if (isValid) {
      this.props.history.push({
        pathname: "/food-item/confirmation",
        confirmation: {
          message: this.state.foodItem.foodItemName + " Edited Successfully",
          redirect: "/food-items",
          button: "GO TO FOOD ITEMS",
        },
      });
    }

    this.setState({
      isError: isError,
    });
  };

  onFoodItemNameChange = (e) => {
    let state = {...this.state};

    state.foodItem.foodItemName = e.target.value;

    if (e.target.value.length < 0) {
      state.isError.foodItemName = "Required field.";
    }
    // this.validator("foodItemName", state.foodItem.foodItemName, state.isError);

    this.setState(state);
  };

  onManufacturerCostChange = (cost) => {
    let state = {...this.state};

    state.foodItem.manufacturerCost = cost;
    let totalCost = 0;
    this.validator(
      "manufacturerCost",
      state.foodItem.manufacturerCost,
      state.isError
    );
    if (state.foodItem.selectedRawMaterials.length > 0) {
      state.foodItem.selectedRawMaterials.forEach((rawMaterial) => {
        totalCost += rawMaterial.unitPrice * rawMaterial.quantity;
      });
    }
    state.foodItem.totalCost = parseFloat(totalCost) + parseFloat(cost);
    this.setState(state);
  };

  validator = (name, value, isError) => {
    switch (name) {
      case "modalRawMaterialQuantity":
        isError.selectedRawMaterialQuantity = "";
        if (value.length === 0 || value <= 0) {
          isError.selectedRawMaterialQuantity =
            "Quantity should be greater than 0";
        } else if (
          this.state.rawMaterialQuantityModal.selectedRawMaterial.quantity <
          this.state.rawMaterialQuantityModal.selectedRawMaterialQuantity
        ) {
          isError.selectedRawMaterialQuantity = "Insufficient Quantity";
        }
        break;
      case "foodItemName":
        isError.foodItemName = "";
        if (!value || value.length === 0) {
          isError.foodItemName = "Please enter food item name";
        }
        break;
      case "rawMaterials":
        isError.selectedRawMaterials = "";
        if (value.length === 0) {
          isError.selectedRawMaterials =
            "Please select one or more raw materials";
        }
        break;
      case "manufacturerCost":
        isError.manufacturerCost = "";
        if (!value || value.length === 0) {
          isError.manufacturerCost = "Please enter valid cost.";
        }
        break;
      default:
        break;
    }
  };

  addRawMaterial = (rawMaterial) => {
    let state = {...this.state};

    state.rawMaterialQuantityModal.selectedRawMaterial = rawMaterial;

    this.setState(state);

    this.showModal();
  };

  deleteRawMaterial = (rawMaterial) => {
    let state = {...this.state};

    state.foodItem.selectedRawMaterials =
      state.foodItem.selectedRawMaterials.filter(
        (e) => e.id !== rawMaterial.id
      );

    state.foodItem.totalCost -= rawMaterial.unitPrice * rawMaterial.quantity;

    this.validator(
      "rawMaterials",
      this.state.foodItem.selectedRawMaterials,
      state.isError
    );

    this.setState(state);
  };

  closeModal = () => {
    let state = {...this.state};

    state.rawMaterialQuantityModal.show = false;

    this.setState(state);
  };

  addRawMaterialToFoodItem = (e) => {
    e.preventDefault();

    let state = {...this.state};

    if (state.rawMaterialQuantityModal.selectedRawMaterialQuantity > 0) {
      state.rawMaterialQuantityModal.selectedRawMaterial["quantity"] =
        state.rawMaterialQuantityModal.selectedRawMaterialQuantity;
      state.foodItem.selectedRawMaterials.push(
        state.rawMaterialQuantityModal.selectedRawMaterial
      );
      state.foodItem.totalCost +=
        state.rawMaterialQuantityModal.selectedRawMaterial.unitPrice *
        state.rawMaterialQuantityModal.selectedRawMaterialQuantity;

      state.rawMaterialQuantityModal.selectedRawMaterial = "";
      state.rawMaterialQuantityModal.selectedRawMaterialQuantity = 0;
      state.rawMaterialQuantityModal.show = false;

      this.validator(
        "rawMaterials",
        this.state.foodItem.selectedRawMaterials,
        state.isError
      );
    } else {
      this.validator("modalRawMaterialQuantity", 0, state.isError);
    }

    this.setState(state);
  };

  rawMaterialQuantityChangeListener = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    let state = {...this.state};
    state.rawMaterialQuantityModal.selectedRawMaterialQuantity = value;

    this.validator(name, value, state.isError);

    this.setState(state);
  };

  showModal = () => {
    let state = {...this.state};

    state.rawMaterialQuantityModal.show = true;

    this.setState(state);
  };

  render() {
    const {isError} = this.state;

    return (
      <section>
        <Header/>
        <Row className={"m-3"}>
          <Col sm={5}>
            <Card>
              <Card.Body>
                <Card.Title>Food Item</Card.Title>
                <Card.Text>
                  <strong>Food Item Name :</strong>{" "}
                  {this.state.foodItem.foodItemName}
                </Card.Text>
                {this.state.foodItem.selectedRawMaterials &&
                this.state.foodItem.selectedRawMaterials.length > 0 && (
                  <section className={"mt-5"}>
                    <strong>Selected Raw Materials</strong>
                    <ListGroup
                      className={"mt-3 po-selected-raw-material-list"}
                    >
                      {this.state.foodItem.selectedRawMaterials.map(
                        (rawMaterial) => (
                          <ListGroup.Item key={rawMaterial.id}>
                            <Row>
                              <Col sm={4} className={"pl-3 text-left"}>
                                <h6>
                                  <span>{rawMaterial.name}</span>
                                  <br/>
                                  <span>
                                      <small>{rawMaterial.category}</small>
                                    </span>
                                </h6>
                              </Col>
                              <Col sm={4} className={"pl-3"}>
                                <h6>
                                    <span>
                                      <strong>Quantity</strong>
                                    </span>
                                  <br/>
                                  <span>{rawMaterial.quantity}</span>
                                </h6>
                              </Col>
                              <Col sm={3}>
                                <h6>
                                    <span>
                                      <strong>Unit Price</strong>
                                    </span>
                                  <br/>
                                  <span>${rawMaterial.unitPrice}</span>
                                </h6>
                              </Col>
                              <Col sm={1}>
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  color={"#ba2311"}
                                  onClick={() =>
                                    this.deleteRawMaterial(rawMaterial)
                                  }
                                />
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )
                      )}
                    </ListGroup>
                  </section>
                )}
                <Card.Text className="mt-5">
                  <strong>Total Cost :</strong>{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(this.state.foodItem.totalCost)}
                </Card.Text>
                <Button
                  variant={"primary"}
                  className="mt-3"
                  onClick={this.onSubmit}
                  block
                >
                  Edit Food Item
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={7}>
            <Card>
              <Card.Body className={"text-left"}>
                <Card.Title>Edit Food Item</Card.Title>
                <Row className={"mt-3"}>
                  <Col sm={12}>
                    <Form.Group controlId="fooditemname">
                      <Form.Label>
                        <strong>Food Item Name</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={isError.foodItemName ? "is-invalid" : ""}
                        placeholder="Enter Food Item Name"
                        onChange={(e) => {
                          this.onFoodItemNameChange(e);
                        }}
                        value="Egg Sandwich"
                      />
                      {isError.foodItemName.length > 0 && (
                        <Form.Control.Feedback type={"invalid"}>
                          {isError.foodItemName}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={"mt-3"}>
                  <Col>
                    <Form.Group controlId="rawMaterials">
                      <Row>
                        <Col sm={7} className={"pt-2"}>
                          <Form.Label>
                            <strong>Raw Materials</strong>
                          </Form.Label>
                        </Col>
                        <Col sm={5}>
                          <InputGroup>
                            <FormControl
                              placeholder="Search"
                              onChange={this.filterRawMaterial}
                              aria-label="Search"
                              aria-describedby="search-control"
                            />
                            <InputGroup.Append>
                              <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch}/>
                              </InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Col>
                      </Row>
                      <ListGroup
                        className={
                          isError.selectedRawMaterials.length > 0
                            ? "is-invalid mt-3 po-raw-material-list"
                            : "mt-3 po-raw-material-list"
                        }
                      >
                        {this.state.rawMaterials.map((rawMaterial) => (
                          <ListGroup.Item key={rawMaterial.id}>
                            <Row>
                              <Col sm={5} className={"pl-3"}>
                                <h6>
                                  <span>{rawMaterial.name}</span>
                                  <br/>
                                  <span>
                                    <small>{rawMaterial.category}</small>
                                  </span>
                                </h6>
                              </Col>
                              <Col sm={5}>
                                <h6>
                                  <span>
                                    <strong>Unit Price:</strong>
                                  </span>
                                  <span> ${rawMaterial.unitPrice}</span>
                                </h6>
                              </Col>
                              <Col sm={2}>
                                <Button
                                  variant={"secondary"}
                                  onClick={() =>
                                    this.addRawMaterial(rawMaterial)
                                  }
                                >
                                  Add
                                </Button>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                      {isError.selectedRawMaterials.length > 0 && (
                        <Form.Control.Feedback type={"invalid"}>
                          {isError.selectedRawMaterials}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={"mt-3"}>
                  <Col sm={12}>
                    <Form.Group controlId="vendor">
                      <Form.Label>
                        <strong>Manufacturer Cost</strong>
                      </Form.Label>
                      <Form.Control
                        name={"manufacturercost"}
                        type="number"
                        step=".01"
                        onChange={(e) => {
                          this.onManufacturerCostChange(e.target.value);
                        }}
                        className={
                          isError.manufacturerCost.length > 0
                            ? "is-invalid"
                            : ""
                        }
                        placeholder="Enter Manufacturer Cost"
                        value={this.state.foodItem.manufacturerCost}
                      />
                      {isError.manufacturerCost.length > 0 && (
                        <Form.Control.Feedback type={"invalid"}>
                          {isError.manufacturerCost}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Modal
            show={this.state.rawMaterialQuantityModal.show}
            animation={false}
            onHide={this.closeModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Enter Quantity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className={"m-0"}>
                  <strong>Raw Material</strong>
                </Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={
                    this.state.rawMaterialQuantityModal.selectedRawMaterial.name
                  }
                  className={"p-0"}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <strong>Quantity : </strong>
                </Form.Label>
                <Form.Control
                  name={"modalRawMaterialQuantity"}
                  type="number"
                  step=".01"
                  onChange={this.rawMaterialQuantityChangeListener}
                  className={
                    isError.selectedRawMaterialQuantity.length > 0
                      ? "is-invalid"
                      : ""
                  }
                  placeholder="Enter Quantity"
                />
                {isError.selectedRawMaterialQuantity.length > 0 && (
                  <Form.Control.Feedback type={"invalid"}>
                    {isError.selectedRawMaterialQuantity}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={this.addRawMaterialToFoodItem}
              >
                Add to Food Item
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </section>
    );
  }
}
