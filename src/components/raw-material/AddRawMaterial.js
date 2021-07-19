// Author: Karishma Suresh Lalwani
import React, {useState} from "react";
import {Button, Card, Col, Form, Row,} from "react-bootstrap";
import Header from "../headers/Header";
import ApplicationContainer from "../ApplicationContainer";
import axios from 'axios';
import Select from "react-select";

export class AddRawMaterial extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.state = {
      rawMaterial:{
        rawMaterialName: "",
        vendorName: "",
        unitCost: "",
        unitMeasurement: "",
    },
      errors: {
        rawMaterialName: "",
        vendorName: "",
        unitCost: "",
        unitMeasurement: "",
      },
      rawMaterials: this.props.rawMaterials,
    };
    console.log(this.props.rawMaterials);
  }
  formatMeasurementOption = ({})




  onMeasurementSelect = (selectedMeasurement) => {

    let state = {...this.state};

    state.rawMaterial.selectedMeasurement = {...selectedMeasurement};

    this.validator('rawMaterial', this.state.rawMaterial.selectedMeasurement, state.errors);

    this.setState(state);
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
      case "vendorName":
        let alphabetRegex2 = new RegExp("^[a-zA-Z]*$");
        errors.vendorName = "";
        if (!value || value.length === 0) {
          errors.vendorName = "Required Field";
        }
        break;
      case "unitCost":
        errors.unitCost = "";
        if (!value || value.length === 0) {
          errors.unitCost = "Required Field";
        }
        break;
      case "unitMeasurement":
        errors.unitMeasurement = "";
        if (!value || value.length === 0) {
          errors.unitMeasurement = "Required Field";
        }
        break;
    }
  };
  setRawMaterialName = (e) => {
    let state = { ...this.state };
    state.rawMaterial.rawMaterialName = e.target.value;
    this.validator("rawMaterialName", state.rawMaterial.rawMaterialName, state.errors);
    this.setState(state);
  };

  setVendorName = (e) => {
    let state = { ...this.state };
    state.rawMaterial.vendorName = e.target.value;
    this.validator("vendorName", state.rawMaterial.vendorName, state.errors);
    this.setState(state);
  };

  setUnitCost= (e) => {
    let state = { ...this.state };
    state.rawMaterial.unitCost = e.target.value;
    this.validator("unitCost", state.rawMaterial.unitCost, state.errors);
    this.setState(state);
  };

  setUnitMeasurement = (e) => {
    let state = { ...this.state };
    state.rawMaterial.unitMeasurement = e.target.value;
    this.validator("unitMeasurement", state.rawMaterial.unitMeasurement, state.errors);
    this.setState(state);
  };

  cancelHandler = (e) => {
    this.props.history.push("/raw-materials");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = { ...this.state.errors };
    this.validator("rawMaterialName", this.state.rawMaterial.rawMaterialName, errors);
    this.validator("vendorName", this.state.rawMaterial.vendorName, errors);
    this.validator("unitCost", this.state.rawMaterial.unitCost, errors);
    this.validator("unitMeasurement", this.state.rawMaterial.unitMeasurement, errors);

    let isValid = true;
    Object.values(errors).forEach(error => {
      if (error.length > 0) {
        isValid = false;
      }
    });

    if (isValid) {
      const url = "http://localhost:3000/raw-material/add"
        const postData ={
          rawMaterialName : this.state.rawMaterial.rawMaterialName,
          vendorName : this.state.rawMaterial.vendorName,
          unitCost : this.state.rawMaterial.unitCost,
          unitMeasurement : this.state.rawMaterial.unitMeasurement
        }
        axios.post(url,postData).then((response) => {
          this.props.history.push({
            pathname: "/raw-material/confirmation",
            confirmation: {
              message: this.state.rawMaterial.rawMaterialName + " Created Successfully",
              redirect: "/raw-materials",
              button: "Go to Raw Materials",
            }
          })
        });
    }
    this.setState({
      errors: errors,
    });
  };

  render(){
    return(
    <section>
      <Header/>
      <Row className={"mt-3 justify-content-center"}>
        <Col sm={8}>
          <Card>
            <Card.Body className={"text-left"}>
              <Card.Title className={"text-left"}>Add Raw Material</Card.Title>
              <Row className={"mt-5"}>
                <Col sm={12}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={6}>
                          <Form.Label>Name *</Form.Label>
                          <Form.Control type="text" name="rawMaterialName" onChange={(e)=>{
                          this.setRawMaterialName(e);}}
                                        className={this.state.errors.rawMaterialName ? "is-invalid" : ""}/>
                          {this.state.errors.rawMaterialName.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.rawMaterialName}
                              </Form.Control.Feedback>
                          )}
                        </Col>
                        <Col sm={6}>
                          <Form.Label>Vendor Name *</Form.Label>
                          <Form.Control type="text" name="vendorName" onChange={(e)=>{
                          this.setVendorName(e);}}
                                        className={this.state.errors.vendorName ? "is-invalid" : ""}/>
                          {this.state.errors.vendorName.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.vendorName}
                              </Form.Control.Feedback>
                          )}
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={6}>
                          <Form.Label>Unit Cost *</Form.Label>
                          <Form.Control type="float" name="unitCost" onChange={(e)=>{
                            this.setUnitCost(e);}}
                                        className={this.state.errors.unitCost ? "is-invalid" : ""}/>
                          {this.state.errors.unitCost.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.unitCost}
                              </Form.Control.Feedback>
                          )}
                        </Col>
                        <Col sm={3}>
                          <Form.Label>Unit Measurement *</Form.Label>
                          <Form.Control type="number" name="unitMeasurement" onChange={(e)=>{
                            this.setUnitMeasurement(e);}}
                                        className={this.state.errors.unitMeasurement ? "is-invalid" : ""}/>
                          {this.state.errors.unitMeasurement.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.unitMeasurement}
                              </Form.Control.Feedback>
                          )}
                        </Col>
                        <Col sm={3}>
                          <Form.Label>&nbsp;</Form.Label>
                          <Select
                          isClearable
                          className = {this.state.errors.selectedMeasurement ? "is-invalid" : ""}
                          formatOptionLabel={this.formatMeasurementOption}
                          options={this.state.rawMaterial}
                          placeholder="Select Measurement"
                          onChange={this.onMeasurementSelect}
                          />
                          {this.state.error.selectedMeasurement.length > 0 && (
                              <Form.Control.Feedback
                                  type={"invalid"}>{this.state.error.selectedMeasurement}</Form.Control.Feedback>
                          )}
                          />
                            <option>gm</option>
                            <option>ml</option>
                            <option>L</option>
                            <option>gal</option>
                            <option>lb</option>

                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className={"mt-5 mb-3"}>
                      <Row>
                        <Col sm={6} className={"text-right"}>
                          <Button className={"submit-btn"} variant="primary" type="submit">
                            Submit
                          </Button>
                        </Col>
                        <Col sm={6} className={"submit-btn"}>
                          <Button variant="danger" onClick={this.cancelHandler}>
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
}
}

export default AddRawMaterial