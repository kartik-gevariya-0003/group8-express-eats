// Author: Karishma Suresh Lalwani
/*
* Functionality to Add new raw material details in the system
* */

import React from "react";
import {Button, Card, Col, Form, InputGroup, Row,} from "react-bootstrap";
import ApplicationContainer from "../ApplicationContainer";
import axios from 'axios';
import Select from "react-select";
import {CREATE_RAW_MATERIAL, GET_VENDORS} from "../../config";
import {toast} from "react-toastify";

export class AddRawMaterial extends ApplicationContainer {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      rawMaterial: {
        id: '',
        rawMaterialName: "",
        vendorIds: [],
        unitCost: "",
        unitMeasurementCode: "",
        unitMeasurementValue: ""
      },
      vendorOptions: [],
      unitMeasurementOptions: [
        {id: 1, value: 'g'},
        {id: 2, value: 'ml'},
        {id: 3, value: 'L'},
        {id: 4, value: 'gal'},
        {id: 5, value: 'lb'}
      ],
      errors: {
        rawMaterialName: "",
        vendorIds: [],
        unitCost: "",
        unitMeasurementCode: "",
        unitMeasurementValue: ""
      },
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      const headers = {
        'Authorization': 'Bearer ' + user.token
      }
      this.getVendors(headers)
    }
  }

  // GET API call to fetch the vendor
  getVendors(headers) {
    this.setState({loading: true});
    axios.get(GET_VENDORS, {headers: headers}).then(result => {
      this.setState({loading: false});
      let vendorOptions = result.data.vendors;
      this.setState({vendorOptions: vendorOptions});
    }).catch((error) => {
      this.setState({loading: false});
      if (error.response && error.response.status === 401) {
        toast.error('Session is expired. Please login again.');
        localStorage.removeItem('user');
        this.props.history.push({
          pathname: '/login'
        });
      } else {
        const errorMessage = (error.response && error.response.data && error.response.data.message) || "Error occurred while fetching vendors."
        toast.error(errorMessage);
      }
    });
  }

  //Form-validations
  validator = (name, value, errors) => {
    switch (name) {
      case "rawMaterialName":
        errors.rawMaterialName = "";
        if (!value || value.length === 0) {
          errors.rawMaterialName = "Please enter raw material name.";
        }
        break;
      case "vendorIds":
        errors.vendorIds = "";
        if (!value || value.length === 0) {
          errors.vendorIds = "Please select vendors.";
        }
        break;
      case "unitCost":
        errors.unitCost = "";
        if (!value || value.length === 0) {
          errors.unitCost = "Please enter unit cost";
        }
        break;
      case "unitMeasurementCode":
        errors.unitMeasurementCode = "";
        if (!value || value.length === 0) {
          errors.unitMeasurementCode = "Please select a unit of measurement.";
        }
        break;
      case "unitMeasurementValue":
        errors.unitMeasurementValue = "";
        if (!value || value.length === 0) {
          errors.unitMeasurementValue = "Please enter unit measurement value";
        }
        break;
    }
  };

  setRawMaterialName = (e) => {
    let state = {...this.state};
    state.rawMaterial.rawMaterialName = e.target.value;
    this.validator("rawMaterialName", state.rawMaterial.rawMaterialName, state.errors);
    this.setState(state);
  };

  setUnitCost = (e) => {
    let state = {...this.state};
    state.rawMaterial.unitCost = e.target.value;
    this.validator("unitCost", state.rawMaterial.unitCost, state.errors);
    this.setState(state);
  };

  setUnitMeasurement = (e) => {
    let state = {...this.state};
    state.rawMaterial.unitMeasurementValue = e.target.value;
    this.validator("unitMeasurementValue", state.rawMaterial.unitMeasurementValue, state.errors);
    this.setState(state);
  };

  onVendorSelect = (selectedVendor) => {
    let state = {...this.state};
    state.rawMaterial.vendorIds = []
    if (selectedVendor.length) {
      selectedVendor.forEach(vendor => {
        state.rawMaterial.vendorIds.push(vendor.id)
      })
    }
    this.validator('vendorIds', this.state.rawMaterial.vendorIds, state.errors);
    this.setState(state);
  }

  onMeasurementSelect = (selectedMeasurement) => {
    let state = {...this.state};
    state.rawMaterial.unitMeasurementCode = selectedMeasurement ? selectedMeasurement.value : null;
    this.validator('unitMeasurementCode', this.state.rawMaterial.unitMeasurementCode, state.errors);
    this.setState(state);
  }

  //Cancel-button handler
  cancelHandler = (e) => {
    this.props.history.push("/raw-materials");
  };

  //Submit-button handler
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {...this.state.errors};
    this.validator("rawMaterialName", this.state.rawMaterial.rawMaterialName, errors);
    this.validator("vendorIds", this.state.rawMaterial.vendorIds, errors);
    this.validator("unitCost", this.state.rawMaterial.unitCost, errors);
    this.validator("unitMeasurementCode", this.state.rawMaterial.unitMeasurementCode, errors);
    this.validator("unitMeasurementValue", this.state.rawMaterial.unitMeasurementValue, errors);

    let isValid = true;
    Object.values(errors).forEach(error => {
      if (error.length > 0) {
        isValid = false;
      }
    });

    if (isValid) {
      const postData = this.state.rawMaterial
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        const headers = {
          'Authorization': 'Bearer ' + user.token
        }
        this.setState({loading: true});
        //POST API call for adding new raw material details in the system
        axios.post(CREATE_RAW_MATERIAL, postData, {headers: headers}).then((response) => {
          this.setState({loading: false});
          toast.success("Raw Material created successfully.");
          this.props.history.push({
            pathname: '/raw-materials',
          });
        }).catch((error) => {
          this.setState({loading: false});
          if (error.response && error.response.status === 401) {
            toast.error('Session is expired. Please login again.');
            localStorage.removeItem('user');
            this.props.history.push({
              pathname: '/login'
            });
          } else {
            const errorMessage = (error.response && error.response.data && error.response.data.message) || "Error occurred while creating raw materials."
            toast.error(errorMessage);
          }
        });
      }
    }
    this.setState({
      errors: errors,
    });
  };

  render() {
    return (
      <section className={"pb-5"}>
        {this.state.loading &&
        <div className="dialog-background">
          <div className="dialog-loading-wrapper">
            <img src={"/confirmation.gif"} alt={"Loading..."} className={"loading-img"}/>
          </div>
        </div>
        }
        {super.render()}
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Add Raw Material</h2>
            <hr/>
          </Col>
        </Row>
        <Row className={"m-3 justify-content-center"}>
          <Col sm={10}>
            <Card>
              <Card.Body className={"text-left"}>
                <Row className={"mt-3"}>
                  <Col sm={12}>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={6}>
                            <Form.Label>Name <sup className={"text-danger"}>*</sup></Form.Label>
                            <Form.Control type="text" name="rawMaterialName"
                                          placeholder={"Enter Raw Material Name"}
                                          onChange={this.setRawMaterialName}
                                          className={this.state.errors.rawMaterialName ? "is-invalid" : ""}/>
                            {this.state.errors.rawMaterialName.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.rawMaterialName}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                          <Col sm={6}>
                            <Form.Label>Vendor Name <sup className={"text-danger"}>*</sup></Form.Label>
                            <Select
                              isClearable
                              isMulti
                              className={this.state.errors.vendorIds.length > 0 ? "is-invalid" : ""}
                              options={this.state.vendorOptions}
                              getOptionValue={vendor => vendor.id}
                              getOptionLabel={vendor => `${vendor.vendorName} (${vendor.contactPersonName})`}
                              placeholder="Select Vendor"
                              onChange={this.onVendorSelect}
                            />
                            {this.state.errors.vendorIds.length > 0 && (
                              <Form.Control.Feedback
                                type={"invalid"}>{this.state.errors.vendorIds}</Form.Control.Feedback>
                            )}
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={6}>
                            <Form.Label>Unit Cost <sup className={"text-danger"}>*</sup></Form.Label>
                            <InputGroup className="mb-3" hasValidation>
                              <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control type="text" name="unitCost"
                                            placeholder={"Enter Unit Cost"}
                                            onChange={this.setUnitCost}
                                            className={this.state.errors.unitCost ? "is-invalid" : ""}/>
                              {this.state.errors.unitCost.length > 0 && (
                                <Form.Control.Feedback type={"invalid"}>
                                  {this.state.errors.unitCost}
                                </Form.Control.Feedback>
                              )}
                            </InputGroup>
                          </Col>
                          <Col sm={3}>
                            <Form.Label>Unit Measurement <sup className={"text-danger"}>*</sup></Form.Label>
                            <Form.Control type="number" name="unitMeasurement"
                                          step=".01"
                                          placeholder={"Enter Unit"}
                                          onChange={this.setUnitMeasurement}
                                          className={this.state.errors.unitMeasurementValue ? "is-invalid" : ""}/>
                            {this.state.errors.unitMeasurementValue.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.unitMeasurementValue}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                          <Col sm={3}>
                            <Form.Label>&nbsp;</Form.Label>
                            <Select
                              isClearable
                              className={this.state.errors.unitMeasurementCode ? "is-invalid" : ""}
                              options={this.state.unitMeasurementOptions}
                              getOptionValue={unitMeasurementCode => unitMeasurementCode.value}
                              getOptionLabel={unitMeasurementCode => `${unitMeasurementCode.value}`}
                              placeholder="Select Measurement"
                              onChange={this.onMeasurementSelect}
                            />
                            {this.state.errors.unitMeasurementCode.length > 0 && (
                              <Form.Control.Feedback
                                type={"invalid"}>{this.state.errors.unitMeasurementCode}</Form.Control.Feedback>
                            )}
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