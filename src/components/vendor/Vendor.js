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

let vendorList = [];

export default class Vendor extends ApplicationContainer {
  constructor(props) {
    super(props);

    this.state = {
      vendorList: vendorList,
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
    axios.get(GET_VENDORS, { headers: headers }).then((result) => {
      let vendors = result.data["vendors"];
      vendorList = vendors;
      this.setState({ vendorList: vendorList });
    });
  };

  createVendor = () => {
    this.props.history.push("/vendors/create");
  };

  editVendor = (vendor) => {
    this.props.history.push({ pathname: "/vendor/edit", state: vendor.id });
  };

  filterVendors = (e) => {
    let searchText = e.target.value;
    let vendors = vendorList;

    if (searchText) {
      vendors = vendors.filter((item) =>
        item.vendorName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    this.setState({ vendorList: vendors });
  };

  deleteVendor = async (deleteModal) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const headers = {
        Authorization: "Bearer " + user.token,
      };
      await axios
        .delete(DELETE_VENDOR + this.state.deleteModal.id, { headers: headers })
        .then((result) => {
          toast.success("Vendor deleted successfully.");
          console.log(deleteModal.id);
          vendorList = vendorList.filter(
            (vendor) => vendor.id !== deleteModal.id
          );
          this.setState({
            vendorList: this.state.vendorList.filter(
              (vendor) => vendor.id !== deleteModal.id
            ),
          });
          // this.getVendors();
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

  deleteVendorConfirmation = (deleteVendor) => {
    let state = { ...this.state.deleteModal };
    state.vendorName = deleteVendor.vendorName;

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

  showModal = (vendor) => {
    let state = { ...this.state };
    state.deleteModal.show = true;
    state.deleteModal.id = vendor.id;
    state.deleteModal.vendorName = vendor.vendorName;
    this.setState(state);
    console.log(this.state.deleteModal);
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
