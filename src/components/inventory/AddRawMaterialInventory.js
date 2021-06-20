import React, { useState } from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function AddRawMaterialInventory() {
  const history = useHistory();
  const [rawMaterialName, setrawMaterialName] = useState();
  const [rawMaterialNameError, setrawMaterialNameError] = useState();
  const [quantity, setquantity] = useState();
  const [quantityError, setquantityError] = useState();
  const goToInventory = () => {
    history.push("/inventory");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setrawMaterialNameError("");
    setquantityError("");
    let alphabetRegex = new RegExp("^[a-zA-Z]*$");
    let numericRegEx = new RegExp("^[0-9]*$");
    if (rawMaterialName && quantity) {
      if (alphabetRegex.test(rawMaterialName) && numericRegEx.test(quantity)) {
        // toast.success("Raw Material Added successfully!");
        history.push({
          pathname: "/inventory/confirmation",
          confirmation: {
            message: rawMaterialName + " Added Successfully",
            redirect: "/inventory",
            button: "GO TO INVENTORY",
          },
        });
      }
    }
    if (!alphabetRegex.test(rawMaterialName)) {
      setquantityError("Only numbers allowed.");
    }
    if (!numericRegEx.test(quantity)) {
      setrawMaterialNameError("Only Alphabets allowed.");
    }
    if (!rawMaterialName) {
      setrawMaterialNameError("Required Field.");
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
              <Card.Title className={"text-left"}>New Raw Material</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Row className={"text-left"}>
                  <Col sm={2} className={"text-left"}>
                    <Form.Label>Raw Material Name *</Form.Label>
                  </Col>
                  <Col sm={4} className={"text-left"}>
                    <Form.Control
                      name="rawMaterialName"
                      onChange={(e) => {
                        setrawMaterialName(e.target.value);
                      }}
                      type="text"
                    ></Form.Control>
                    {rawMaterialNameError ? (
                      <Form.Text style={{ color: "red" }}>
                        {rawMaterialNameError}
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

export default AddRawMaterialInventory;
