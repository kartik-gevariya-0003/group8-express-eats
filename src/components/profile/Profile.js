// Author: Rotesh Chhabra
/*
 * Functionality to display, delete and edit the profile for logged in user
 * */

import {Button, Card, Col, Form, FormControl,  Modal, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import axios from "axios";
import {GET_USER, DELETE_USER, UPDATE_USER} from "../../config";
import ApplicationContainer from "../ApplicationContainer";
import React from "react";

export default class Profile extends ApplicationContainer {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      values: {
        id: this.props.location.state,
        firstName: "",
        lastName: "",
        email: "",
      },
      deleteModal: {
        show: false,
        id: -1,
        email: "",
      },
      errors: {
        errorFirstName: "",
        errorLastName: "",
        errorEmail: "",
      }
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const headers = {
        Authorization: "Bearer " + user.token,
      };
      this.getUser(headers);
    }
  }

  backHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/dashboard");
  };

  deleteUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const headers = {
        Authorization: "Bearer " + user.token,
      };
      this.setState({loading: true});
      await axios
        .delete(DELETE_USER , { headers: headers })
        .then(() => {
          this.closeModal();
          localStorage.removeItem('user');
        toast.success('User deleted successfully.');
        this.props.history.push({
        pathname: '/'
    });
        })
        .catch((error) => {
          this.setState({ loading: false });
          this.closeModal();
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
  };

  setFirstName = (e) => {
    let state = {...this.state};
    state.values.firstName = e.target.value;
    this.validator("firstName", state.values.firstName, state.errors);
    this.setState(state);
  };

  setLastName = (e) => {
    let state = {...this.state};
    state.values.lastName = e.target.value;
    this.validator("lastName", state.values.lastName, state.errors);
    this.setState(state);
  };

  setEmail= (e) => {
    let state = {...this.state};
    state.values.email = e.target.value;
    this.validator("email", state.values.email, state.errors);
    this.setState(state);
  };


  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {...this.state.errors};
    this.validator("firstName", this.state.values.firstName, errors);
    this.validator("lastName", this.state.values.lastName, errors);
    this.validator("email", this.state.values.email, errors);

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
          .put(UPDATE_USER, putData, {headers: headers})
          .then(() => {
            this.setState({loading: false});
            toast.success("User updated successfully.");
            this.props.history.push({
              pathname: "/dashboard",
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



  validator = (name, value, errors) => {
    switch (name) {
      case "firstName":
        if (value.trim() === "") {
          errors.errorFirstName = "First name is required";
        } else if (
          !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(value.trim())
        ) {
          errors.errorFirstName = "Only letters and numbers are allowed";
        } else {
          errors.errorFirstName = "";
        }
        break;
      case "lastName":
        if (value.trim() === "") {
            errors.errorLastName = "Last name is required";
          } else if (
            !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(value.trim())
          ) {
            errors.errorLastName = "Only letters and numbers are allowed";
          } else {
            errors.errorLastName = "";
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
    }
  };


  showModal = () => {
    let state = { ...this.state };
    state.deleteModal.show = true;
    state.deleteModal.id = state.values.id;
    state.deleteModal.email = state.values.email;
    this.setState(state);
  };

  closeModal = () => {
    let state = { ...this.state };
    state.deleteModal.show = false;
    state.deleteModal.id = -1;
    state.deleteModal.name = "";
    this.setState(state);
  };

  getUser(headers) {
    this.setState({loading: true});
    const url = GET_USER;
    axios
      .get(url, {headers: headers})
      .then((result) => {
        this.setState({loading: false});
        let user = result.data.user;
        let userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: this.props.location.state,
        };
        this.setState({
          values: userData,
        });
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log(error);
        toast.error("Error occurred while fetching user.");
      });
  }

 
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
            <h2>Profile</h2>
            <hr/>
          </Col>
        </Row>
        <Row className={"m-3 justify-content-center"}>
          <Col sm={6}>
            <Card>
              <Card.Body className={"text-left"}>
                <Row className={"mt-3"}>
                  <Col sm={12}>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={12}>
                            <Form.Label>First Name<sup className={"text-danger"}>*</sup></Form.Label>
                          </Col>
                          <Col sm={12}>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={this.state.values.firstName}
                              onChange={this.setFirstName}
                              placeholder={"Enter First Name"}
                              className={
                                this.state.errors.errorFirstName
                                  .length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errors.errorFirstName.length >
                            0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.errorFirstName}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                          </Row>
                      </Form.Group>
                          <Form.Group className="mb-3">
                        <Row>
                          <Col sm={12}>
                            <Form.Label>Last Name <sup className={"text-danger"}>*</sup></Form.Label>
                            </Col>
                          <Col sm={12}>
                            <Form.Control
                              type="text"
                              name="lastName"
                              placeholder={"Enter Last Name"}
                              value={this.state.values.lastName}
                              onChange={this.setLastName}
                              className={
                                this.state.errors.errorLastName
                                  .length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errors.errorLastName.length >
                            0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.errorLastName}
                              </Form.Control.Feedback>
                            )}
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={12}>
                            <Form.Label>Email <sup className={"text-danger"}>*</sup></Form.Label>
                            </Col>
                          <Col sm={12}>
                            <Form.Control
                              type="text"
                              name="email"
                              value={this.state.values.email}
                              placeholder={"Enter Email"}
                              onChange={this.setEmail}
                              className={
                                this.state.errors.errorEmail
                                  .length > 0
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {this.state.errors.errorEmail.length >
                            0 && (
                              <Form.Control.Feedback type={"invalid"}>
                                {this.state.errors.errorEmail}
                              </Form.Control.Feedback>
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
                              Save
                            </Button>
                          </Col>
                          <Col sm={6} >
                            <Button
                              className={"submit-btn"}
                              variant="danger"
                              onClick={this.showModal}
                            >
                              Delete user
                            </Button>
                          </Col>
                          {/* <Col sm={4} className={"submit-btn"}>
                            <Button
                              variant="primary"
                              onClick={this.backHandler}
                            >
                              Back
                            </Button>
                          </Col> */}
                        </Row>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Modal
            show={this.state.deleteModal.show}
            animation={false}
            onHide={this.closeModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className={"m-0"}>
                  Are you sure you want to delete user {" "}
                  <strong>{this.state.deleteModal.email}</strong>?
                </Form.Label>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => this.deleteUser(this.state.deleteModal)}
              >
                Yes
              </Button>
              <Button variant="danger" onClick={this.closeModal}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </section>
    );
  }
}
