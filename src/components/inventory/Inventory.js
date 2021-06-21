import React, {useState} from "react";
import {Button, Card, Col, FormControl, InputGroup, Row, Table,} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Header from "../headers/Header";

function Inventory() {
  const originalRawMaterialList = [
    {rawMaterial: "Milk", quantity: "10"},
    {rawMaterial: "Sugar", quantity: "2"},
    {rawMaterial: "Apple", quantity: "5"},
    {rawMaterial: "Salt", quantity: "20"},
  ];
  const [originalFoodItems, setoriginalFoodItems] = useState([
    {foodItem: "Sandwich", quantity: "1"},
    {foodItem: "Strawberry Tart", quantity: "10"},
    {foodItem: "Chocolate Cake", quantity: "2"},
    {foodItem: "Spinach Quiche", quantity: "20"},
  ]);
  const [rawMaterialList, setrawMaterialList] = useState([
    {rawMaterial: "Milk", quantity: "10"},
    {rawMaterial: "Sugar", quantity: "2"},
    {rawMaterial: "Apple", quantity: "5"},
    {rawMaterial: "Salt", quantity: "20"},
  ]);
  const [foodItems, setfoodItems] = useState([
    {foodItem: "Sandwich", quantity: "1"},
    {foodItem: "Strawberry Tart", quantity: "10"},
    {foodItem: "Chocolate Cake", quantity: "2"},
    {foodItem: "Spinach Quiche", quantity: "20"},
  ]);
  const history = useHistory();
  const goToAddRawMaterialInventory = () => {
    history.push("/inventory/add-raw-material-inventory");
  };
  const goToAddFoodItemInventory = () => {
    history.push("/inventory/add-food-item-inventory");
  };

  const searchRawMaterial = (value) => {
    let thisrawMaterialList = originalRawMaterialList;
    if (value) {
      thisrawMaterialList = thisrawMaterialList.filter((item) =>
        item.rawMaterial.includes(value)
      );
    }
    setrawMaterialList(thisrawMaterialList);
  };

  const searchFoodItem = (value) => {
    let thisfoodItems = originalFoodItems;
    if (value) {
      thisfoodItems = thisfoodItems.filter((item) =>
        item.foodItem.includes(value)
      );
    }
    setfoodItems(thisfoodItems);
  };

  return (
    <section>
      <Header/>
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
            onClick={goToAddRawMaterialInventory}
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
                searchRawMaterial(e.target.value);
              }}
            />
            <InputGroup.Append>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch}/>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <Col sm={3}>
          <Button
            variant="primary"
            className={"float-left"}
            onClick={goToAddFoodItemInventory}
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
              onChange={(e) => {
                searchFoodItem(e.target.value);
              }}
            />
            <InputGroup.Append>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch}/>
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
              {rawMaterialList.length > 0 ? (
                <Table hover responsive="sm">
                  <thead>
                  <tr>
                    <th className="text-left">Raw Material</th>
                    <th>Quantity</th>
                  </tr>
                  </thead>
                  <tbody>
                  {rawMaterialList.map((item) => (
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
              {foodItems.length > 0 ? (
                <Table hover responsive="sm">
                  <thead>
                  <tr>
                    <th className="text-left">Food Items</th>
                    <th>Quantity</th>
                  </tr>
                  </thead>
                  <tbody>
                  {foodItems.map((item) => (
                    <tr key={item.rawMaterial}>
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
    </section>
  );
}

export default Inventory;
