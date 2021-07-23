/**
 * Author: Rotesh Chhabra
 
 * Functionality to Display all vendor details in the system and allow to add, edit and delete
 */

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Header from "../headers/Header";
import ApplicationContainer from "../ApplicationContainer";
import axios from "axios";
import { DELETE_VENDOR, GET_VENDORS } from "../../config";
import React from "react";

export default class Vendor extends ApplicationContainer {
  constructor(props) {
    super(props);

    this.originalVendors = [];
    this.state = {
      loading: false,
      vendorList: [],
      deleteModal: {
        show: false,
        id: -1,
        vendorName: "",
      },
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const headers = {
        Authorization: "Bearer " + user.token,
      };
      this.getVendors(headers);
    }
  }

  getVendors = (headers) => {
    this.setState({loading: true});
    axios.get(GET_VENDORS, { headers: headers }).then((result) => {
      let vendors = result.data["vendors"];
      this.originalVendors = vendors;
      this.setState({ vendorList: vendors, loading: false });
    }).catch(() => {
      toast.error("Error fetching vendors.");
      this.setState({loading: false});
    });
  };

  createVendor = () => {
    this.props.history.push("/vendors/create");
  };

  editVendor = (vendor) => {
    this.props.history.push({ pathname: "/vendor/edit", state: vendor.id });
  };

  filterVendors = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value) {
      this.setState({
        vendorList: this.originalVendors.filter((vendor) =>
          vendor.vendorName.toLowerCase().includes(value.toLowerCase())
        ),
      });
    } else {
      this.setState({vendorList: this.originalVendors});
    }

  };

  deleteVendor = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const headers = {
        Authorization: "Bearer " + user.token,
      };
      this.setState({loading: true});
      await axios
        .delete(DELETE_VENDOR + this.state.deleteModal.id, { headers: headers })
        .then(() => {
          toast.success("Vendor deleted successfully.");
          this.getVendors(headers);
          this.closeModal();
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

  showModal = (vendor) => {
    let state = { ...this.state };
    state.deleteModal.show = true;
    state.deleteModal.id = vendor.id;
    state.deleteModal.vendorName = vendor.vendorName;
    this.setState(state);
  };

  closeModal = () => {
    let state = { ...this.state };
    state.deleteModal.show = false;
    state.deleteModal.id = -1;
    state.deleteModal.name = "";
    this.setState(state);
  };

  render() {
    return (
      <section className={"pb-5"}>
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
            <h2>Vendors</h2>
            <hr/>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={8} className={"text-left"}>
            <Button variant={"primary"} onClick={this.createVendor}>
              Add New Vendor
            </Button>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <InputGroup>
                <FormControl
                  placeholder="Search"
                  onChange={this.filterVendors}
                  aria-label="Search"
                  aria-describedby="search-control"
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={12}>
            <Card>
              <Card.Body>
                <ListGroup className={"mt-3"}>
                  <ListGroup.Item>
                    <Row>
                      <Col sm={2} className={"pl-3 text-left"}>
                        <h5>
                            <span>
                              <strong>Vendor Name</strong>
                            </span>
                        </h5>
                      </Col>
                      <Col sm={2} className={"pl-3 text-left"}>
                        <h5>
                            <span>
                              <strong>Contact Person</strong>
                            </span>
                        </h5>
                      </Col>
                      <Col sm={2} className={"pl-3 text-left"}>
                        <h5>
                            <span>
                              <strong>Address</strong>
                            </span>
                        </h5>
                      </Col>
                      <Col sm={2} className={"pl-3 text-left"}>
                        <h5>
                            <span>
                              <strong>Email</strong>
                            </span>
                        </h5>
                      </Col>
                      <Col sm={2} className={"pl-3 text-left"}>
                        <h5>
                            <span>
                              <strong>Contact Number</strong>
                            </span>
                        </h5>
                      </Col>
                      <Col sm={2} className={"pl-3 text-left"}>
                        <h5>
                            <span>
                              <strong>Action</strong>
                            </span>
                        </h5>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {this.state.vendorList.length !== 0 ? (
                    <section>
                      {this.state.vendorList.map((vendor) => (
                        <ListGroup.Item key={vendor.vendorName}>
                          <Row>
                            <Col sm={2} className={"pl-3 text-left"}>
                              <h6>
                                <span>{vendor.vendorName}</span>
                              </h6>
                            </Col>
                            <Col sm={2} className={"pl-3 text-left"}>
                              <h6>
                                <span>{vendor.contactPersonName}</span>
                              </h6>
                            </Col>
                            <Col sm={2} className={"pl-3 text-left"}>
                              <h6>
                                <span>{vendor.address}</span>
                              </h6>
                            </Col>
                            <Col sm={2} className={"pl-3 text-left"}>
                              <h6>
                                <span>{vendor.email}</span>
                              </h6>
                            </Col>
                            <Col sm={2} className={"pl-3 text-left"}>
                              <h6>
                                <span>{vendor.contactNumber}</span>
                              </h6>
                            </Col>
                            <Col sm={2} className={"pl-3 text-left"}>
                              <FontAwesomeIcon
                                icon={faPen}
                                color={"#035384AA"}
                                className={"mr-5"}
                                onClick={() => this.editVendor(vendor)}
                              />
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                color={"#BC3347CC"}
                                onClick={() => this.showModal(vendor)}
                              />
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </section>
                  ) : (
                    <ListGroup.Item>No vendor available.</ListGroup.Item>
                  )}
                </ListGroup>
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
                  Are you sure you want to delete{" "}
                  <strong>{this.state.deleteModal.vendorName}</strong>?
                </Form.Label>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => this.deleteVendor(this.state.deleteModal)}
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
