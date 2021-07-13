import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./create-vendor.css";

import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import Header from "../headers/Header";
import ApplicationContainer from "../ApplicationContainer";

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
      errorVendorName: "",
      errorAddress: "",
      errorContactPersonName: "",
      errorEmail: "",
      errorContactNumber: "",
    };
  }

  cancelHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/vendors");
  };

  onChangeHandler = (e) => {
    // setValues((prev) => {
    //   return {
    //     ...values,
    //     [e.target.name]: e.target.value,
    //   };
    // });

    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  validator = () => {
    let valid = true;

    if (this.state.values.vendorName.trim() === "") {
      // setErrorVendorName("Vendor name is required");
      this.setState({
        errorVendorName: "Vendor name is required",
      });
      valid = false;
    } else if (
      !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(
        this.state.values.vendorName.trim()
      )
    ) {
      // setErrorVendorName("Only letters and numbers are allowed");
      this.setState({
        errorVendorName: "Only letters and numbers are allowed",
      });
      valid = false;
    } else {
      this.setState({
        errorVendorName: "",
      });
    }

    if (this.state.values.address.trim() === "") {
      // setErrorAddress("Address is required");
      this.setState({
        errorAddress: "Address is required",
      });
      valid = false;
    } else {
      // setErrorAddress("");
      this.setState({
        errorAddress: "",
      });
    }

    if (this.state.values.contactPersonName.trim() === "") {
      // setErrorContactPersonName("Contact person name is required");
      this.setState({
        errorContactPersonName: "Contact person name is required",
      });
      valid = false;
    } else if (
      !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(
        this.state.values.contactPersonName.trim()
      )
    ) {
      // setErrorContactPersonName("Only letters and numbers are allowed");
      this.setState({
        errorContactPersonName: "Only letters and numbers are allowed",
      });
      valid = false;
    } else {
      // setErrorContactPersonName("");
      this.setState({
        errorContactPersonName: "",
      });
    }

    if (this.state.values.email.trim() === "") {
      // setErrorEmail("Email is required");
      this.setState({
        errorEmail: "Email is required",
      });
      valid = false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        this.state.values.email.trim()
      )
    ) {
      // setErrorEmail("Invalid email");
      this.setState({
        errorEmail: "Invalid email",
      });
      valid = false;
    } else {
      // setErrorEmail("");
      this.setState({
        errorEmail: "",
      });
    }

    if (this.state.values.contactNumber.trim() === "") {
      // setErrorContactNumber("Contact number is required");
      this.setState({
        errorContactNumber: "Contact number is required",
      });
      valid = false;
    } else {
      // setErrorContactNumber("");
      this.setState({
        errorContactNumber: "",
      });
    }
    return valid;
  };

  submitHandler = (e) => {
    e.preventDefault();
    const isValid = this.validator();
    // console.log(errorVendorName);
    if (isValid) {
      this.props.history.push({
        pathname: "/vendor/confirmation",
        confirmation: {
          message: this.state.values.vendorName + " Created Successfully",
          redirect: "/vendors",
          button: "Go to Vendors",
        },
      });
    }
  };
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
                              onChange={this.onChangeHandler}
                              className={
                                this.state.errorVendorName.length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errorVendorName.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errorVendorName}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                          <Col sm={6}>
                            <Form.Label>Contact Person Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="contactPersonName"
                              value={this.state.values.contactPersonName}
                              onChange={this.onChangeHandler}
                              className={
                                this.state.errorContactPersonName.length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errorContactPersonName.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errorContactPersonName}
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
                              onChange={this.onChangeHandler}
                              className={
                                this.state.errorAddress.length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errorAddress.length > 0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errorAddress}
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
                              onChange={this.onChangeHandler}
                              className={
                                this.state.errorEmail.length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />

                            {this.state.errorEmail.length > 0 && (
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
                              onChange={this.onChangeHandler}
                              className={
                                this.state.errorContactNumber.length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errorContactNumber.length > 0 && (
                              <FormControl.Feedback type={"invalid"}>
                                {this.state.errorContactNumber}
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
