/**
 * Author: Kartik Gevariya
 */
import "./register.css"
import PlainHeaderComponent from "../PlainHeaderComponent";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
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
        <Container fluid={"sm"}>
          <Row className={"justify-content-center mt-3"}>
            <Col sm={10}>
              <Card>
                <Row className={"login-row"}>
                  <Col sm={6} className={"justify-content-center login-image-col"}>
                    <Image src={"/register.png"} alt={"Login Image"} className={"login-image"}/>
                  </Col>
                  <Col sm={6} className={"p-4"}>
                    <Row className={"text-left"}>
                      <Col sm={12}>
                        <h2>Register</h2>
                      </Col>
                    </Row>
                    <Form>
                      <Row className={"text-left mt-4"}>
                        <Col sm={6}>
                          <Form.Group controlId="formFirstName">
                            <Form.Label><strong>First Name</strong></Form.Label>
                            <Form.Control type="text" placeholder="Enter First name" />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group controlId="formLastName">
                            <Form.Label><strong>Last Name</strong></Form.Label>
                            <Form.Control type="text" placeholder="Enter Last name" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col sm={12}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label><strong>Email</strong></Form.Label>
                            <Form.Control type="email" placeholder="Enter Email"/>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col sm={6}>
                          <Form.Group controlId="formBasicPassword">
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Label><strong>Confirm Password</strong></Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password"/>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className={"text-left mt-3"}>
                        <Col sm={8}>
                          <Link to={"/login"}>
                            <Button variant={"primary"}>Register</Button>
                          </Link>
                        </Col>
                      </Row>
                      <Row className={"text-left mt-2"}>
                        <Col sm={12}>
                          <span>Already have an account?</span>
                          <Link to={"/login"} className={"ml-2"}>
                            <span>Login</span>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Register
