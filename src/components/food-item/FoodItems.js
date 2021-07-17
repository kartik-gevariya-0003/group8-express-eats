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

const foodItems = [
  { id: 1, name: "Egg Sandwich", quantity: 23, src: "/egg_sandwich.jpg" },
  { id: 2, name: "Pepperoni Pizza", quantity: 3, src: "/pizza.jpg" },
  { id: 3, name: "Cheese Burger", quantity: 3, src: "/cheese_burger.jpg" },
  { id: 4, name: "Fish and Chips", quantity: 1, src: "/fish_chips.jpg" },
  { id: 5, name: "Dim Sums", quantity: 5, src: "/dimsums.jpg" },
  { id: 6, name: "Tacos", quantity: 23, src: "/tacos.jpg" },
  { id: 7, name: "Greek Salad", quantity: 4, src: "/greek_salad.jpg" },
  { id: 8, name: "Sushi", quantity: 10, src: "/sushi.jpg" },
];

export default class FoodItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: foodItems,
      foodItemsDB: null,
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

  deleteFoodItem(id) {
    let state = { ...this.state };

    state.foodItems = state.foodItems.filter((x) => {
      return x.id !== id;
    });
    this.closeModal();
    this.setState(state);
  }

  goToEditFoodItem = (foodItem) => {
    console.log(foodItem);
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
  async componentDidMount() {
    await this.loadFoodItems();
  }
  loadFoodItems = async () => {
    let state = { ...this.state };
    console.log("in loadFoodItems");
    await axios
      .get("http://localhost:3001/get-food-items")
      .then((result) => {
        console.log("in then of axios ");
        state.foodItemsDB = result.data.foodItems;
        state.foodItemsDB.forEach((foodItem) => {
          foodItem.imageFile = new Buffer.from(
            foodItem.imageFile.data
          ).toString("base64");
        });
      })
      .catch((error) => {
        console.error(error);
      });

    this.setState(state);
  };
  render() {
    return (
      <section>
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
              <></>
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
