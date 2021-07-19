import {
  Button,
  Card,
  CardDeck,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Modal,
} from "react-bootstrap";
import React, { Component } from "react";
import Header from "../headers/Header";
import {
  faPencilAlt,
  faSearch,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default class FoodItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItemsDB: null,
      originalFoodItemsList: null,
      deleteFoodItemModal: {
        show: false,
        id: -1,
        foodItemName: "",
      },
    };
  }

  goToCreateFoodItem = () => {
    this.props.history.push("/food-items/create");
  };

  async deleteFoodItem(id) {
    let state = { ...this.state };

    state.foodItemsDB = state.foodItemsDB.filter((x) => {
      return x.id !== id;
    });
    this.closeModal();
    this.setState(state);
    await axios
      .delete("http://localhost:3001/delete-food-item/" + id)
      .then((response) => {
        toast.success("Food Item deleted successfully!");
      })
      .catch((error) => {
        toast.error(
          "There was some problem deleting the food item. Please try again later."
        );
      });
  }

  goToEditFoodItem = (foodItem) => {
    this.props.history.push({
      pathname: "/edit-food-item",
      state: foodItem.id,
    });
  };

  showModal = (foodItem) => {
    let state = { ...this.state };
    state.deleteFoodItemModal.show = true;
    state.deleteFoodItemModal.id = foodItem.id;
    state.deleteFoodItemModal.name = foodItem.name;
    this.setState(state);
  };

  closeModal = () => {
    let state = { ...this.state };

    state.deleteFoodItemModal.show = false;
    state.deleteFoodItemModal.id = -1;
    state.deleteFoodItemModal.name = "";
    this.setState(state);
  };
  componentDidMount() {
    this.loadFoodItems();
  }
  loadFoodItems = async () => {
    let state = { ...this.state };

    await axios
      .get("http://localhost:3001/get-food-items")
      .then((result) => {
        state.foodItemsDB = result.data.foodItems;
        state.foodItemsDB.forEach((foodItem) => {
          foodItem.imageFile = new Buffer.from(
            foodItem.imageFile.data
          ).toString("base64");
        });
        state.originalFoodItemsList = state.foodItemsDB;
      })
      .catch((error) => {
        console.error(error);
      });

    this.setState(state);
  };

  searchFoodItems = (value) => {
    this.setState({
      foodItemsDB: this.state.originalFoodItemsList.filter((item) =>
        item.foodItemName.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  render() {
    return (
      <section>
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
        <Header />
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Food Items</h2>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={8} className={"text-left"}>
            <Button variant={"primary"} onClick={this.goToCreateFoodItem}>
              Create Food Item
            </Button>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <InputGroup>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-control"
                  onChange={(e) => {
                    this.searchFoodItems(e.target.value);
                  }}
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="m-3">
          <CardDeck className="row row-cols-md-4 row-cols-sm-3 deck">
            {this.state.foodItemsDB ? (
              this.state.foodItemsDB.map((foodItem) => (
                <Col className="mb-3" key={foodItem.id}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={`data:image/jpeg;base64,${foodItem.imageFile}`}
                    />
                    <Card.Body>
                      <Card.Title>{foodItem.foodItemName}</Card.Title>

                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        color={"#035384AA"}
                        className="float-left"
                        onClick={() => {
                          this.goToEditFoodItem(foodItem);
                        }}
                      />

                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        color={"#ba2311"}
                        onClick={() => {
                          this.showModal(foodItem);
                        }}
                        className="float-right  "
                      />
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <span>No Food Items to display</span>
            )}
          </CardDeck>
        </Row>
        <Modal
          show={this.state.deleteFoodItemModal.show}
          animation={false}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label className={"m-0"}>
                <strong>
                  Are you sure you want to delete{" "}
                  {this.state.deleteFoodItemModal.name}?{" "}
                </strong>
              </Form.Label>
              <Form.Label className={"m-0"}>
                The food item should not be present in any Open Manufacturing
                Orders.
              </Form.Label>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() =>
                this.deleteFoodItem(this.state.deleteFoodItemModal.id)
              }
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
