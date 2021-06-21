import "./register.css"
import PlainHeaderComponent from "../PlainHeaderComponent";
import {Button, Card, Col, Form, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

class Register extends PlainHeaderComponent {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {}
        }
    }

    render() {
        return (
            <section>
                {super.render()}
                <Row className={"justify-content-center mt-5"}>
                    <Col sm={8}>
                        <Card>
                            <Row className={"login-row"}>
                                <Col sm={6} className={"justify-content-center login-image-col"}>
                                    <Image src={"/register.png"} alt={"Login Image"} className={"login-image"}/>
                                </Col>
                                <Col sm={6} className={"p-5"}>
                                    <Row className={"text-left"}>
                                        <Col sm={12}>
                                            <h2>Register</h2>
                                        </Col>
                                    </Row>
                                    <Row className={"text-left mt-5"}>
                                        <Col sm={6}>
                                            <Form.Label><strong>First Name</strong></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Label><strong>Last Name</strong></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                            />
                                        </Col>
                                    </Row>
                                    <Row className={"text-left mt-4"}>
                                        <Col sm={12}>
                                            <Form.Label><strong>Email</strong></Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                            />
                                        </Col>
                                    </Row>
                                    <Row className={"text-left mt-4"}>
                                        <Col sm={6}>
                                            <Form.Label><strong>Password</strong></Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Label><strong>Confirm Password</strong></Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                            />
                                        </Col>
                                    </Row>
                                    <Row className={"text-left mt-5"}>
                                        <Col sm={8}>
                                            <Link to={"/login"}>
                                                <Button variant={"primary"}>Register</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                    <Row className={"text-left mt-2"}>
                                        <Col sm={8}>
                                            <span>Already have an account?</span>
                                            <Link to={"/login"} className={"ml-2"}>
                                                <span>Login</span>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </section>
        )
    }
}
export default Register
