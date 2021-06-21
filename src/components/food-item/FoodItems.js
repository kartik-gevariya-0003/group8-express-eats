import { Button, Col, Row } from "react-bootstrap";
import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../headers/Header";
function FoodItems() {
  const history = useHistory();

  const goToCreateFoodItem = () => {
    history.push("/food-items/create");
  };

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
          <Button variant={"primary"} onClick={goToCreateFoodItem}>
            Create Food Item
          </Button>
        </Col>
      </Row>
    </section>
  );
}

export default FoodItems;
