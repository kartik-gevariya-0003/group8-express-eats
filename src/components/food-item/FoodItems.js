import {Button, Card, CardDeck, Col, Form, FormControl, InputGroup, Row,} from "react-bootstrap";
import React, {Component} from "react";
import Header from "../headers/Header";
import {faPencilAlt, faSearch, faTrashAlt,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const foodItems = [
  {id: 1, name: "Egg Sandwich", quantity: 23, src: "/egg_sandwich.jpg"},
  {id: 2, name: "Pepperoni Pizza", quantity: 3, src: "/pizza.jpg"},
  {id: 3, name: "Cheese Burger", quantity: 3, src: "/cheese_burger.jpg"},
  {id: 4, name: "Fish and Chips", quantity: 1, src: "/fish_chips.jpg"},
  {id: 5, name: "Dim Sums", quantity: 5, src: "/dimsums.jpg"},
  {id: 6, name: "Tacos", quantity: 23, src: "/tacos.jpg"},
  {id: 7, name: "Greek Salad", quantity: 4, src: "/greek_salad.jpg"},
  {id: 8, name: "Sushi", quantity: 10, src: "/sushi.jpg"},
];

export default class FoodItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: foodItems,
    };
  }

  goToCreateFoodItem = () => {
    this.props.history.push("/food-items/create");
  };

  deleteFoodItem(id) {
    let state = {...this.state};

    state.foodItems = state.foodItems.filter((x) => {
      return x.id !== id;
    });
    this.setState(state);
  }

  goToEditFoodItem = (id) => {
    this.props.history.push("/edit-food-item");
  };

  render() {
    return (
      <section>
        <Header/>
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
                    <FontAwesomeIcon icon={faSearch}/>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="m-3">
          <CardDeck className="row row-cols-md-4 row-cols-sm-3 deck">
            {this.state.foodItems.map((foodItem) => (
              <Col className="mb-3" key={foodItem.id}>
                <Card>
                  <Card.Img variant="top" src={foodItem.src}/>
                  <Card.Body>
                    <Card.Title>{foodItem.name}</Card.Title>

                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      color={"#035384AA"}
                      className="float-left"
                      onClick={() => {
                        this.goToEditFoodItem(foodItem.id);
                      }}
                    />

                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      color={"#ba2311"}
                      onClick={() => {
                        this.deleteFoodItem(foodItem.id);
                      }}
                      className="float-right  "
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </CardDeck>
        </Row>
      </section>
    );
  }
}
