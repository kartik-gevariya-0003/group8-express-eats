// Author: Rotesh Chhabra
/*
 * Functionality to Edit the vendor details in the system
 * */

import "./create-vendor.css";
import {Button, Card, Col, Form, FormControl, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import axios from "axios";
import {GET_VENDOR_BY_ID, UPDATE_VENDOR} from "../../config";
import ApplicationContainer from "../ApplicationContainer";
import React from "react";

export default class CreateVendor extends ApplicationContainer {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      values: {
        id: this.props.location.state,
        vendorName: "",
        address: "",
        contactPersonName: "",
        email: "",
        contactNumber: "",
      },
      errors: {
        errorVendorName: "",
        errorAddress: "",
        errorContactPersonName: "",
        errorEmail: "",
        errorContactNumber: "",
      },
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const headers = {
        Authorization: "Bearer " + user.token,
      };
      this.getVendor(headers);
    }
  }

  cancelHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/vendors");
  };

  getVendor(headers) {
    this.setState({loading: true});
    const url = GET_VENDOR_BY_ID + this.state.values.id;
    axios
      .get(url, {headers: headers})
      .then((result) => {
        this.setState({loading: false});
        let vendor = result.data.vendor;
        let vendorData = {
          vendorName: vendor.vendorName,
          address: vendor.address,
          contactPersonName: vendor.contactPersonName,
          email: vendor.email,
          contactNumber: vendor.contactNumber,
          id: this.props.location.state,
        };
        this.setState({
          values: vendorData,
        });
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log(error);
        toast.error("Error occurred while fetching vendor.");
      });
  }

  setVendorName = (e) => {
    let state = {...this.state};
    state.values.vendorName = e.target.value;
    this.validator("vendorName", state.values.vendorName, state.errors);
    this.setState(state);
  };

  setAddress = (e) => {
    let state = {...this.state};
    state.values.address = e.target.value;
    this.validator("address", state.values.address, state.errors);
    this.setState(state);
  };

  setContactPersonName = (e) => {
    let state = {...this.state};
    state.values.contactPersonName = e.target.value;
    this.validator(
      "contactPersonName",
      state.values.contactPersonName,
      state.errors
    );
    this.setState(state);
  };

  setEmail = (e) => {
    let state = {...this.state};
    state.values.email = e.target.value;
    this.validator("email", state.values.email, state.errors);
    this.setState(state);
  };

  setContactNumber = (e) => {
    let state = {...this.state};
    state.values.contactNumber = e.target.value;
    this.validator("contactNumber", state.values.contactNumber, state.errors);
    this.setState(state);
  };

  onChangeHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  validator = (name, value, errors) => {
    switch (name) {
      case "vendorName":
        if (value.trim() === "") {
          errors.errorVendorName = "Vendor name is required";
        } else if (
          !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(value.trim())
        ) {
          errors.errorVendorName = "Only letters and numbers are allowed";
        } else {
          errors.errorVendorName = "";
        }
        break;
      case "address":
        if (value.trim() === "") {
          errors.errorAddress = "Address is required";
        } else {
          errors.errorAddress = "";
        }

        break;
      case "contactPersonName":
        if (value.trim() === "") {
          errors.errorContactPersonName = "Contact person name is required";
        } else if (
          !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(value.trim())
        ) {
          errors.errorContactPersonName =
            "Only letters and numbers are allowed";
        } else {
          errors.errorContactPersonName = "";
        }

        break;
      case "email":
        if (value.trim() === "") {
          errors.errorEmail = "Email is required";
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
            value.trim()
          )
        ) {
          errors.errorEmail = "Invalid email";
        } else {
          errors.errorEmail = "";
        }

        break;
      case "contactNumber":
        if (value.trim() === "") {
          errors.errorContactNumber = "Contact number is required";
        } else {
          errors.errorContactNumber = "";
        }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {...this.state.errors};
    this.validator("vendorName", this.state.values.vendorName, errors);
    this.validator("address", this.state.values.address, errors);
    this.validator(
      "contactPersonName",
      this.state.values.contactPersonName,
      errors
    );
    this.validator("email", this.state.values.email, errors);
    this.validator("contactNumber", this.state.values.contactNumber, errors);

    let isValid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        isValid = false;
      }
    });

    if (isValid) {
      const putData = this.state.values;
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        const headers = {
          Authorization: "Bearer " + user.token,
        };
        this.setState({loading: true});
        axios
          .put(UPDATE_VENDOR, putData, {headers: headers})
          .then(() => {
            this.setState({loading: false});
            toast.success("Vendor updated successfully.");
            this.props.history.push({
              pathname: "/vendors",
            });
          })
          .catch((error) => {
            this.setState({loading: false});
            if (error.response.status === 401) {
              toast.error("Session is expired. Please login again.");
              localStorage.removeItem("user");
              this.props.history.push({
                pathname: "/login",
              });
            } else {
              toast.error(error.response.data.message);
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
      <section>
        {super.render()}
        {this.state.loading && (
          <div className="dialog-background">
            <div className="dialog-loading-wrapper">
              <img
                src={"/confirmation.gif"}
                alt={"Loading..."}
                className={"loading-img"}
              />
            </div>
          </div>
        )}
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Edit Vendor</h2>
            <hr/>
          </Col>
        </Row>
        <Row className={"m-3 justify-content-center"}>
          <Col sm={8}>
            <Card>
              <Card.Body className={"text-left"}>
                <Row className={"mt-3"}>
                  <Col sm={12}>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={6}>
                            <Form.Label>Vendor Name <sup className={"text-danger"}>*</sup></Form.Label>
                            <Form.Control
                              type="text"
                              name="vendorName"
                              value={this.state.values.vendorName}
                              onChange={this.setVendorName}
                              className={
                                this.state.errors.errorVendorName.length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errors.errorVendorName.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.errorVendorName}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                          <Col sm={6}>
                            <Form.Label>Contact Person Name <sup className={"text-danger"}>*</sup></Form.Label>
                            <Form.Control
                              type="text"
                              name="contactPersonName"
                              value={this.state.values.contactPersonName}
                              onChange={this.setContactPersonName}
                              className={
                                this.state.errors.errorContactPersonName
                                  .length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errors.errorContactPersonName.length >
                            0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.errorContactPersonName}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={12}>
                            <Form.Label>Address <sup className={"text-danger"}>*</sup></Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              value={this.state.values.address}
                              onChange={this.setAddress}
                              className={
                                this.state.errors.errorAddress.length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errors.errorAddress.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.errorAddress}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={6}>
                            <Form.Label>Email <sup className={"text-danger"}>*</sup></Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={this.state.values.email}
                              onChange={this.setEmail}
                              className={
                                this.state.errors.errorEmail.length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />

                            {this.state.errors.errorEmail.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.errorEmail}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                          <Col sm={6}>
                            <Form.Label>Contact Number <sup className={"text-danger"}>*</sup></Form.Label>
                            <Form.Control
                              type="text"
                              name="contactNumber"
                              value={this.state.values.contactNumber}
                              onChange={this.setContactNumber}
                              className={
                                this.state.errors.errorContactNumber.length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errors.errorContactNumber.length > 0 && (
                              <FormControl.Feedback type={"invalid"}>
                                {this.state.errors.errorContactNumber}
                              </FormControl.Feedback>
                            )}
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className={"mt-5 mb-3"}>
                        <Row>
                          <Col sm={6} className={"text-right"}>
                            <Button
                              className={"submit-btn"}
                              variant="primary"
                              type="submit"
                            >
                              Update Vendor
                            </Button>
                          </Col>
                          <Col sm={6} className={"submit-btn"}>
                            <Button
                              variant="danger"
                              onClick={this.cancelHandler}
                            >
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
