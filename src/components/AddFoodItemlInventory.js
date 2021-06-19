import React, { useState } from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function AddFoodItemInventory() {
  const history = useHistory();
  const [foodItem, setfoodItem] = useState();
  const [foodItemNameError, setfoodItemNameError] = useState();
  const [quantity, setquantity] = useState();
  const [quantityError, setquantityError] = useState();
  const goToInventory = () => {
    history.push("/inventory");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setfoodItemNameError("");
    setquantityError("");
    let alphabetRegex = new RegExp("^[a-zA-Z]*$");
    let numericRegEx = new RegExp("^[0-9]*$");
    if (foodItem && quantity) {
      if (alphabetRegex.test(foodItem) && numericRegEx.test(quantity)) {
        toast.success("Food Item Added successfully!");
        history.push("/inventory");
      }
    }
    if (!alphabetRegex.test(foodItem)) {
      setfoodItemNameError("Only Alphabets allowed.");
    }
    if (!numericRegEx.test(quantity)) {
      setquantityError("Only Numbers allowed.");
    }
    if (!foodItem) {
      setfoodItemNameError("Required Field.");
    }
    if (!quantity) {
      setquantityError("Required Field.");
    }
  };
  return (
    <Container fluid={"sm"}>
      <Row className="mt-3">
        <Col sm={12}>
          <Card>
            <Card.Body>
              <Card.Title className={"text-left"}>New Food Item</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Row className={"text-left"}>
                  <Col sm={2} className={"text-left"}>
                    <Form.Label>Food Item Name *</Form.Label>
                  </Col>
                  <Col sm={4} className={"text-left"}>
                    <Form.Control
                      name="foodItemName"
                      onChange={(e) => {
                        setfoodItem(e.target.value);
                      }}
                      type="text"
                    ></Form.Control>
                    {foodItemNameError ? (
                      <Form.Text style={{ color: "red" }}>
                        {foodItemNameError}
                      </Form.Text>
                    ) : (
                      <span></span>
                    )}
                  </Col>
                </Row>
                <br></br>
                <Row className={"text-left"}>
                  <Col sm={2} className={"text-left"}>
                    <Form.Label>Quantity *</Form.Label>
                  </Col>
                  <Col sm={4} className={"text-left"}>
                    <Form.Control
                      name="quantity"
                      onChange={(e) => {
                        setquantity(e.target.value);
                      }}
                      type="text"
                    ></Form.Control>
                    {quantityError ? (
                      <Form.Text style={{ color: "red" }}>
                        {quantityError}
                      </Form.Text>
                    ) : (
                      <span></span>
                    )}
                  </Col>
                </Row>
                <br></br>
                <Row className="justify-content-center">
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={goToInventory}
                  >
                    Cancel
                  </Button>
                  <Button variant="secondary" type="submit">
                    Submit
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddFoodItemInventory;
