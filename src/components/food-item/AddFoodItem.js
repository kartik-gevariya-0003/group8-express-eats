// Author: Tasneem Yusuf Porbanderwala
import "./food-item.css";
import React from "react";
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
import "react-toastify/dist/ReactToastify.css";
import { faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApplicationContainer from "../ApplicationContainer";
import bsCustomFileInput from "bs-custom-file-input";
import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_FOOD_ITEM_NAME,
  GET_RAW_MATERIALS,
  POST_ADD_FOOD_ITEM,
} from "../../config";
let rawMaterials = [];

export default class AddFoodItem extends ApplicationContainer {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      rawMaterials: rawMaterials,
      foodItem: {
        foodItemName: "",
        selectedRawMaterials: [],
        manufacturerCost: 0,
        totalCost: 0,
        profitMargin: 0,
        imageFile: null,
        imageFileName: "",
      },
      rawMaterialQuantityModal: {
        show: false,
        selectedRawMaterial: "",
        selectedRawMaterialQuantity: 0,
      },
      isError: {
        foodItemName: "",
        selectedRawMaterials: "",
        selectedRawMaterialQuantity: "",
        manufacturerCost: "",
        profitMargin: "",
        imageFile: "",
      },
      deleteRawMaterialModal: {
        show: false,
        rawMaterial: {},
      },
    };
  }

  async componentDidMount() {
    bsCustomFileInput.init();
    this.setState({ loading: true });
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("in component did mount");
    if (user && user.token) {
      await axios
        .get(GET_RAW_MATERIALS, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          console.log(response);
          rawMaterials = response.data.rawMaterials;
          this.setState({ rawMaterials: rawMaterials });
          this.setState({ loading: false });
        });
    }
  }
  filterRawMaterial = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      rawMaterials: rawMaterials.filter((rawMaterial) =>
        rawMaterial.rawMaterialName.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    let isError = { ...this.state.isError };

    await this.validator(
      "foodItemName",
      this.state.foodItem.foodItemName,
      isError
    );
    this.validator(
      "rawMaterials",
      this.state.foodItem.selectedRawMaterials,
      isError
    );
    this.validator(
      "manufacturerCost",
      this.state.foodItem.manufacturerCost,
      isError
    );
    this.validator("profitMargin", this.state.foodItem.profitMargin, isError);
    this.validator("imageFile", this.state.foodItem.imageFile, isError);
    let isValid = true;

    Object.values(isError).forEach((error) => {
      if (error.length > 0) {
        isValid = false;
      }
    });
    if (isValid) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        this.setState({ loading: true });
        const formData = new FormData();
        for (var key in this.state.foodItem) {
          if (key === "selectedRawMaterials") {
            this.state.foodItem[key].forEach((item) =>
              formData.append("selectedRawMaterials[]", JSON.stringify(item))
            );
          } else {
            formData.append(key, this.state.foodItem[key]);
          }
        }
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + user.token,
          },
        };
        await axios
          .post(POST_ADD_FOOD_ITEM, formData, config)
          .then((response) => {
            this.setState({ loading: false });
            this.props.history.push({
              pathname: "/food-item/confirmation",
              confirmation: {
                message:
                  this.state.foodItem.foodItemName + " Created Successfully",
                redirect: "/food-items",
                button: "GO TO FOOD ITEMS",
              },
            });
          })
          .catch((error) => {
            toast.error("Food Item was not added. Please try again. !");
            this.setState({ loading: false });
          });
      }
    }

    this.setState({
      isError: isError,
    });
  };

  onFoodItemNameChange = async (e) => {
    let state = { ...this.state };

    state.foodItem.foodItemName = e.target.value;

    await this.validator(
      "foodItemName",
      state.foodItem.foodItemName,
      state.isError
    );

    this.setState(state);
  };

  onManufacturerCostChange = (cost) => {
    let state = { ...this.state };
    this.validator("manufacturerCost", cost, this.state.isError);
    state.foodItem.manufacturerCost = cost;
    let totalCost = 0;
    if (state.foodItem.selectedRawMaterials.length > 0) {
      state.foodItem.selectedRawMaterials.forEach((rawMaterial) => {
        totalCost += rawMaterial.unitCost * rawMaterial.quantity;
      });
    }
    state.foodItem.totalCost = parseFloat(totalCost) + parseFloat(cost);
    this.setState(state);
  };

  validator = async (name, value, isError) => {
    switch (name) {
      case "modalRawMaterialQuantity":
        isError.selectedRawMaterialQuantity = "";
        if (value.length === 0 || value <= 0) {
          isError.selectedRawMaterialQuantity =
            "Quantity should be greater than 0";
        }
        break;
      case "foodItemName":
        isError.foodItemName = "";
        if (!value || value.length === 0) {
          isError.foodItemName = "Please enter food item name";
        } else {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user && user.token) {
            const headers = {
              Authorization: "Bearer " + user.token,
            };
            await axios
              .get(GET_FOOD_ITEM_NAME + this.state.foodItem.foodItemName, {
                headers: headers,
              })
              .then((response) => {
                isError.foodItemName = response.data.message;
              })
              .catch((error) => {
                this.setState({ loading: false });
                if (error.response.status === 401) {
                  toast.error("Session is expired. Please login again.");
                  localStorage.removeItem("user");
                  this.props.history.push({
                    pathname: "/login",
                  });
                }
              });
          }
        }
        break;
      case "rawMaterials":
        isError.selectedRawMaterials = "";
        if (value.length === 0) {
          isError.selectedRawMaterials =
            "Please select one or more raw materials";
        }
        break;
      case "manufacturerCost":
        isError.manufacturerCost = "";
        if (!value || value.length === 0) {
          isError.manufacturerCost = "Required Field.";
        }
        break;
      case "profitMargin":
        isError.profitMargin = "";
        if (!value || value.length === 0) {
          isError.profitMargin = "Required Field.";
        }
        break;
      case "imageFile":
        isError.imageFile = "";
        if (!value) {
          isError.imageFile = "Please upload an image file";
        } else if (value.type !== "image/jpeg" && value.type !== "image/png") {
          isError.imageFile = "Please upload only jpg or png format image.";
        }
      default:
        break;
    }
  };

  addRawMaterial = (rawMaterial) => {
    let state = { ...this.state };

    state.rawMaterialQuantityModal.selectedRawMaterial = rawMaterial;

    this.setState(state);

    this.showModal();
  };

  deleteRawMaterial = (rawMaterial) => {
    let state = { ...this.state };

    state.foodItem.selectedRawMaterials =
      state.foodItem.selectedRawMaterials.filter(
        (e) => e.id !== rawMaterial.id
      );

    state.foodItem.totalCost -= rawMaterial.unitCost * rawMaterial.quantity;

    this.validator(
      "rawMaterials",
      this.state.foodItem.selectedRawMaterials,
      state.isError
    );

    this.setState(state);
    this.closeDeleteModal();
  };

  closeModal = () => {
    let state = { ...this.state };

    state.rawMaterialQuantityModal.show = false;

    this.setState(state);
  };

  addRawMaterialToFoodItem = (e) => {
    e.preventDefault();

    let state = { ...this.state };

    if (state.rawMaterialQuantityModal.selectedRawMaterialQuantity > 0) {
      state.rawMaterialQuantityModal.selectedRawMaterial["quantity"] =
        state.rawMaterialQuantityModal.selectedRawMaterialQuantity;
      state.foodItem.selectedRawMaterials.push(
        state.rawMaterialQuantityModal.selectedRawMaterial
      );
      state.foodItem.totalCost +=
        state.rawMaterialQuantityModal.selectedRawMaterial.unitCost *
        state.rawMaterialQuantityModal.selectedRawMaterialQuantity;

      state.rawMaterialQuantityModal.selectedRawMaterial = "";
      state.rawMaterialQuantityModal.selectedRawMaterialQuantity = 0;
      state.rawMaterialQuantityModal.show = false;

      this.validator(
        "rawMaterials",
        this.state.foodItem.selectedRawMaterials,
        state.isError
      );
    } else {
      this.validator("modalRawMaterialQuantity", 0, state.isError);
    }

    this.setState(state);
  };

  rawMaterialQuantityChangeListener = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let state = { ...this.state };
    state.rawMaterialQuantityModal.selectedRawMaterialQuantity = value;

    this.validator(name, value, state.isError);

    this.setState(state);
  };

  showModal = () => {
    let state = { ...this.state };

    state.rawMaterialQuantityModal.show = true;

    this.setState(state);
  };

  profitMarginChangeListener = (value) => {
    const profitMargin = value;
    let state = { ...this.state };
    state.foodItem.profitMargin = profitMargin;
    this.validator("profitMargin", profitMargin, this.state.isError);
    this.setState(state);
  };

  calculateTotalCost = (event) => {
    let state = { ...this.state };
    let totalCost = this.state.foodItem.selectedRawMaterials.reduce(
      (sum, item) => {
        return sum + item.unitCost * item.quantity;
      },
      0
    );

    totalCost += +state.foodItem.manufacturerCost;
    totalCost += (totalCost * +state.foodItem.profitMargin) / 100;
    state.foodItem.totalCost = totalCost;
    this.setState(state);
  };

  showDeleteModal = (rawMaterial) => {
    let state = { ...this.state };
    state.deleteRawMaterialModal.show = true;
    state.deleteRawMaterialModal.rawMaterial = rawMaterial;
    this.setState(state);
  };

  closeDeleteModal = () => {
    let state = { ...this.state };
    state.deleteRawMaterialModal.show = false;
    state.deleteRawMaterialModal.rawMaterial = {};
    this.setState(state);
  };

  onFileChange = (event) => {
    let state = { ...this.state };
    state.foodItem.imageFile = event.target.files[0];
    state.foodItem.imageFileName = state.foodItem.imageFile.name;
    this.validator("imageFile", state.foodItem.imageFile, state.isError);
    this.setState(state);
  };
  render() {
    const { isError } = this.state;

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
        <Row className={"m-3"}>
          <Col sm={5}>
            <Card>
              <Card.Body>
                <Card.Title>Food Item</Card.Title>
                <Card.Text>
                  <strong>Food Item Name :</strong>{" "}
                  {this.state.foodItem.foodItemName}
                </Card.Text>
                {this.state.foodItem.selectedRawMaterials &&
                  this.state.foodItem.selectedRawMaterials.length > 0 && (
                    <section className={"mt-5"}>
                      <strong>Selected Raw Materials</strong>
                      <ListGroup
                        className={"mt-3 fi-selected-raw-material-list"}
                      >
                        {this.state.foodItem.selectedRawMaterials.map(
                          (rawMaterial) => (
                            <ListGroup.Item key={rawMaterial.id}>
                              <Row>
                                <Col sm={4} className={"pl-3 text-left"}>
                                  <h6>
                                    <span>{rawMaterial.rawMaterialName}</span>
                                    <br />
                                    <span>
                                      <small>
                                        {rawMaterial.unitMeasurement}
                                      </small>
                                    </span>
                                  </h6>
                                </Col>
                                <Col sm={4} className={"pl-3"}>
                                  <h6>
                                    <span>
                                      <strong>Quantity</strong>
                                    </span>
                                    <br />
                                    <span>{rawMaterial.quantity}</span>
                                  </h6>
                                </Col>
                                <Col sm={3}>
                                  <h6>
                                    <span>
                                      <strong>Unit Price</strong>
                                    </span>
                                    <br />
                                    <span>${rawMaterial.unitCost}</span>
                                  </h6>
                                </Col>
                                <Col sm={1}>
                                  <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    color={"#ba2311"}
                                    onClick={() =>
                                      this.showDeleteModal(rawMaterial)
                                    }
                                  />
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )
                        )}
                      </ListGroup>
                    </section>
                  )}
                <section>
                  <Row className="text-right mt-3">
                    <Col sm={8}>
                      <Form.Label>
                        <strong>Manufacturing Cost*</strong>
                      </Form.Label>
                    </Col>
                    <Col sm={4}>
                      <InputGroup className="mb-3" hasValidation>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          name={"manufacturerCost"}
                          type="text"
                          onBlur={(e) => {
                            this.calculateTotalCost(e);
                          }}
                          className={
                            this.state.isError.manufacturerCost.length > 0
                              ? "is-invalid"
                              : ""
                          }
                          onChange={(e) => {
                            this.onManufacturerCostChange(e.target.value);
                          }}
                        />
                        {this.state.isError.manufacturerCost.length > 0 && (
                          <Form.Control.Feedback type={"invalid"}>
                            {this.state.isError.manufacturerCost}
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="text-right">
                    <Col sm={8}>
                      <Form.Label>
                        <strong>Profit Margin*</strong>
                      </Form.Label>
                    </Col>
                    <Col sm={4}>
                      <InputGroup className="mb-3" hasValidation>
                        <Form.Control
                          name={"profitMargin"}
                          ariadescribedby="profitMargin"
                          type="text"
                          onBlur={(e) => {
                            this.calculateTotalCost(e);
                          }}
                          className={
                            this.state.isError.profitMargin.length > 0
                              ? "is-invalid"
                              : "border-radius"
                          }
                          onChange={(e) => {
                            this.profitMarginChangeListener(e.target.value);
                          }}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="profitMargin">%</InputGroup.Text>
                        </InputGroup.Append>
                        {this.state.isError.profitMargin.length > 0 && (
                          <Form.Control.Feedback type={"invalid"}>
                            {this.state.isError.profitMargin}
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
                    </Col>
                  </Row>
                </section>
                <Card.Text className="mt-5">
                  <strong>Total Cost :</strong>{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(this.state.foodItem.totalCost)}
                </Card.Text>
                <Button
                  variant={"primary"}
                  className="mt-3"
                  onClick={this.onSubmit}
                  block
                >
                  Create Food Item
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={7}>
            <Card>
              <Card.Body className={"text-left"}>
                <Card.Title>New Food Item</Card.Title>
                <Row className={"mt-3"}>
                  <Col sm={12}>
                    <Form.Group controlId="fooditemname">
                      <Form.Label>
                        <strong>Food Item Name*</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={isError.foodItemName ? "is-invalid" : ""}
                        placeholder="Enter Food Item Name"
                        onBlur={(e) => {
                          this.onFoodItemNameChange(e);
                        }}
                      />
                      {isError.foodItemName.length > 0 && (
                        <Form.Control.Feedback type={"invalid"}>
                          {isError.foodItemName}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={"mt-3"}>
                  <Col>
                    <Row>
                      <Col sm={5} className={"pt-2"}>
                        <Form.Label>
                          <strong>Upload Food Item Image*</strong>
                        </Form.Label>
                      </Col>
                      <Col sm={7}>
                        <Form.File id="custom-file" custom>
                          {this.state.isError.imageFile.length > 0 ? (
                            <Form.File.Input
                              isInvalid
                              className={"invalid-input"}
                              onChange={this.onFileChange}
                            />
                          ) : (
                            <Form.File.Input onChange={this.onFileChange} />
                          )}
                          <Form.File.Label data-browse="Browse">
                            Select an Image
                          </Form.File.Label>
                          {this.state.isError.imageFile.length > 0 && (
                            <Form.Control.Feedback type={"invalid"}>
                              {this.state.isError.imageFile}
                            </Form.Control.Feedback>
                          )}
                        </Form.File>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className={"mt-3"}>
                  <Col>
                    <Form.Group controlId="rawMaterials">
                      <Row>
                        <Col sm={7} className={"pt-2"}>
                          <Form.Label>
                            <strong>Raw Materials*</strong>
                          </Form.Label>
                        </Col>
                        <Col sm={5}>
                          <InputGroup>
                            <FormControl
                              placeholder="Search"
                              onChange={this.filterRawMaterial}
                              aria-label="Search"
                              aria-describedby="search-control"
                            />
                            <InputGroup.Append>
                              <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                              </InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Col>
                      </Row>
                      {this.state.rawMaterials.length > 0 ? (
                        <ListGroup
                          className={
                            isError.selectedRawMaterials.length > 0
                              ? "is-invalid mt-3 fi-raw-material-list"
                              : "mt-3 fi-raw-material-list"
                          }
                        >
                          {this.state.rawMaterials.map((rawMaterial) => (
                            <ListGroup.Item key={rawMaterial.id}>
                              <Row>
                                {console.log(rawMaterial)}
                                <Col sm={5} className={"pl-3"}>
                                  <h6>
                                    <span>{rawMaterial.rawMaterialName}</span>
                                    <br />
                                    <span>
                                      <small>
                                        {rawMaterial.unitMeasurement}
                                      </small>
                                    </span>
                                  </h6>
                                </Col>
                                <Col sm={5}>
                                  <h6>
                                    <span>
                                      <strong>Unit Price:</strong>
                                    </span>
                                    <span> ${rawMaterial.unitCost}</span>
                                  </h6>
                                </Col>
                                <Col sm={2}>
                                  <Button
                                    variant={"secondary"}
                                    onClick={() =>
                                      this.addRawMaterial(rawMaterial)
                                    }
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      ) : (
                        <span>No Raw Materials available.</span>
                      )}
                      {isError.selectedRawMaterials.length > 0 && (
                        <Form.Control.Feedback type={"invalid"}>
                          {isError.selectedRawMaterials}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Modal
            show={this.state.rawMaterialQuantityModal.show}
            animation={false}
            onHide={this.closeModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Enter Quantity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className={"m-0"}>
                  <strong>Raw Material</strong>
                </Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={
                    this.state.rawMaterialQuantityModal.selectedRawMaterial
                      .rawMaterialName
                  }
                  className={"p-0"}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <strong>Quantity : </strong>
                </Form.Label>
                <Form.Control
                  name={"modalRawMaterialQuantity"}
                  type="number"
                  step=".01"
                  onChange={this.rawMaterialQuantityChangeListener}
                  className={
                    isError.selectedRawMaterialQuantity.length > 0
                      ? "is-invalid"
                      : ""
                  }
                  placeholder="Enter Quantity"
                />
                {isError.selectedRawMaterialQuantity.length > 0 && (
                  <Form.Control.Feedback type={"invalid"}>
                    {isError.selectedRawMaterialQuantity}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={this.addRawMaterialToFoodItem}
              >
                Add to Food Item
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
        <Modal
          show={this.state.deleteRawMaterialModal.show}
          animation={false}
          onHide={this.closeDeleteModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label className={"m-0"}>
                <strong>
                  Are you sure you want to delete{" "}
                  {this.state.deleteRawMaterialModal.rawMaterial.name}?{" "}
                </strong>
              </Form.Label>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() =>
                this.deleteRawMaterial(
                  this.state.deleteRawMaterialModal.rawMaterial
                )
              }
            >
              Yes
            </Button>
            <Button variant="secondary" onClick={this.closeDeleteModal}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}
