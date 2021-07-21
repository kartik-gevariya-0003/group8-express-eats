import React, { useState } from "react";
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
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Header from "../headers/Header";
import ApplicationContainer from "../ApplicationContainer";
import axios from "axios";
import { DELETE_VENDOR, GET_VENDORS } from "../../config";

export default class Vendor extends ApplicationContainer {
  constructor(props) {
    super(props);

    this.state = {
      vendorList: [],
      deleteModal: {
        show: false,
        id: -1,
        vendorName: "",
      },
    };
  }

  // const [vendors, setVendor] = useState(vendorDetails);
  // const [deleteModal, setDeleteModal] = useState({
  //   show: false,
  //   vendorName: "",
  // });

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
    axios.get(GET_VENDORS, { headers: headers }).then((result) => {
      let vendors = result.data["vendors"];
      this.setState({ vendorList: vendors });
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

    this.setState({
      vendorList: this.state.vendorList.filter((vendor) =>
        vendor.vendorName.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  // deleteVendor = (deleteVendor) => {
  //   vendorDetails = vendorDetails.filter(
  //     (vendor) =>
  //       vendor.vendorName.toLowerCase() !==
  //       deleteVendor.vendorName.toLowerCase()
  //   );
  //   // setVendor(
  //   //   vendors.filter(
  //   //     (vendor) =>
  //   //       vendor.vendorName.toLowerCase() !==
  //   //       deleteVendor.vendorName.toLowerCase()
  //   //   )
  //   // );
  //   this.setState({
  //     vendors: this.state.vendors.filter(
  //       (vendor) =>
  //         vendor.vendorName.toLowerCase() !==
  //         deleteVendor.vendorName.toLowerCase()
  //     ),
  //   });
  //   this.closeModal();
  // };

  deleteVendor(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const headers = {
        Authorization: "Bearer " + user.token,
      };
      axios.delete(DELETE_VENDOR + id, { headers: headers }).then((result) => {
        this.getVendors();
        this.closeModal();
      });
    }
  }

  deleteVendorConfirmation = (deleteVendor) => {
    let state = { ...this.state.deleteModal };
    state.vendorName = deleteVendor.vendorName;

    // console.log(state);
    // setDeleteModal((prevState) => {
    //   return {
    //     ...prevState,
    //     vendorName: deleteVendor.vendorName,
    //   };
    // });

    this.setState(
      {
        deleteModal: {
          vendorName: state.vendorName,
        },
      },
      () => {
        this.showModal();
      }
    );
  };
  // console.log(this.state.deleteModal);

  // showModal = () => {
  //   // setDeleteModal((prevState) => {
  //   //   return {
  //   //     ...prevState,
  //   //     show: true,
  //   //   };
  //   // });

  //   console.log(this.state.deleteModal.vendorName);
  //   this.setState({
  //     deleteModal: {
  //       show: true,
  //     },
  //   });
  // };

  showModal = (vendor) => {
    let state = { ...this.state };
    state.deleteModal.show = true;
    state.deleteModal.id = vendor.id;
    state.deleteModal.name = vendor.name;
    this.setState(state);
  };

  // closeModal = () => {
  //   // setDeleteModal((prevState) => {
  //   //   return {
  //   //     ...prevState,
  //   //     show: false,
  //   //   };
  //   // });

  //   this.setState({
  //     deleteModal: {
  //       show: false,
  //     },
  //   });
  // };

  closeModal = () => {
    let state = { ...this.state };
    state.deleteModal.show = false;
    state.deleteModal.id = -1;
    state.deleteModal.name = "";
    this.setState(state);
  };

  render() {
    return (
      <>
        <section>
          <Header />
          <Row className="m-3">
            <Col className={"text-left"}>
              <h2>Vendors</h2>
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
                    {this.state.vendors.length !== 0 ? (
                      <section>
                        {this.state.vendors.map((vendor) => (
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
                    <strong>
                      Are you sure you want to delete{" "}
                      {this.state.deleteModal.vendorName}?{" "}
                    </strong>
                  </Form.Label>
                  <Form.Label className={"m-0"}>
                    All related raw materials will be deleted too.
                  </Form.Label>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="success"
                  onClick={() => this.deleteVendor(this.state.deleteModal)}
                >
                  Yes
                </Button>
                <Button variant="secondary" onClick={this.closeModal}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
          </Row>
        </section>
      </>
    );
  }
}
