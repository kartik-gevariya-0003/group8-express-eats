import React from "react";
import ApplicationContainer from "../ApplicationContainer";
import {Button, Card, Col, Form, FormControl, InputGroup, Modal, Row, Table,} from "react-bootstrap";
import {toast} from "react-toastify";
import Select from "react-select";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "react-toastify/dist/ReactToastify.css";
import {
  GET_ALL_INVENTORY,
  GET_FOOD_ITEMS,
  GET_RAW_MATERIALS,
  POST_ADD_FOOD_ITEM_INVENTORY,
  POST_ADD_RAW_MATERIAL_INVENTORY,
} from "../../config";
import axios from "axios";

let rawMaterials = [];
let foodItems = [];
export default class Inventory extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      rawMaterials: rawMaterials, // with inventory
      rawMaterialList: [], // in the db
      foodItemList: [], // in the db
      foodItems: foodItems, // with inventory
      addRawMaterialModal: {show: false},
      addFoodItemModal: {show: false},
      errors: {
        rawMaterialName: "",
        rawMaterialQuantity: "",
        foodItemName: "",
        foodItemQuantity: "",
      },
      newFoodItem: {
        id: null,
        name: "",
        quantity: 0,
      },
      newRawMaterial: {
        name: "",
        quantity: 0,
      },
    };
  }

  getAllInventory = (headers) => {
    axios
      .get(GET_ALL_INVENTORY, {headers: headers})
      .then((response) => {
        this.setState({loading: false});
        rawMaterials = response.data.rawMaterialInventories;
        foodItems = response.data.foodItemInventories;
        this.setState({
          foodItems: foodItems,
          rawMaterials: rawMaterials,
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

  searchRawMaterial = (value) => {
    this.setState({
      rawMaterials: rawMaterials.filter((item) =>
        item.raw_material.rawMaterialName
          .toLowerCase()
          .includes(value.toLowerCase())
      ),
    });
  };

  searchFoodItem = (e) => {
    let value = e.target.value;
    this.setState({
      foodItems: foodItems.filter((item) =>
        item.food_item.foodItemName.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  showRawMaterialModal = () => {
    let state = {...this.state};
    state.addRawMaterialModal.show = true;
    this.setState(state);
  };

  closeRawMaterialModal = () => {
    let state = {...this.state};
    state.errors.rawMaterialName = "";
    state.errors.rawMaterialQuantity = "";
    state.addRawMaterialModal.show = false;
    this.setState(state);
  };

  showFoodItemModal = () => {
    let state = {...this.state};
    state.addFoodItemModal.show = true;
    this.setState(state);
  };

  closeFoodItemModal = () => {
    let state = {...this.state};
    state.addFoodItemModal.show = false;
    this.setState(state);
  };

  setFoodItemName = (value) => {
    let state = {...this.state};
    if (value) {
      state.newFoodItem.name = value.foodItemName;
      state.newFoodItem.id = value.id;
      this.validator("foodItemName", value.foodItemName, state.errors);
      this.setState(state);
    } else {
      state.newFoodItem.name = null;
      this.validator("foodItemName", value, state.errors);
      this.setState(state);
    }
  };

  setFoodItemQuantity = (value) => {
    let state = {...this.state};
    state.newFoodItem.quantity = value;
    this.validator("foodItemQuantity", value, state.errors);
    this.setState(state);
  };

  validator = (name, value, errors) => {
    switch (name) {
      case "rawMaterialName":
        errors.rawMaterialName = "";
        if (!value || value.length === 0) {
          errors.rawMaterialName = "Required Field";
        }
        break;
      case "rawMaterialQuantity":
        errors.rawMaterialQuantity = "";
        if (!value || value.length === 0 || value === 0) {
          errors.rawMaterialQuantity =
            "Required Field. Value should be greater than 0.";
        }
        break;
      case "foodItemName":
        errors.foodItemName = "";
        if (!value || value.length === 0) {
          errors.foodItemName = "Required Field";
        }
        break;
      case "foodItemQuantity":
        errors.foodItemQuantity = "";
        if (!value || value.length === 0 || value === 0) {
          errors.foodItemQuantity =
            "Required Field. Value should be greater than 0.";
        }
        break;
      default:
        break;
    }
  };

  setRawMaterialName = (value) => {
    let state = {...this.state};

    if (value) {
      state.newRawMaterial.name = value.rawMaterialName;

      this.validator("rawMaterialName", value.rawMaterialName, state.errors);

      this.setState(state);
    } else {
      state.newRawMaterial.name = null;
      this.validator("rawMaterialName", value, state.errors);
      this.setState(state);
    }
  };

  setRawMaterialQuantity = (value) => {
    let state = {...this.state};

    state.newRawMaterial.quantity = value;

    this.validator("rawMaterialQuantity", value, state.errors);

    this.setState(state);
  };

  handleRawMaterialModalSubmit = async (e) => {
    e.preventDefault();
    let errors = {...this.state.errors};

    this.validator("rawMaterialName", this.state.newRawMaterial.name, errors);

    this.validator(
      "rawMaterialQuantity",
      this.state.newRawMaterial.quantity,
      errors
    );

    let isValid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        isValid = false;
      }
    });

    if (isValid) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        const headers = {
          Authorization: "Bearer " + user.token,
        };
        this.setState({loading: true});
        await axios
          .post(POST_ADD_RAW_MATERIAL_INVENTORY, this.state.newRawMaterial, {
            headers: headers,
          })
          .then((response) => {
            toast.success(
              this.state.newRawMaterial.name + " updated successfully!"
            );
            this.closeRawMaterialModal();
            this.getAllInventory(headers)
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
              toast.error(
                "Raw Material not added to inventory. Please try again later!"
              );
            }
            this.closeRawMaterialModal();
          });
      }
    }
    this.setState({
      errors: errors,
    });
  };

  formatRawMaterial = ({rawMaterialName}) => (
    <>
      <Row>
        <Col>{rawMaterialName}</Col>
      </Row>
    </>
  );

  handleFoodItemModalSubmit = async (e) => {
    e.preventDefault();
    let errors = {...this.state.errors};

    this.validator("foodItemName", this.state.newFoodItem.name, errors);
    this.validator("foodItemQuantity", this.state.newFoodItem.quantity, errors);

    let isValid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        isValid = false;
      }
    });

    if (isValid) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        const headers = {
          Authorization: "Bearer " + user.token,
        };
        this.setState({loading: true});
        axios
          .post(POST_ADD_FOOD_ITEM_INVENTORY, this.state.newFoodItem, {
            headers: headers,
          })
          .then((response) => {
            toast.success(
              this.state.newFoodItem.name + " updated successfully!"
            );
            this.closeFoodItemModal();
            this.getAllInventory(headers);
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
              toast.error(
                "Food Item not added to inventory. Please try again later!"
              );
            }
            this.closeFoodItemModal();
          });
      }
    }
    this.setState({
      errors: errors,
    });
  };

  formatFoodItem = ({foodItemName}) => (
    <>
      <Row>
        <Col>{foodItemName}</Col>
      </Row>
    </>
  );

  componentDidMount = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const headers = {
        Authorization: "Bearer " + user.token,
      };
      this.setState({loading: true});
      this.getAllInventory(headers)
      this.setState({loading: true});
      await axios
        .get(GET_RAW_MATERIALS, {headers: headers})
        .then((response) => {
          this.setState({loading: false});
          let rawMaterialList = response.data.rawMaterials;
          this.setState({rawMaterialList: rawMaterialList});
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
      this.setState({loading: true});
      await axios
        .get(GET_FOOD_ITEMS, {headers: headers})
        .then((response) => {
          this.setState({loading: false});
          let foodItemList = response.data.foodItems;
          this.setState({foodItemList: foodItemList});
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
            <h2>Inventory</h2>
            <hr/>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={3}>
            <Button
              variant="primary"
              className={"float-left"}
              onClick={() => {
                this.showRawMaterialModal();
              }}
            >
              Add Raw Materials to Inventory
            </Button>
          </Col>
          <Col sm={3}>
            <InputGroup>
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-control"
                className={"float-right"}
                onChange={(e) => {
                  this.searchRawMaterial(e.target.value);
                }}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch}/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col sm={3}>
            <Button
              variant="primary"
              className={"float-left"}
              onClick={() => {
                this.showFoodItemModal();
              }}
            >
              Add Food Items to Inventory
            </Button>
          </Col>
          <Col sm={3}>
            <InputGroup>
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-control"
                className={"float-right"}
                onChange={this.searchFoodItem}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch}/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title className={"text-left"}>Raw Materials</Card.Title>
                {this.state.rawMaterials.length > 0 ? (
                  <Table hover responsive="sm">
                    <thead>
                    <tr>
                      <th className="text-left">Raw Material</th>
                      <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rawMaterials.map((item) => (
                      <tr key={item.id}>
                        <td className="text-left">
                          {item.raw_material.rawMaterialName}
                        </td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                ) : (
                  <Card.Text className="text-center">
                    No Raw Materials Available.
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title className={"text-left"}>Food Items</Card.Title>
                {this.state.foodItems.length > 0 ? (
                  <Table hover responsive="sm">
                    <thead>
                    <tr>
                      <th className="text-left">Food Items</th>
                      <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.foodItems.map((item) => (
                      <tr key={item.id}>
                        <td className="text-left">
                          {item.food_item.foodItemName}
                        </td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                ) : (
                  <Card.Text className="text-center">
                    No Food Items Available.
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Modal
          show={this.state.addRawMaterialModal.show}
          animation={false}
          onHide={this.closeRawMaterialModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Raw Material to Inventory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label className={"m-0"}>
                <strong>Raw Material Name </strong>*
              </Form.Label>

              <Select
                isClearable
                className={
                  this.state.errors.rawMaterialName ? "is-invalid" : ""
                }
                options={this.state.rawMaterialList}
                formatOptionLabel={this.formatRawMaterial}
                placeholder="Select"
                onChange={this.setRawMaterialName}
              />
              {this.state.errors.rawMaterialName.length > 0 && (
                <Form.Control.Feedback type={"invalid"}>
                  {this.state.errors.rawMaterialName}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <strong>Quantity</strong> *
              </Form.Label>

              <Form.Control
                name="quantity"
                onChange={(e) => {
                  this.setRawMaterialQuantity(e.target.value);
                }}
                className={
                  this.state.errors.rawMaterialQuantity ? "is-invalid" : ""
                }
                type="number"
              />
              {this.state.errors.rawMaterialQuantity.length > 0 && (
                <Form.Control.Feedback type={"invalid"}>
                  {this.state.errors.rawMaterialQuantity}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Modal.Footer>
              <Button
                variant="primary"
                onClick={this.handleRawMaterialModalSubmit}
              >
                Submit
              </Button>
              <Button variant="danger" onClick={this.closeRawMaterialModal}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
        <Modal
          show={this.state.addFoodItemModal.show}
          animation={false}
          onHide={this.closeFoodItemModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Food Item to Inventory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>
                <strong>Food Item Name</strong> *
              </Form.Label>
              <Select
                isClearable
                className={this.state.errors.foodItemName ? "is-invalid" : ""}
                options={this.state.foodItemList}
                formatOptionLabel={this.formatFoodItem}
                placeholder="Select Food Item"
                onChange={this.setFoodItemName}
              />

              {this.state.errors.foodItemName.length > 0 && (
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.foodItemName}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <strong>Quantity</strong> *
              </Form.Label>

              <Form.Control
                name="quantity"
                onChange={(e) => {
                  this.setFoodItemQuantity(e.target.value);
                }}
                type="number"
                className={
                  this.state.errors.foodItemQuantity ? "is-invalid" : ""
                }
              />
              {this.state.errors.foodItemQuantity.length > 0 && (
                <Form.Control.Feedback type={"invalid"}>
                  {this.state.errors.foodItemQuantity}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={this.handleFoodItemModalSubmit}
              >
                Submit
              </Button>
              <Button variant="danger" onClick={this.closeFoodItemModal}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </section>
    );
  }
}
