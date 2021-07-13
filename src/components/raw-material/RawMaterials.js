import React from "react";
import {Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import Header from "../headers/Header";
import ApplicationContainer from "../ApplicationContainer";

let rawMaterialList = [
    {id: 1, name: "Chocolate Syrup", vendorName: "Honeyville Inc.", unitMeasurement: "3L", unitCost: "$39"},
    {id: 2, name: "Peanut Butter", vendorName: "Glory Bee", unitMeasurement: "500gms", unitCost: "$11"},
    {id: 3, name: "Chilli Sauce", vendorName: "Real Good Dairy", unitMeasurement: "100ml", unitCost: "$5"},
    {id: 4, name: "Yoghurt", vendorName: "Milne MicroDried", unitMeasurement: "200ml", unitCost: "$9"}
]

export default class RawMaterials extends ApplicationContainer {
    constructor(props) {
        super(props);
        this.state = {
            rawMaterialList: rawMaterialList,
            deleteRawMaterialModal: {
                show: false,
                id: -1,
                rawMaterialName: " "
            }
        }
    }

    goToAddRawMaterial(event) {
        this.props.history.push('/raw-material/add')
    }

    goToEditRawMaterial = (id) => {
        this.props.history.push('/raw-material/update')
    }

    deleteRawMaterial(id) {
        let state = {...this.state};

        state.rawMaterialList = state.rawMaterialList.filter((x) => {
            return x.id !== id;
        });
        this.closeModal();
        this.setState(state);
    }

    showModal = (rawMaterial) => {
        let state = {...this.state};
        state.deleteRawMaterialModal.show = true;
        state.deleteRawMaterialModal.id = rawMaterial.id;
        state.deleteRawMaterialModal.name = rawMaterial.name;
        this.setState(state);
    };

    closeModal = () => {
        let state = {...this.state};
        state.deleteRawMaterialModal.show = false;
        state.deleteRawMaterialModal.id = -1;
        state.deleteRawMaterialModal.name = "";
        this.setState(state);
    };


    filterRawMaterial = (e) => {
        e.preventDefault();
        const {value} = e.target;
        this.setState({
            rawMaterialList: rawMaterialList.filter((rawMaterial) =>
                rawMaterial.name.toLowerCase().includes(value.toLowerCase())
            ),
        });
    };

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
                            <FormControl placeholder="Search" onChange={this.filterRawMaterial}
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
                                                            <FontAwesomeIcon icon={faPen} className={"mr-5"}
                                                                             color={"#035384AA"}
                                                                             onClick={() => this.goToEditRawMaterial()}/>
                                                            <FontAwesomeIcon icon={faTrash} color={"#BC3347CC"}
                                                                             onClick={() => {
                                                                                 this.showModal(item);
                                                                             }}/>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                                            <Modal
                                                show={this.state.deleteRawMaterialModal.show}
                                                animation={false}
                                                onHide={this.closeModal}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirmation</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group>
                                                        <Form.Label className={"m-0"}>
                                                            <strong>
                                                                Are you sure you want to delete{" "}
                                                                {this.state.deleteRawMaterialModal.name}?{" "}
                                                            </strong>
                                                        </Form.Label>
                                                        <Form.Label className={"m-0"}>
                                                            All the raw material details will be deleted.
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button
                                                        variant="success"
                                                        onClick={() =>
                                                            this.deleteRawMaterial(this.state.deleteRawMaterialModal.id)
                                                        }>
                                                        Yes
                                                    </Button>
                                                    <Button variant="secondary" onClick={this.closeModal}>
                                                        No
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
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


