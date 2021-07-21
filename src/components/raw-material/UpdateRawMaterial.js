// Author: Karishma Suresh Lalwani
/*
* Functionality to Edit the raw material details in the system
* */

import React from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import {GET_RAW_MATERIAL_BY_ID, GET_VENDORS, UPDATE_RAW_MATERIAL} from "../../config";
import {toast} from "react-toastify";
import Select from "react-select";
import ApplicationContainer from "../ApplicationContainer";

class UpdateRawMaterial extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.state = {
      selectedVendors: null,
      selectedUnitMeasurementCode: null,
      loading: false,
      rawMaterial: {
        id: this.props.location.state,
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
      this.getVendors(headers);
    }
  }

  // GET API call to fetch the vendors
  getVendors(headers) {
    this.setState({loading: true});
    axios.get(GET_VENDORS, {headers: headers}).then(result => {
      this.setState({loading: false});
      let vendorOptions = result.data.vendors;
      this.setState({vendorOptions: vendorOptions});
      this.getRawMaterial(headers);
    }).catch(error => {
      this.setState({loading: false});
      console.log(error)
      toast.error("Error occurred while fetching vendors.");
    })
  }

  // GET API call for raw material by Id
  getRawMaterial(headers) {
    this.setState({loading: true});
    const url = GET_RAW_MATERIAL_BY_ID + this.state.rawMaterial.id
    axios.get(url, {headers: headers}).then(result => {
      this.setState({loading: false});
      let rawMaterial = result.data.rawMaterial;
      let unitCode = rawMaterial.unitMeasurement.replace(/[^0-9.]*/g, "")
      let unitValue = rawMaterial.unitMeasurement.replace(/[0-9.]*/g, "")
      let rawMaterialData = {
        id: rawMaterial.id,
        rawMaterialName: rawMaterial.rawMaterialName,
        unitCost: rawMaterial.unitCost,
        unitMeasurementValue: +unitCode,
        unitMeasurementCode: unitValue,
        vendorIds: rawMaterial.vendors.map(vendor => vendor.id)
      }
      const selectedVendors = this.state.vendorOptions.filter(vendor => rawMaterialData.vendorIds.some(vendorId => vendor.id === vendorId));
      const selectedUnitMeasurementCode = this.state.unitMeasurementOptions.filter(unitMeasurementOption => unitMeasurementOption.value === rawMaterialData.unitMeasurementCode)[0]
      this.setState({
        rawMaterial: rawMaterialData,
        selectedVendors: selectedVendors,
        selectedUnitMeasurementCode: selectedUnitMeasurementCode
      });
    }).catch(error => {
      this.setState({loading: false});
      console.log(error)
      toast.error("Error occurred while fetching raw material.");
    })
  }

  // Form-Validations
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
    state.selectedVendors = []
    if (selectedVendor.length) {
      selectedVendor.forEach(vendor => {
        state.selectedVendors.push(vendor)
        state.rawMaterial.vendorIds.push(vendor.id)
      })
    }
    this.validator('vendorIds', this.state.rawMaterial.vendorIds, state.errors);
    this.setState(state);
  }

  onMeasurementSelect = (selectedMeasurement) => {
    let state = {...this.state};
    state.selectedUnitMeasurementCode = selectedMeasurement
    state.rawMaterial.unitMeasurementCode = selectedMeasurement.value;
    this.validator('unitMeasurementCode', this.state.rawMaterial.unitMeasurementCode, state.errors);
    this.setState(state);
  }

  // Cancel-button handler
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

    // PUT API call for updating the raw material details
    if (isValid) {
      const putData = this.state.rawMaterial
      const user = JSON.parse(localStorage.getItem('user'));
      this.setState({loading: true});
      if (user && user.token) {
        const headers = {
          'Authorization': 'Bearer ' + user.token
        }
        axios.put(UPDATE_RAW_MATERIAL, putData, {headers: headers}).then((response) => {
          this.setState({loading: false});
          toast.success("Raw Material updated successfully.");
          this.props.history.push({
            pathname: '/raw-materials',
          });
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
            <h2>Update Raw Material</h2>
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
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" name="rawMaterialName"
                                          value={this.state.rawMaterial.rawMaterialName}
                                          onChange={this.setRawMaterialName}
                                          className={this.state.errors.rawMaterialName ? "is-invalid" : ""}/>
                            {this.state.errors.rawMaterialName.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.rawMaterialName}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                          <Col sm={6}>
                            <Form.Label>Vendor Name *</Form.Label>
                            <Select
                              isClearable
                              isMulti
                              value={this.state.selectedVendors}
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
                            <Form.Label>Unit Cost *</Form.Label>
                            <Form.Control type="float" name="unitCost"
                                          onChange={this.setUnitCost}
                                          value={this.state.rawMaterial.unitCost}
                                          className={this.state.errors.unitCost ? "is-invalid" : ""}/>
                            {this.state.errors.unitCost.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.unitCost}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                          <Col sm={3}>
                            <Form.Label>Unit Measurement *</Form.Label>
                            <Form.Control type="number" name="unitMeasurement"
                                          step="0.01"
                                          value={this.state.rawMaterial.unitMeasurementValue}
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
                              value={this.state.selectedUnitMeasurementCode}
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

export default UpdateRawMaterial