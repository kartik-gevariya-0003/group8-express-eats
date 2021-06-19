import React, { useState } from "react";
import { Card, Col, Container, Row, Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Inventory() {
  const [rawMaterialList, setrawMaterialList] = useState([
    { rawMaterial: "Milk", quantity: "10" },
    { rawMaterial: "Sugar", quantity: "2" },
    { rawMaterial: "Apple", quantity: "5" },
    { rawMaterial: "Salt", quantity: "20" },
  ]);
  const [foodItems, setfoodItems] = useState([
    { foodItem: "Sandwich", quantity: "1" },
    { foodItem: "Strawberry Tart", quantity: "10" },
    { foodItem: "Chocolate Cake", quantity: "2" },
    { foodItem: "Spinach Quiche", quantity: "20" },
  ]);
  const history = useHistory();
  const goToAddRawMaterialInventory = () => {
    history.push("/inventory/add-raw-material-inventory");
  };
  const goToAddFoodItemInventory = () => {
    history.push("/inventory/add-food-item-inventory");
  };
  return (
    <Container fluid={"sm"}>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Row className="mt-3">
        <Col sm={6}>
          <Button
            size={"sm"}
            variant="primary"
            className={"float-left"}
            onClick={goToAddRawMaterialInventory}
          >
            Add Raw Materials to Inventory
          </Button>
        </Col>
        <Col sm={6}>
          <Button
            size={"sm"}
            variant="primary"
            className={"float-left"}
            onClick={goToAddFoodItemInventory}
          >
            Add Food Items to Inventory
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={6}>
          <Card>
            <Card.Body>
              <Card.Title className={"text-left"}>Raw Materials</Card.Title>
              {rawMaterialList.length > 0 ? (
                <Table hover responsive="sm">
                  <thead>
                    <tr>
                      <th>Raw Material</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rawMaterialList.map((item) => (
                      <tr key={item.rawMaterial}>
                        <td>{item.rawMaterial}</td>
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
              {foodItems.length > 0 ? (
                <Table hover responsive="sm">
                  <thead>
                    <tr>
                      <th>Food Items</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodItems.map((item) => (
                      <tr key={item.rawMaterial}>
                        <td>{item.foodItem}</td>
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
    </Container>
  );
}

export default Inventory;
