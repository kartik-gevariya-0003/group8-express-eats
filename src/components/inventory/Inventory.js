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
} from "react-bootstrap";
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
    };
  }

  goToAddFoodItemInventory = () => {
    this.props.history.push("/inventory/add-food-item-inventory");
  };

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
            <hr/>
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
            <AddRawMaterialInventory
              rawMaterials={this.state.originalRawMaterialList}
              closeModal={this.closeRawMaterialModal}
            ></AddRawMaterialInventory>
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
            <AddFoodItemInventory
              foodItems={this.state.originalFoodItems}
              closeModal={this.closeFoodItemModal}
            ></AddFoodItemInventory>
          </Modal.Body>
        </Modal>
      </section>
    );
  }
}
