import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./create-vendor.css";

import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import Header from "../headers/Header";

function CreateVendor() {
  let history = useHistory();

  const [values, setValues] = useState({
    vendorName: "",
    address: "",
    contactPersonName: "",
    email: "",
    contactNumber: "",
  });

  const [errorVendorName, setErrorVendorName] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorContactPersonName, setErrorContactPersonName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorContactNumber, setErrorContactNumber] = useState("");

  const cancelHandler = (e) => {
    e.preventDefault();
    history.push("/vendors");
  };

  const onChangeHandler = (e) => {
    setValues((prev) => {
      return {
        ...values,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validator = () => {
    let valid = true;

    if (values.vendorName.trim() === "") {
      setErrorVendorName("Vendor name is required");
      valid = false;
    } else if (
      !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(
        values.vendorName.trim()
      )
    ) {
      setErrorVendorName("Only letters and numbers are allowed");
      valid = false;
    } else {
      setErrorVendorName("");
    }

    if (values.address.trim() === "") {
      setErrorAddress("Address is required");
      valid = false;
    } else {
      setErrorAddress("");
    }

    if (values.contactPersonName.trim() === "") {
      setErrorContactPersonName("Contact person name is required");
      valid = false;
    } else if (
      !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(
        values.contactPersonName.trim()
      )
    ) {
      setErrorContactPersonName("Only letters and numbers are allowed");
      valid = false;
    } else {
      setErrorContactPersonName("");
    }

    if (values.email.trim() === "") {
      setErrorEmail("Email is required");
      valid = false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        values.email.trim()
      )
    ) {
      setErrorEmail("Invalid email");
      valid = false;
    } else {
      setErrorEmail("");
    }

    if (values.contactNumber.trim() === "") {
      setErrorContactNumber("Contact number is required");
      valid = false;
    } else {
      setErrorContactNumber("");
    }
    return valid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = validator();
    console.log(errorVendorName);
    if (isValid) {
      history.push({
        pathname: "/vendor/confirmation",
        confirmation: {
          message: values.vendorName + " Created Successfully",
          redirect: "/vendors",
          button: "Go to Vendors",
        },
      });
    }
  };

  return (
    <>
      <Header/>
      <Row className={"mt-3 justify-content-center"}>
        <Col sm={8}>
          <Card>
            <Card.Body className={"text-left"}>
              <Card.Title className={"text-left"}>Add New Vendor</Card.Title>
              <Row className={"mt-5"}>
                <Col sm={12}>
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={6}>
                          <Form.Label>Vendor Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="vendorName"
                            value={values.vendorName}
                            onChange={onChangeHandler}
                            className={
                              errorVendorName.length > 0 ? "is-invalid" : ""
                            }
                          />
                          {errorVendorName.length > 0 && (
                            <Form.Control.Feedback type={"invalid"}>
                              {errorVendorName}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                        <Col sm={6}>
                          <Form.Label>Contact Person Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="contactPersonName"
                            value={values.contactPersonName}
                            onChange={onChangeHandler}
                            className={
                              errorContactPersonName.length > 0
                                ? "is-invalid"
                                : ""
                            }
                          />
                          {errorContactPersonName.length > 0 && (
                            <Form.Control.Feedback type={"invalid"}>
                              {errorContactPersonName}
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
                            value={values.address}
                            onChange={onChangeHandler}
                            className={
                              errorAddress.length > 0 ? "is-invalid" : ""
                            }
                          />
                          {errorAddress.length > 0 && (
                            <Form.Control.Feedback type={"invalid"}>
                              {errorAddress}
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
                            value={values.email}
                            onChange={onChangeHandler}
                            className={
                              errorEmail.length > 0 ? "is-invalid" : ""
                            }
                          />

                          {errorEmail.length > 0 && (
                            <Form.Control.Feedback type={"invalid"}>
                              {errorEmail}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                        <Col sm={6}>
                          <Form.Label>Contact Number</Form.Label>
                          <Form.Control
                            type="number"
                            name="contactNumber"
                            value={values.contactNumber}
                            onChange={onChangeHandler}
                            className={
                              errorContactNumber.length > 0 ? "is-invalid" : ""
                            }
                          />
                          {errorContactNumber.length > 0 && (
                            <FormControl.Feedback type={"invalid"}>
                              {errorContactNumber}
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
                          <Button variant="danger" onClick={cancelHandler}>
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

export default CreateVendor;
