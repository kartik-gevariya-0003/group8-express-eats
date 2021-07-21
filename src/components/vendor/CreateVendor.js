import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./create-vendor.css";

import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import Header from "../headers/Header";
import axios from "axios";
import ApplicationContainer from "../ApplicationContainer";
import { ADD_VENDOR } from "../../config";
import { toast } from "react-toastify";

export default class CreateVendor extends ApplicationContainer {
  constructor(props) {
    super(props);

    this.state = {
      values: {
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

  cancelHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/vendors");
  };

  // onChangeHandler = (e) => {
  //   // setValues((prev) => {
  //   //   return {
  //   //     ...values,
  //   //     [e.target.name]: e.target.value,
  //   //   };
  //   // });

  //   this.setState({
  //     values: {
  //       ...this.state.values,
  //       [e.target.name]: e.target.value,
  //     },
  //   });
  // };

  setVendorName = (e) => {
    let state = { ...this.state };
    state.values.vendorName = e.target.value;
    this.validator("vendorName", state.values.vendorName, state.errors);
    this.setState(state);
  };

  setAddress = (e) => {
    let state = { ...this.state };
    state.values.address = e.target.value;
    this.validator("address", state.values.address, state.errors);
    this.setState(state);
  };

  setContactPersonName = (e) => {
    let state = { ...this.state };
    state.values.contactPersonName = e.target.value;
    this.validator(
      "contactPersonName",
      state.values.contactPersonName,
      state.errors
    );
    this.setState(state);
  };

  setEmail = (e) => {
    let state = { ...this.state };
    state.values.email = e.target.value;
    this.validator("email", state.values.email, state.errors);
    this.setState(state);
  };

  setContactNumber = (e) => {
    let state = { ...this.state };
    state.values.contactNumber = e.target.value;
    this.validator("contactNumber", state.values.contactNumber, state.errors);
    this.setState(state);
  };

  validator = (name, value, errors) => {
    let valid = true;
    switch (name) {
      case "vendorName":
        if (value.trim() === "") {
          errors.errorVendorName = "Vendor name is required";
          // this.setState({
          //   errorVendorName: "Vendor name is required",
          // });
          // valid = false;
        } else if (
          !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(value.trim())
        ) {
          errors.errorVendorName = "Only letters and numbers are allowed";
          // this.setState({
          //   errorVendorName: "Only letters and numbers are allowed",
          // });
          // valid = false;
        } else {
          errors.errorVendorName = "";
          // this.setState({
          //   errorVendorName: "",
          // });
        }
        break;
      case "address":
        if (value.trim() === "") {
          errors.errorAddress = "Address is required";
          // this.setState({
          //   errorAddress: "Address is required",
          // });
          // valid = false;
        } else {
          errors.errorAddress = "";
          // this.setState({
          //   errorAddress: "",
          // });
        }

        break;
      case "contactPersonName":
        if (value.trim() === "") {
          errors.errorContactPersonName = "Contact person name is required";
          // this.setState({
          //   errorContactPersonName: "Contact person name is required",
          // });
          // valid = false;
        } else if (
          !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(value.trim())
        ) {
          errors.errorContactPersonName =
            "Only letters and numbers are allowed";
          // this.setState({
          //   errorContactPersonName: "Only letters and numbers are allowed",
          // });
          // valid = false;
        } else {
          errors.errorContactPersonName = "";
          // this.setState({
          //   errorContactPersonName: "",
          // });
        }

        break;
      case "email":
        if (value.trim() === "") {
          errors.errorEmail = "Email is required";
          // this.setState({
          //   errorEmail: "Email is required",
          // });
          // valid = false;
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
            value.trim()
          )
        ) {
          errors.errorEmail = "Invalid email";
          // this.setState({
          //   errorEmail: "Invalid email",
          // });
          // valid = false;
        } else {
          errors.errorEmail = "";
          // this.setState({
          //   errorEmail: "",
          // });
        }

        break;
      case "contactNumber":
        if (value.trim() === "") {
          errors.errorContactNumber = "Contact number is required";
          // this.setState({
          //   errorContactNumber: "Contact number is required",
          // });
          // valid = false;
        } else {
          errors.errorContactNumber = "";
          // this.setState({
          //   errorContactNumber: "",
          // });
        }
    }
    // return valid;
  };

  submitHandler = (e) => {
    e.preventDefault();
    let errors = { ...this.state.errors };
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
      const postData = this.state.values;
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        const headers = {
          Authorization: "Bearer " + user.token,
        };
        axios
          .post(ADD_VENDOR, postData, { headers: headers })
          .then((response) => {
            this.setState({ loading: false });
            toast.success("Vendor created successfully.");
            this.props.history.push({
              pathname: "/vendors",
            });
          });
      }
    }
    this.setState({
      errors: errors,
    });
  };

  // submitHandler = (e) => {
  //   e.preventDefault();
  //   const isValid = this.validator();
  //   // console.log(errorVendorName);
  //   if (isValid) {
  //     this.props.history.push({
  //       pathname: "/vendor/confirmation",
  //       confirmation: {
  //         message: this.state.values.vendorName + " Created Successfully",
  //         redirect: "/vendors",
  //         button: "Go to Vendors",
  //       },
  //     });
  //   }
  // };
  render() {
    return (
      <>
        <Header />
        <Row className={"mt-3 justify-content-center"}>
          <Col sm={8}>
            <Card>
              <Card.Body className={"text-left"}>
                <Card.Title className={"text-left"}>Add New Vendor</Card.Title>
                <Row className={"mt-5"}>
                  <Col sm={12}>
                    <Form onSubmit={this.submitHandler}>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={6}>
                            <Form.Label>Vendor Name</Form.Label>
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
                            <Form.Label>Contact Person Name</Form.Label>
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
                            <Form.Label>Address</Form.Label>
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
                            <Form.Label>Email</Form.Label>
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
                                {this.state.errorEmail}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                          <Col sm={6}>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                              type="number"
                              name="contactNumber"
                              value={this.state.values.contactNumber}
                              onChange={this.setContactNumber}
                              className={
                                this.state.errors.errorContactNumber.length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errors.errorContactNumber.length >
                              0 && (
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
                              Submit
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
      </>
    );
  }
}
