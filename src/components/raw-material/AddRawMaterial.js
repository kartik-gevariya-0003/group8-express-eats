import React, {useState} from "react";
import {Button, Card, Col, Form, Row,} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Header from "../headers/Header";

function AddRawMaterial() {
  let history = useHistory();
  const [values, setValues] = useState({
    name: "",
    vendorName: "",
    unitCost: "",
    unitMeasurement: "",
  });
  const [errorName, setErrorName] = useState("");
  const [errorVendorName, setErrorVendorName] = useState("");
  const [errorUnitCost, setErrorUnitCost] = useState("");
  const [errorUnitMeasurement, setErrorUnitMeasurement] = useState("");

  const cancelHandler = (e) => {
    e.preventDefault();
    history.push("/raw-materials");
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
    if (values.name.trim() === "") {
      setErrorName("Raw material name is required");
    } else {
      setErrorName("");
    }

    if (values.vendorName.trim() === "") {
      setErrorVendorName("Vendor name is required");
    } else {
      setErrorVendorName("");
    }

    if (values.unitCost.trim() === "") {
      setErrorUnitCost("Unit cost is required");
    } else {
      setErrorUnitCost("");
    }

    if (values.unitMeasurement.trim() === "") {
      setErrorUnitMeasurement("Unit Measurement is required");
    } else {
      setErrorUnitMeasurement("");
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = validator();
    if (isValid) {
      history.push({
        pathname: "/raw-material/confirmation",
        confirmation: {
          message: values.name + " Created Successfully",
          redirect: "/raw-,materials",
          button: "Go to Raw Materials",
        },
      });
    }
  };
  return (
    <section>
      <Header/>
      <Row className={"mt-3 justify-content-center"}>
        <Col sm={8}>
          <Card>
            <Card.Body className={"text-left"}>
              <Card.Title className={"text-left"}>Add Raw Material</Card.Title>
              <Row className={"mt-5"}>
                <Col sm={12}>
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={6}>
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" name="name" onChange={onChangeHandler}
                                        className={errorName.length > 0 ? "is-invalid" : ""}/>
                          {errorName.length > 0 && (
                            <Form.Control.Feedback type={"invalid"}>
                              {errorName}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                        <Col sm={6}>
                          <Form.Label>Vendor Name</Form.Label>
                          <Form.Control type="text" name="vendorName" onChange={onChangeHandler}
                                        className={errorVendorName.length > 0 ? "is-invalid" : ""}/>
                          {errorVendorName.length > 0 && (
                            <Form.Control.Feedback type={"invalid"}>
                              {errorVendorName}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={6}>
                          <Form.Label>Unit Cost</Form.Label>
                          <Form.Control type="text" name="unitCost" onChange={onChangeHandler}
                                        className={errorUnitCost.length > 0 ? "is-invalid" : ""}/>
                          {errorUnitCost.length > 0 && (
                            <Form.Control.Feedback type={"invalid"}>
                              {errorUnitCost}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                        <Col sm={3}>
                          <Form.Label>Unit Measurement</Form.Label>
                          <Form.Control type="text" name="unitMeasurement"
                                        onChange={onChangeHandler}
                                        className={errorUnitMeasurement.length > 0 ? "is-invalid" : ""}/>
                          {errorUnitMeasurement.length > 0 && (
                            <Form.Control.Feedback type={"invalid"}>
                              {errorUnitMeasurement}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                        <Col sm={3}>
                          <Form.Label>&nbsp;</Form.Label>
                          <Form.Control as="select">
                            <option>gm</option>
                            <option>ml</option>
                            <option>L</option>
                            <option>gal</option>
                            <option>lb</option>
                          </Form.Control>
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
    </section>
  );
}

export default AddRawMaterial