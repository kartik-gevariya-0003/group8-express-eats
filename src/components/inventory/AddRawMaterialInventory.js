import React from "react";

import ApplicationContainer from "../ApplicationContainer";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
export default class AddRawMaterialInventory extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.state = {
      rawMaterialName: "",
      quantity: 0,
      errors: {
        rawMaterialName: "",
        quantity: "",
      },
      rawMaterials: this.props.rawMaterials,
    };
    console.log(this.props.rawMaterials);
  }

  validator = (name, value, errors) => {
    switch (name) {
      case "rawMaterialName":
        let alphabetRegex = new RegExp("^[a-zA-Z]*$");
        errors.rawMaterialName = "";
        if (!value || value.length === 0) {
          errors.rawMaterialName = "Required Field";
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

  setRawMaterialName = (value) => {
    let state = { ...this.state };
    if (value) {
      state.rawMaterialName = value.rawMaterial;

      this.validator("rawMaterialName", state.rawMaterialName, state.errors);

      this.setState(state);
    } else {
      state.rawMaterialName = null;
      this.validator("rawMaterialName", value, state.errors);
      this.setState(state);
    }
  };

  setQuantity = (value) => {
    let state = { ...this.state };

    state.quantity = value;

    this.validator("quantity", state.quantity, state.errors);

    this.setState(state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = { ...this.state.errors };

    this.validator("rawMaterialName", this.state.rawMaterialName, errors);
    console.log(this.state.rawMaterialName);
    this.validator("quantity", this.state.quantity, errors);
    let isValid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        isValid = false;
      }
    });

    if (isValid) {
      toast.success(this.state.rawMaterialName + " added successfully!");
      this.props.closeModal();
    }
    this.setState({
      errors: errors,
    });
    console.log(this.state.errors);
  };

  goToInventory = () => {
    this.props.history.push("/inventory");
  };

  formatRawMaterial = ({ rawMaterial }) => (
    <Row>
      <Col>{rawMaterial}</Col>
    </Row>
  );
  render() {
    return (
      <section>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Form onSubmit={this.handleSubmit}>
                    <Row className={"text-left"}>
                      <Col sm={6} className={"text-left"}>
                        <Form.Label>Raw Material Name *</Form.Label>
                      </Col>
                      <Col sm={6} className={"text-left"}>
                        <Select
                          isClearable
                          className={
                            this.state.errors.rawMaterialName
                              ? "is-invalid"
                              : ""
                          }
                          options={this.state.rawMaterials}
                          formatOptionLabel={this.formatRawMaterial}
                          placeholder="Select"
                          onChange={this.setRawMaterialName}
                        />
                        {this.state.errors.rawMaterialName.length > 0 && (
                          <Form.Control.Feedback type={"invalid"}>
                            {this.state.errors.rawMaterialName}
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
                          className={
                            this.state.errors.quantity ? "is-invalid" : ""
                          }
                          type="number"
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
