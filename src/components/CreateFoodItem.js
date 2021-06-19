import React from "react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Container, Table, Row, Col, Card, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function CreateFoodItem() {
  const [ingredientList, setIngredientList] = useState([
    { rawMaterial: "default", quantity: "default" },
  ]);
  const [foodItemName, setFoodItemName] = useState();
  const [foodItemError, setFoodItemError] = useState();
  const [ingredientsError, setIngredientsError] = useState();
  const [manufacturerCost, setManufacturerCost] = useState();
  const [manufacturerCostError, setManufacturerCostError] = useState();

  const history = useHistory();
  const handleAdd = () => {
    setIngredientList([
      ...ingredientList,
      { rawMaterial: "default", quantity: "default" },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...ingredientList];
    list[index][name] = value;
    setIngredientList(list);
  };

  const handleRemoveClick = () => {
    const list = [...ingredientList];
    list.splice(list.length - 1, 1);
    setIngredientList(list);
  };

  const getValue = (value) => {
    if (value.rawMaterial === "default" || value.quantity === "default") {
      setIngredientsError(true);
      return false;
    }
    return true;
  };

  const checkManufacturer = () => {
    let numericRegEx = new RegExp("^[0-9]*$");
    return numericRegEx.test(manufacturerCost);
  };

  const checkFoodItemName = () => {
    let alphabetRegex = new RegExp("^[a-zA-Z]*$");
    return alphabetRegex.test(foodItemName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFoodItemError(false);
    setIngredientsError(false);
    setManufacturerCostError(false);
    let checkIngredients = ingredientList.every(getValue);
    let manufacturerRegex = checkManufacturer();
    let foodItemNameRegex = checkFoodItemName();
    if (foodItemName && checkIngredients && manufacturerCost) {
      if (manufacturerRegex && foodItemNameRegex) {
        toast.success("Food Item Saved Successfully");
        history.push("/food-items");
      }
    }
    if (!foodItemName || !foodItemNameRegex) {
      setFoodItemError(true);
    }
    if (!manufacturerCost || !manufacturerRegex) {
      setManufacturerCostError(true);
    }
  };
  const goToFoodItems = () => {
    history.push("/food-items");
  };
  return (
    <Container fluid={"sm"}>
      <Row className={"mt-3"}>
        <Col sm>
          <Card>
            <Card.Body>
              <Card.Title className={"text-left"}>Add Food Item</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Row className={"text-left"}>
                  <Col sm={2} className={"text-left"}>
                    <Form.Label>Food Item Name *</Form.Label>
                  </Col>
                  <Col sm={4} className={"text-left"}>
                    <Form.Control
                      name="foodItemName"
                      onChange={(e) => {
                        setFoodItemName(e.target.value);
                      }}
                      className={foodItemError ? "error" : undefined}
                      type="text"
                    ></Form.Control>
                    {foodItemError ? (
                      <Form.Text style={{ color: "red" }}>
                        Required field. Only Alphabets Allowed.
                      </Form.Text>
                    ) : (
                      <span></span>
                    )}
                  </Col>
                </Row>
                <br></br>
                <Row className={"text-left"}>
                  <Col sm={2} className={"text-left"}>
                    <Form.Label>Ingredients</Form.Label>
                  </Col>
                </Row>
                <Row className={"text-centre"}>
                  <Col sm>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Raw Material</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ingredientList.map((x, i) => {
                          return (
                            <tr key={i}>
                              <td className="justify-content-center">
                                <Col md="10">
                                  <Form.Control
                                    name="rawMaterial"
                                    as="select"
                                    value={x.rawMaterial.value}
                                    onChange={(e) => handleInputChange(e, i)}
                                  >
                                    <option value="default">
                                      Please select a Raw Material
                                    </option>
                                    <option value="Milk">Milk</option>
                                    <option value="Bread">Bread</option>
                                    <option value="Ice Cream">Ice Cream</option>
                                    <option value="Strawberry">
                                      Strawberry
                                    </option>
                                  </Form.Control>
                                </Col>
                              </td>
                              <td>
                                <Row>
                                  <Col sm="auto" className="text-center">
                                    <Form.Control
                                      name="quantity"
                                      as="select"
                                      value={x.quantity.value}
                                      onChange={(e) => handleInputChange(e, i)}
                                    >
                                      <option value="default">
                                        Please Select Quantity
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </Form.Control>
                                  </Col>
                                  <Col className="text-center">Units</Col>
                                </Row>
                              </td>
                              <td>
                                <Form.Control
                                  className="text-centre"
                                  type="text"
                                  value="10"
                                  disabled
                                ></Form.Control>
                              </td>
                              <td>
                                {ingredientList.length !== 1 &&
                                  ingredientList.length - 1 === i && (
                                    <Button
                                      variant="link"
                                      onClick={() => handleRemoveClick()}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                  )}
                                <span> </span>
                                {ingredientList.length - 1 === i && (
                                  <Button
                                    variant="link"
                                    className="plus"
                                    id="plus"
                                    onClick={handleAdd}
                                  >
                                    <FontAwesomeIcon icon={faPlus} />
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {ingredientsError ? (
                      <Form.Text className="text-left" style={{ color: "red" }}>
                        Please select a value for the ingredient.
                      </Form.Text>
                    ) : (
                      <Form.Text></Form.Text>
                    )}
                  </Col>
                  <Col>
                    <Form.Text className="text-right">
                      Atleast one Raw Material needs to be added
                    </Form.Text>
                  </Col>
                </Row>

                <br></br>
                <Row className={"text-left"}>
                  <Col sm={2}>
                    <Form.Label>Manufacturers Cost *</Form.Label>
                  </Col>
                  <Col sm={4}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <b>$</b>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name="foodItemName"
                        onChange={(e) => {
                          setManufacturerCost(e.target.value);
                        }}
                        className={manufacturerCostError ? "error" : undefined}
                        type="text"
                      ></Form.Control>
                    </InputGroup>
                    {manufacturerCostError ? (
                      <Form.Text style={{ color: "red" }}>
                        Required field. Only Numbers Allowed.
                      </Form.Text>
                    ) : (
                      <span></span>
                    )}
                  </Col>
                </Row>

                <br></br>
                <Row className="text-left">
                  <Col sm={2}>
                    <Form.Label>Total Cost</Form.Label>
                  </Col>
                  <Col sm={4}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <b>$</b>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        disabled
                        value="100"
                        name="totalAmount"
                      ></Form.Control>
                    </InputGroup>
                  </Col>
                </Row>
                <br></br>
                <Row className="justify-content-center">
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={goToFoodItems}
                  >
                    Cancel
                  </Button>
                  <Button variant="secondary" type="submit">
                    Submit
                  </Button>
                </Row>
              </Form>
              <br></br>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateFoodItem;
