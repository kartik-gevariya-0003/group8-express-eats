import './purchase-order.css';
import React, {Component} from 'react';
import {Button, Row} from "react-bootstrap";

export default class PurchaseOrders extends Component {

    createPurchaseOrder = () => {
        this.props.history.push({
            pathname: '/purchase-order/create'
        });
    }

    render() {
        return (
            <Row className={"m-3 justify-content-center"}>
                <Button variant={"success"} onClick={this.createPurchaseOrder}>CREATE PURCHASE ORDER</Button>
            </Row>
        );
    }
}
