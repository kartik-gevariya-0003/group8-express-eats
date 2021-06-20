import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./create-vendor.css";

import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";

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
      <Row className={"mt-3 justify-content-center"}>
        <Col sm={8}>
          <Card>
            <Card.Body className={"text-left"}>
              <Card.Title className={"text-left"}>
                <strong>Add New Vendor</strong>
              </Card.Title>
              <Row className={"mt-5"}>
                <Col sm={12}>
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Row>
                        <Col sm={3}>
                          <Form.Label>Vendor Name</Form.Label>
                        </Col>
                        <Col sm={5}>
                          <Form.Control
                            type="text"
                            name="vendorName"
                            value={values.vendorName}
                            onChange={onChangeHandler}
                            className={
                              errorVendorName.length > 0 ? "is-invalid" : ""
                            }
                          />
                        </Col>
                        <Col sm={4}>
                          {errorVendorName.length > 0 && (
                            <p className={"error-message"}>{errorVendorName}</p>
                          )}
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={3}>
                          <Form.Label>Address</Form.Label>
                        </Col>
                        <Col sm={5}>
                          <Form.Control
                            type="text"
                            name="address"
                            value={values.address}
                            onChange={onChangeHandler}
                            className={
                              errorAddress.length > 0 ? "is-invalid" : ""
                            }
                          />
                        </Col>
                        <Col sm={4}>
                          {errorAddress.length > 0 && (
                            <p className={"error-message"}>{errorAddress}</p>
                          )}
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={3}>
                          <Form.Label>Contact Person Name</Form.Label>
                        </Col>
                        <Col sm={5}>
                          <Form.Control
                            type="text"
                            name="contactPersonName"
                            value={values.conactPersonName}
                            onChange={onChangeHandler}
                            className={
                              errorContactPersonName.length > 0
                                ? "is-invalid"
                                : ""
                            }
                          />
                        </Col>
                        <Col sm={4}>
                          {errorContactPersonName.length > 0 && (
                            <p className={"error-message"}>
                              {errorContactPersonName}
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={3}>
                          <Form.Label>Email</Form.Label>
                        </Col>
                        <Col sm={5}>
                          <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={onChangeHandler}
                            className={
                              errorEmail.length > 0 ? "is-invalid" : ""
                            }
                          />
                        </Col>
                        <Col sm={4}>
                          {errorEmail.length > 0 && (
                            <p className={"error-message"}>{errorEmail}</p>
                          )}
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={3}>
                          <Form.Label>Contact Number</Form.Label>
                        </Col>
                        <Col sm={5}>
                          <Form.Control
                            type="number"
                            name="contactNumber"
                            value={values.contactNumber}
                            onChange={onChangeHandler}
                            className={
                              errorContactNumber.length > 0 ? "is-invalid" : ""
                            }
                          />
                        </Col>
                        <Col sm={4}>
                          {errorContactNumber.length > 0 && (
                            <p className={"error-message"}>
                              {errorContactNumber}
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row className={"m-5"}>
                        <Col sm={3}>
                          <Button variant="success" type="submit">
                            Submit
                          </Button>
                        </Col>
                        <Col sm={3}>
                          <Button variant="secondary" onClick={cancelHandler}>
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
