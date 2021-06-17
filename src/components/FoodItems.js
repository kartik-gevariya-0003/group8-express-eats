import { Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import React from "react";
import { useHistory } from "react-router-dom";

function FoodItems() {
  const history = useHistory();

  const goToCreateFoodItem = () => {
    history.push("/food-items/create");
  };

  return (
    <Container fluid={"sm"}>
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
      <Row className="mt-3">
        <Col sm={8}>
          <Button
            size={"sm"}
            variant="success"
            className={"float-left"}
            onClick={goToCreateFoodItem}
          >
            Create a Food Item
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default FoodItems;
