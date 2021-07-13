import React, {Component} from "react";
import {Button, Card, Col, Form, FormControl, Row} from "react-bootstrap";
import Header from "../headers/Header";

const rawMaterials = [
    {
        rawMaterialName: "Chocolate Syrup",
        vendorName: "Honeyville Inc.",
        unitMeasurement: 3,
        unitCost: 39
    }
]

class UpdateRawMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawMaterials: rawMaterials,
            rawMaterialName: "Chocolate Syrup",
            vendorName: "Honeyville Inc.",
            unitMeasurement: 3,
            unitCost: 39,

            errors: {
                rawMaterialName: "",
                vendorName: "",
                unitCost: "",
                unitMeasurement: "",
            },
        };
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

    onRawMaterialNameChange = (value) => {
        let state = {...this.state};
        state.rawMaterialName = value;
        this.validator("rawMaterialName", value, state.errors);
        this.setState(state);
    };

    onVendorNameChange = (value) => {
        let state = {...this.state};
        state.vendorName = value;
        this.validator("vendorName", state.vendorName, state.errors);
        this.setState(state);
    };

    onUnitCostChange = (value) => {
        let state = {...this.state};
        state.unitCost = value;
        this.validator("unitCost", state.unitCost, state.errors);
        this.setState(state);
    };

    onUnitMeasurementChange = (value) => {
        let state = {...this.state};
        state.unitMeasurement = value;
        this.validator("unitMeasurement", state.unitMeasurement, state.errors);
        this.setState(state);
    };

    cancelHandler = (e) => {
        this.props.history.push("/raw-materials");
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {...this.state.errors};
        this.validator("rawMaterialName", this.state.rawMaterialName, errors);
        this.validator("vendorName", this.state.vendorName, errors);
        this.validator("unitCost", this.state.unitCost, errors);
        this.validator("unitMeasurement", this.state.unitMeasurement, errors);

        let isValid = true;
        Object.values(errors).forEach(error => {
            if (error.length > 0) {
                isValid = false;
            }
        });

        if (isValid) {
            this.props.history.push({
                pathname: "/raw-material/confirmation",
                confirmation: {
                    message: this.state.rawMaterialName + " Updated Successfully",
                    redirect: "/raw-materials",
                    button: "Go to Raw Materials",
                },
            });
        }

        this.setState({
            errors: errors,
        });
    };

    render() {
        return (
            <section>
                <Header/>
                <Row className={"mt-3 justify-content-center"}>
                    <Col sm={8}>
                        <Card>
                            <Card.Body className={"text-left"}>
                                <Card.Title className={"text-left"}>Edit Raw Material</Card.Title>
                                <Row className={"mt-5"}>
                                    <Col sm={12}>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Row>
                                                    <Col sm={6}>
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control type="text" value = {this.state.rawMaterialName} name= "rawMaterialName" onChange={(e) => {
                                                            this.onRawMaterialNameChange(e.target.value);
                                                        }}
                                                                      className={this.state.errors.rawMaterialName ? "is-invalid" : ""}/>
                                                        {this.state.errors.rawMaterialName.length > 0 && (
                                                            <Form.Control.Feedback type={"invalid"}>
                                                                {this.state.errors.rawMaterialName}
                                                            </Form.Control.Feedback>
                                                        )}

                                                    </Col>
                                                    <Col sm={6}>
                                                        <Form.Label>Vendor Name</Form.Label>
                                                        <Form.Control type="text" value = {this.state.vendorName} name="vendorName" onChange={(e) => {
                                                            this.onVendorNameChange(e.target.value);
                                                        }}
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
                                                        <Form.Label>Unit Cost</Form.Label>
                                                        <Form.Control type="number" value = {this.state.unitCost} name="unitCost" onChange={(e) => {
                                                            this.onUnitCostChange(e.target.value);
                                                        }}
                                                                      className={this.state.errors.unitCost ? "is-invalid" : ""}/>
                                                        {this.state.errors.unitCost.length > 0 && (
                                                            <Form.Control.Feedback type={"invalid"}>
                                                                {this.state.errors.unitCost}
                                                            </Form.Control.Feedback>
                                                        )}

                                                    </Col>
                                                    <Col sm={3}>
                                                        <Form.Label>Unit Measurement</Form.Label>
                                                        <Form.Control type="number" value = {this.state.unitMeasurement} name="unitMeasurement" onChange={(e) => {
                                                            this.onUnitMeasurementChange(e.target.value);
                                                        }}
                                                                      className={this.state.errors.unitMeasurement ? "is-invalid" : ""}/>
                                                        {this.state.errors.unitMeasurement.length > 0 && (
                                                            <Form.Control.Feedback type={"invalid"}>
                                                                {this.state.errors.unitMeasurement}
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
                                                        <Button className={"submit-btn"} variant="primary"
                                                                type="submit">
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
        )
    }
}

export default UpdateRawMaterial