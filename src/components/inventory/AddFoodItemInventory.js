import React from "react";
import ApplicationContainer from "../ApplicationContainer";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
export class AddFoodItemInventory extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.state = {
      foodItemName: "",
      quantity: 0,
      errors: {
        foodItemName: "",
        quantity: "",
      },
      foodItems: this.props.foodItems,
    };
    console.log(this.props.foodItems);
  }
  validator = (name, value, errors) => {
    switch (name) {
      case "foodItemName":
        let alphabetRegex = new RegExp("^[a-zA-Z]*$");
        errors.foodItemName = "";
        if (!value || value.length === 0) {
          errors.foodItemName = "Required Field";
        } else if (!alphabetRegex.test(value)) {
          errors.foodItemName = "Only Alphabets allowed.";
        }
        break;
      case "quantity":
        errors.quantity = "";
        if (!value || value.length === 0) {
          errors.quantity = "Required Field";
        }
        break;
    }
  };

  setFoodItemName = (value) => {
    let state = { ...this.state };

    state.foodItemName = value;

    this.validator("foodItemName", state.foodItemName, state.errors);

    this.setState(state);
  };

  setQuantity = (value) => {
    let state = { ...this.state };

    state.quantity = value;

    this.validator("quantity", state.quantity, state.errors);

    this.setState(state);
  };

  goToInventory = () => {
    this.props.history.push("/inventory");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = { ...this.state.errors };

    this.validator("foodItemName", this.state.foodItemName, errors);
    this.validator("quantity", this.state.quantity, errors);

    let isValid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        isValid = false;
      }
    });

    if (isValid) {
      toast.success(this.state.foodItemName + " added successfully!");
      this.props.closeModal();
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
        <Container>
          <Row>
            <Col sm={12}>
              <Card>
                <Card.Body>
                  <Form onSubmit={this.handleSubmit}>
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
                          options={this.state.foodItems}
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
                            this.setQuantity(e.target.value);
                          }}
                          type="number"
                          className={
                            this.state.errors.quantity ? "is-invalid" : ""
                          }
                        ></Form.Control>
                        {this.state.errors.quantity.length > 0 && (
                          <Form.Control.Feedback type={"invalid"}>
                            {this.state.errors.quantity}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Row>
                    <br></br>
                    <Row className="justify-content-center">
                      <Button variant="primary" className="mr-2" type="submit">
                        Submit
                      </Button>
                      <Button variant="danger" onClick={this.props.closeModal}>
                        Cancel
                      </Button>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default AddFoodItemInventory;
