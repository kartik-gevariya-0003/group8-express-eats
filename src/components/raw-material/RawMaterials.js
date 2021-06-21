import React from "react";
import {Button, Card, Col, FormControl, InputGroup, ListGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import Header from "../headers/Header";
import ApplicationContainer from "../ApplicationContainer";

let rawMaterialList = [
  {name: "Chocolate Syrup", vendorName: "Honeyville Inc.", unitMeasurement: "3L", unitCost: "$39"},
  {name: "Peanut Butter", vendorName: "Glory Bee", unitMeasurement: "500gms", unitCost: "$11"},
  {name: "Chilli Sauce", vendorName: "Real Good Dairy", unitMeasurement: "100ml", unitCost: "$5"},
  {name: "Yoghurt", vendorName: "Milne MicroDried", unitMeasurement: "200ml", unitCost: "$9"}
]

export default class RawMaterials extends ApplicationContainer {
  constructor(props) {
    super(props);
    this.state = {
      rawMaterialList: rawMaterialList
    }
  }

  goToAddRawMaterial(event) {
    this.props.history.push('/raw-material/add')
  }

  goToEditRawMaterial(event) {
    this.props.history.push('/raw-material/update')
  }

  deleteRawMaterial(item) {
    const rawMaterialList = this.state.rawMaterialList.filter(i => i.name !== item.name)
    this.setState({rawMaterialList})
  }

  render() {
    return (
      <section>
        <Header/>
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Raw Materials</h2>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={8} className={"text-left"}>
            <Button variant={"primary"} onClick={this.goToAddRawMaterial.bind(this)}>
              Add Raw Material
            </Button>
          </Col>
          <Col sm={4}>
            <InputGroup>
              <FormControl placeholder="Search"
                           aria-label="Search" aria-describedby="search-control"/>
              <InputGroup.Append>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch}/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={12}>
            <Card>
              <Card.Body>
                <ListGroup className={"mt-3"}>
                  <ListGroup.Item>
                    <Row>
                      <Col sm={3} className={"pl-3 text-left"}>
                        <h5>
                          <span><strong>Name</strong></span>
                        </h5>
                      </Col>
                      <Col sm={2} className={"pl-3 text-left"}>
                        <h5>
                          <span><strong>Vendor</strong></span>
                        </h5>
                      </Col>
                      <Col sm={3} className={"pl-3 text-left"}>
                        <h5>
                          <span><strong>Unit Measurement</strong></span>
                        </h5>
                      </Col>
                      <Col sm={2} className={"pl-3 text-left"}>
                        <h5>
                          <span><strong>Price</strong></span>
                        </h5>
                      </Col>
                      <Col sm={2}>
                        <h5>
                          <span><strong>Action</strong></span>
                        </h5>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {this.state.rawMaterialList.length !== 0 ?
                    <section className={"po-selected-raw-material-list"}>
                      {this.state.rawMaterialList.map((item) =>
                        <ListGroup.Item key={item.name}>
                          <Row>
                            <Col sm={3} className={"pl-3 text-left"}>
                              <h6>
                                <span>{item.name}</span>
                              </h6>
                            </Col>
                            <Col sm={2} className={"pl-3 text-left"}>
                              <h6>
                                <span>{item.vendorName}</span>
                              </h6>
                            </Col>
                            <Col sm={3} className={"pl-3 text-left"}>
                              <h6>
                                <span>{item.unitMeasurement}</span>
                              </h6>
                            </Col>
                            <Col sm={2} className={"pl-3 text-left"}>
                              <h6>
                                <span>{item.unitCost}</span>
                              </h6>
                            </Col>
                            <Col sm={2}>
                              <FontAwesomeIcon icon={faPen} className={"mr-5"} color={"#4e301b"}
                                               onClick={() => this.goToEditRawMaterial()}/>
                              <FontAwesomeIcon icon={faTrash} color={"#ba2311"}
                                               onClick={() => this.deleteRawMaterial(item)}/>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                    </section>
                    :
                    <ListGroup.Item>No raw material available.</ListGroup.Item>
                  }
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}


