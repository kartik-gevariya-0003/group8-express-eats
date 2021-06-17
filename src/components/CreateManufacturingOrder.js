import {Component} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";

class CreateManufacturingOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.foodItems = [
      {id: 1, name: 'Egg Sandwich', unitPrice: 4.50},
      {id: 2, name: 'Dim Sums', unitPrice: 5.00},
      {id: 3, name: 'Cheese Burger', unitPrice: 1.50},
      {id: 4, name: 'Pepperoni Pizza', unitPrice: 4.50},
      {id: 5, name: 'Fish and Chips', unitPrice: 2.50},
      {id: 6, name: 'Tom Yum Kung', unitPrice: 1.50},
      {id: 7, name: 'Tacos', unitPrice: 3.00},
      {id: 8, name: 'Sushi', unitPrice: 5.00},
      {id: 9, name: 'Greek Salad', unitPrice: 2.50},
    ]
  }

  goToManufacturingOrders(event) {
    this.props.history.push('/manufacturing-orders')
  }

  render() {
    return (
      <Container fluid={"sm"}>
        <Row className={"mt-3"}>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title className={"text-left"}>Order Details</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={8}>
            <Card>
              <Card.Body>
                <Card.Title className={"text-left"}>New Manufacturing Order</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default CreateManufacturingOrder