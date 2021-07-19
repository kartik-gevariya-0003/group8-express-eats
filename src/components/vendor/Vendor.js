import React, {useState} from "react";
import {Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Modal, Row,} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Header from "../headers/Header";

let vendorDetails = [
  {
    vendorName: "Food Factory",
    contactPersonName: "John",
    address: "Abbey Road",
    email: "john@foodfactory.com",
    contactNumber: 9876543210,
  },
  {
    vendorName: "Healthy Foods",
    contactPersonName: "Mark",
    address: "Abbott Drive",
    email: "mark@healthyfoods.com",
    contactNumber: 9876543210,
  },
  {
    vendorName: "Pizza Point",
    contactPersonName: "Kylie",
    address: "Acron Road",
    email: "pizzapoint@gmail.com",
    contactNumber: 9876543210,
  },
  {
    vendorName: "Honeyville Inc",
    contactPersonName: "Travis",
    address: "Abbey Road",
    email: "travis@honeyville.com",
    contactNumber: 9876543210,
  },
];

function Vendor() {
  let history = useHistory();

  const [vendors, setVendor] = useState(vendorDetails);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    vendorName: "",
  });

  const createVendor = () => {
    history.push("/vendors/create");
  };

  const editVendor = () => {
    history.push("/vendor/edit");
  };

  const filterVendors = (e) => {
    e.preventDefault();
    const {value} = e.target;
    setVendor(
      vendorDetails.filter((vendor) =>
        vendor.vendorName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const deleteVendor = (deleteVendor) => {
    vendorDetails = vendorDetails.filter(
      (vendor) =>
        vendor.vendorName.toLowerCase() !==
        deleteVendor.vendorName.toLowerCase()
    );
    setVendor(
      vendors.filter(
        (vendor) =>
          vendor.vendorName.toLowerCase() !==
          deleteVendor.vendorName.toLowerCase()
      )
    );
    closeModal();
  };

  const deleteVendorConfirmation = (deleteVendor) => {
    let state = {...deleteModal};
    state.vendorName = deleteVendor.vendorName;

    console.log(state);
    setDeleteModal((prevState) => {
      return {
        ...prevState,
        vendorName: deleteVendor.vendorName,
      };
    });
    showModal();
  };

  const showModal = () => {
    setDeleteModal((prevState) => {
      return {
        ...prevState,
        show: true,
      };
    });
  };

  const closeModal = () => {
    setDeleteModal((prevState) => {
      return {
        ...prevState,
        show: false,
      };
    });
  };
  return (
    <>
      <section>
        <Header/>
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Vendors</h2>
            <hr/>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={8} className={"text-left"}>
            <Button variant={"primary"} onClick={createVendor}>
              Add New Vendor
            </Button>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <InputGroup>
                <FormControl
                  placeholder="Search"
                  onChange={filterVendors}
                  aria-label="Search"
                  aria-describedby="search-control"
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch}/>
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
                  {vendors.length !== 0 ? (
                    <section>
                      {vendors.map((vendor) => (
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
                                onClick={() => editVendor(vendor)}
                              />
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                color={"#BC3347CC"}
                                onClick={() => deleteVendorConfirmation(vendor)}
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
          <Modal show={deleteModal.show} animation={false} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className={"m-0"}>
                  <strong>
                    Are you sure you want to delete {deleteModal.vendorName}?{" "}
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
                onClick={() => deleteVendor(deleteModal)}
              >
                Yes
              </Button>
              <Button variant="secondary" onClick={closeModal}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </section>
    </>
  );
}

export default Vendor;
