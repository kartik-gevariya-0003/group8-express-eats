import React from "react";
import { ToastContainer } from "react-toastify";
import ApplicationContainer from "../ApplicationContainer";
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  Row,
  Table,
  Modal,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddRawMaterialInventory from "./AddRawMaterialInventory";
import AddFoodItemInventory from "./AddFoodItemInventory";
import "react-toastify/dist/ReactToastify.css";
let originalRawMaterialList = [
  { rawMaterial: "Milk", quantity: "10" },
  { rawMaterial: "Sugar", quantity: "2" },
  { rawMaterial: "Apple", quantity: "5" },
  { rawMaterial: "Salt", quantity: "20" },
];

let rawMaterialList = [
  { rawMaterial: "Milk", quantity: "10" },
  { rawMaterial: "Sugar", quantity: "2" },
  { rawMaterial: "Apple", quantity: "5" },
  { rawMaterial: "Salt", quantity: "20" },
];

let originalFoodItems = [
  { foodItem: "Sandwich", quantity: "1" },
  { foodItem: "Strawberry Tart", quantity: "10" },
  { foodItem: "Chocolate Cake", quantity: "2" },
  { foodItem: "Spinach Quiche", quantity: "20" },
];

let foodItems = [
  { foodItem: "Sandwich", quantity: "1" },
  { foodItem: "Strawberry Tart", quantity: "10" },
  { foodItem: "Chocolate Cake", quantity: "2" },
  { foodItem: "Spinach Quiche", quantity: "20" },
];
export default class Inventory extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.state = {
      originalRawMaterialList: originalRawMaterialList,
      rawMaterialList: rawMaterialList,
      originalFoodItems: originalFoodItems,
      foodItems: foodItems,
      addRawMaterialModal: { show: false },
      addFoodItemModal: { show: false },
      errors: {
        rawMaterialName: "",
        rawMaterialQuantity: "",
        foodItemName: "",
        foodItemQuantity: "",
      },
      newFoodItem: {
        name: "",
        quantity: 0,
      },
      newRawMaterial: {
        name: "",
        quantity: 0,
      },
    };
  }

  searchRawMaterial = (value) => {
    this.setState({
      rawMaterialList: this.state.originalRawMaterialList.filter((item) =>
        item.rawMaterial.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  searchFoodItem = (e) => {
    let value = e.target.value;
    this.setState({
      foodItems: this.state.originalFoodItems.filter((item) =>
        item.foodItem.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  showRawMaterialModal = () => {
    let state = { ...this.state };

    state.addRawMaterialModal.show = true;

    this.setState(state);
  };

  closeRawMaterialModal = () => {
    let state = { ...this.state };

    state.addRawMaterialModal.show = false;

    this.setState(state);
  };

  showFoodItemModal = () => {
    let state = { ...this.state };

    state.addFoodItemModal.show = true;

    this.setState(state);
  };

  closeFoodItemModal = () => {
    let state = { ...this.state };

    state.addFoodItemModal.show = false;

    this.setState(state);
  };

  setFoodItemName = (value) => {
    let state = { ...this.state };

    state.foodItemName = value.foodItem;

    this.validator("foodItemName", state.foodItemName, state.errors);

    this.setState(state);
  };

  setFoodItemQuantity = (value) => {
    let state = { ...this.state };

    state.quantity = value;

    this.validator("quantity", state.quantity, state.errors);

    this.setState(state);
  };

  validator = (name, value, errors) => {
    switch (name) {
      case "rawMaterialName":
        errors.rawMaterialName = "";
        if (!value || value.length === 0) {
          errors.rawMaterialName = "Required Field";
        }
        break;
      case "rawMaterialQuantity":
        errors.rawMaterialQuantity = "";
        if (!value || value.length === 0) {
          errors.rawMaterialQuantity = "Required Field";
        }
        break;
      case "foodItemName":
        let alphabetRegex = new RegExp("^[a-zA-Z]*$");
        errors.foodItemName = "";
        if (!value || value.length === 0) {
          errors.foodItemName = "Required Field";
        }
        break;
      case "foodItemQuantity":
        errors.quantity = "";
        if (!value || value.length === 0) {
          errors.quantity = "Required Field";
        }
        break;
      default:
        break;
    }
  };

  setRawMaterialName = (value) => {
    let state = { ...this.state };
    console.log(value);
    if (value) {
      state.newFoodItem.name = value.rawMaterial;

      this.validator("rawMaterialName", value.rawMaterial, state.errors);

      this.setState(state);
    } else {
      state.newFoodItem.name = null;
      this.validator("rawMaterialName", value, state.errors);
      this.setState(state);
    }
  };

  setRawMaterialQuantity = (value) => {
    let state = { ...this.state };

    state.newFoodItem.quantity = value;

    this.validator("rawMaterialQuantity", value, state.errors);

    this.setState(state);
  };

  handleRawMaterialModalSubmit = (e) => {
    e.preventDefault();
    let errors = { ...this.state.errors };

    this.validator("rawMaterialName", this.state.newRawMaterial.name, errors);
    console.log(this.state.newRawMaterial.name);
    this.validator(
      "rawMaterialQuantity",
      this.state.newFoodItem.quantity,
      errors
    );
    let isValid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        isValid = false;
      }
    });

    if (isValid) {
      toast.success(this.state.rawMaterialName + " added successfully!");
      this.closeRawMaterialModal();
    }
    this.setState({
      errors: errors,
    });
    console.log(this.state.errors);
  };

  formatRawMaterial = ({ rawMaterial }) => (
    <Row>
      <Col>{rawMaterial}</Col>
    </Row>
  );

  handleFoodItemModalSubmit = (e) => {
    e.preventDefault();
    let errors = { ...this.state.errors };

    this.validator("foodItemName", this.state.newFoodItem.name, errors);
    this.validator("foodItemQuantity", this.state.newFoodItem.quantity, errors);

    let isValid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        isValid = false;
      }
    });

    if (isValid) {
      toast.success(this.state.newFoodItem.name + " added successfully!");
      this.closeFoodItemModal();
    }
    this.setState({
      errors: errors,
    });
  };

  formatFoodItem = ({ foodItem }) => (
    <Row>
      <Col>{foodItem}</Col>
    </Row>
  );

  render() {
    return (
      <section>
        {super.render()}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Inventory</h2>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={3}>
            <Button
              variant="primary"
              className={"float-left"}
              onClick={() => {
                this.showRawMaterialModal();
              }}
            >
              Add Raw Materials to Inventory
            </Button>
          </Col>
          <Col sm={3}>
            <InputGroup>
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-control"
                className={"float-right"}
                onChange={(e) => {
                  this.searchRawMaterial(e.target.value);
                }}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col sm={3}>
            <Button
              variant="primary"
              className={"float-left"}
              onClick={() => {
                this.showFoodItemModal();
              }}
            >
              Add Food Items to Inventory
            </Button>
          </Col>
          <Col sm={3}>
            <InputGroup>
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-control"
                className={"float-right"}
                onChange={this.searchFoodItem}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title className={"text-left"}>Raw Materials</Card.Title>
                {this.state.rawMaterialList.length > 0 ? (
                  <Table hover responsive="sm">
                    <thead>
                      <tr>
                        <th className="text-left">Raw Material</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.rawMaterialList.map((item) => (
                        <tr key={item.rawMaterial}>
                          <td className="text-left">{item.rawMaterial}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Card.Text className="text-center">
                    No Raw Materials Available.
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title className={"text-left"}>Food Items</Card.Title>
                {this.state.foodItems.length > 0 ? (
                  <Table hover responsive="sm">
                    <thead>
                      <tr>
                        <th className="text-left">Food Items</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.foodItems.map((item) => (
                        <tr key={item.foodItem}>
                          <td className="text-left">{item.foodItem}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Card.Text className="text-center">
                    No Food Items Available.
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Modal
          show={this.state.addRawMaterialModal.show}
          animation={false}
          onHide={this.closeRawMaterialModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Raw Material to Inventory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleRawMaterialModalSubmit}>
              <Row className={"text-left"}>
                <Col sm={6} className={"text-left"}>
                  <Form.Label>Raw Material Name *</Form.Label>
                </Col>
                <Col sm={6} className={"text-left"}>
                  <Select
                    isClearable
                    className={
                      this.state.errors.rawMaterialName ? "is-invalid" : ""
                    }
                    options={this.state.originalRawMaterialList}
                    formatOptionLabel={this.formatRawMaterial}
                    placeholder="Select"
                    onChange={this.setRawMaterialName}
                  />
                  {this.state.errors.rawMaterialName.length > 0 && (
                    <Form.Control.Feedback type={"invalid"}>
                      {this.state.errors.rawMaterialName}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <br></br>
              <Row className={"text-left"}>
                <Col sm={6} className={"text-left"}>
                  <Form.Label>Quantity *</Form.Label>
                </Col>
                <Col sm={6} className={"text-left"}>
                  <Form.Control
                    name="quantity"
                    onChange={(e) => {
                      this.setRawMaterialQuantity(e.target.value);
                    }}
                    className={
                      this.state.errors.rawMaterialQuantity ? "is-invalid" : ""
                    }
                    type="number"
                  ></Form.Control>
                  {this.state.errors.rawMaterialQuantity.length > 0 && (
                    <Form.Control.Feedback type={"invalid"}>
                      {this.state.errors.rawMaterialQuantity}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <Modal.Footer>
                <Row className="justify-content-center">
                  <Button variant="primary" className="mr-2" type="submit">
                    Submit
                  </Button>
                  <Button variant="danger" onClick={this.closeRawMaterialModal}>
                    Cancel
                  </Button>
                </Row>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal
          show={this.state.addFoodItemModal.show}
          animation={false}
          onHide={this.closeFoodItemModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Food Item to Inventory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleFoodItemModalSubmit}>
              <Row className={"text-left"}>
                <Col sm={6}>
                  <Form.Label>Food Item Name *</Form.Label>
                </Col>
                <Col sm={6}>
                  <Select
                    isClearable
                    className={
                      this.state.errors.foodItemName ? "is-invalid" : ""
                    }
                    options={this.state.originalFoodItems}
                    formatOptionLabel={this.formatFoodItem}
                    placeholder="Select Food Item"
                    onChange={this.setFoodItemName}
                  />

                  {this.state.errors.foodItemName.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      {this.state.errors.foodItemName}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <br></br>
              <Row className={"text-left"}>
                <Col sm={6} className={"text-left"}>
                  <Form.Label>Quantity *</Form.Label>
                </Col>
                <Col sm={6} className={"text-left"}>
                  <Form.Control
                    name="quantity"
                    onChange={(e) => {
                      this.setFoodItemQuantity(e.target.value);
                    }}
                    type="number"
                    className={
                      this.state.errors.foodItemQuantity ? "is-invalid" : ""
                    }
                  ></Form.Control>
                  {this.state.errors.foodItemQuantity.length > 0 && (
                    <Form.Control.Feedback type={"invalid"}>
                      {this.state.errors.foodItemQuantity}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <Modal.Footer>
                <Row className="justify-content-center">
                  <Button variant="primary" className="mr-2" type="submit">
                    Submit
                  </Button>
                  <Button variant="danger" onClick={this.closeFoodItemModal}>
                    Cancel
                  </Button>
                </Row>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </section>
    );
  }
}
