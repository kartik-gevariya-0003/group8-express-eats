// Author: Rotesh Chhabra
/*
 * Functionality to display the profile for logged in user
 * */

import {Button, Card, Col, Form, FormControl,  Modal, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import axios from "axios";
import {GET_USER, DELETE_USER} from "../../config";
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
          <Col sm={8}>
            <Card>
              <Card.Body className={"text-left"}>
                <Row className={"mt-3"}>
                  <Col sm={12}>
                    <Form>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={6}>
                            <Form.Label>First Name- <sup className={"text-danger"}></sup></Form.Label>
                            <Form.Label>  {this.state.values.firstName}</Form.Label>
                          </Col>
                          <Col sm={6}>
                            <Form.Label>Last Name-  <sup className={"text-danger"}></sup></Form.Label>
                            <Form.Label>  {this.state.values.lastName}</Form.Label>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={12}>
                            <Form.Label>Email- <sup className={"text-danger"}></sup></Form.Label>
                            <Form.Label> {this.state.values.email}</Form.Label>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className={"mt-5 mb-3"}>
                        <Row>
                          <Col sm={6} className={"text-right"}>
                            <Button
                              className={"submit-btn"}
                              variant="danger"
                              onClick={this.showModal}
                            >
                              Delete user
                            </Button>
                          </Col>
                          <Col sm={6} className={"submit-btn"}>
                            <Button
                              variant="primary"
                              onClick={this.backHandler}
                            >
                              Back
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
                  Are you sure you want to delete user - {" "}
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
