import "./login.css"
import PlainHeaderComponent from "../PlainHeaderComponent";
import {Button, Card, Col, Form, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

class Login extends PlainHeaderComponent {

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
                  <Image src={"/login.png"} alt={"Login Image"} className={"login-image"}/>
                </Col>
                <Col sm={6} className={"p-5"}>
                  <Row className={"text-left"}>
                    <Col sm={12}>
                      <h2>Login</h2>
                    </Col>
                  </Row>
                  <Row className={"text-left mt-5"}>
                    <Col sm={8}>
                      <Form.Label><strong>Email</strong></Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                      />
                    </Col>
                  </Row>
                  <Row className={"text-left mt-5"}>
                    <Col sm={8}>
                      <Form.Label><strong>Password</strong></Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                      />
                    </Col>
                  </Row>
                  <Row className={"text-left mt-5"}>
                    <Col sm={8}>
                      <Link to={"/home"}>
                        <Button variant={"primary"}>Login</Button>
                      </Link>
                    </Col>
                  </Row>
                  <Row className={"text-left mt-2"}>
                    <Col sm={8}>
                      <span>Don't have an account?</span>
                      <Link to={"/register"} className={"ml-2"}>
                        <span>Register Here</span>
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

export default Login
