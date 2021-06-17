import {Component} from "react";
import {Button, Card, Col, Container, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ManufacturingOrders extends Component {

  constructor(props) {
    super(props);
    this.originalOrder = {
      openOrders: [
        {orderNumber: "#10BN1233", price: '$160.65'},
        {orderNumber: "#10BN1234", price: '$125.43'},
        {orderNumber: "#10BN1235", price: '$134.12'},
      ],
      preppingOrders: [
        {orderNumber: "#10PR1733", price: '$432.15'},
        {orderNumber: "#10PR6523", price: '$343.86'},
        {orderNumber: "#10PR2235", price: '$323.43'},
      ],
      packagedOrders: [
        {orderNumber: "#10PC4323", price: '$896.65'},
        {orderNumber: "#10PC8565", price: '$234.42'},
        {orderNumber: "#10PC2124", price: '$654.21'},
      ]
    }
    this.state = {
      openOrders: [
        {orderNumber: "#10BN1233", price: '$160.65'},
        {orderNumber: "#10BN1234", price: '$125.43'},
        {orderNumber: "#10BN1235", price: '$134.12'},
      ],
      preppingOrders: [
        {orderNumber: "#10PR1733", price: '$432.15'},
        {orderNumber: "#10PR6523", price: '$343.86'},
        {orderNumber: "#10PR2235", price: '$323.43'},
      ],
      packagedOrders: [
        {orderNumber: "#10PC4323", price: '$896.65'},
        {orderNumber: "#10PC8565", price: '$234.42'},
        {orderNumber: "#10PC2124", price: '$654.21'},
      ]
    }
  }

  updateOriginalOrders(item, status) {
    if (status === 'Prepping') {
      this.originalOrder.preppingOrders.unshift(item)
      this.originalOrder.openOrders = this.originalOrder.openOrders.filter(openOrder => openOrder.orderNumber !== item.orderNumber)
    } else if (status === 'Packaged') {
      this.originalOrder.packagedOrders.unshift(item)
      this.originalOrder.preppingOrders = this.originalOrder.preppingOrders.filter(preppingOrders => preppingOrders.orderNumber !== item.orderNumber)
    }
  }

  moveToPrepping(item, event) {
    let preppingOrders = this.state.preppingOrders;
    let openOrders = this.state.openOrders;
    preppingOrders.unshift(item)
    openOrders = openOrders.filter(openOrder => openOrder.orderNumber !== item.orderNumber)
    this.setState({openOrders, preppingOrders})
    this.updateOriginalOrders(item, 'Prepping')
  }

  moveToPackaged(item, event) {
    let packagedOrders = this.state.packagedOrders;
    let preppingOrders = this.state.preppingOrders;
    packagedOrders.unshift(item)
    preppingOrders = preppingOrders.filter(preppingOrders => preppingOrders.orderNumber !== item.orderNumber)
    this.setState({preppingOrders, packagedOrders})
    this.updateOriginalOrders(item, 'Packaged')
  }

  searchOrder(event) {
    let searchText = event.target.value
    let openOrders = this.originalOrder.openOrders;
    let preppingOrders = this.originalOrder.preppingOrders;
    let packagedOrders = this.originalOrder.packagedOrders;
    if (searchText) {
      openOrders = openOrders.filter(item => item.orderNumber.includes(searchText))
      preppingOrders = preppingOrders.filter(item => item.orderNumber.includes(searchText))
      packagedOrders = packagedOrders.filter(item => item.orderNumber.includes(searchText))
    }
    this.setState({openOrders, preppingOrders, packagedOrders})
  }

  goToCreateManufacturingOrder(event) {
    this.props.history.push('/manufacturing-order/create')
  }

  render() {
    return (
      <Container fluid={"sm"}>
        <Row className="mt-3">
          <Col sm={8}>
            <Button size={"sm"} variant="success" className={"float-left"}
                    onClick={this.goToCreateManufacturingOrder.bind(this)}>
              Create a Manufacturing Order
            </Button>
          </Col>
          <Col sm={4}>
            <InputGroup>
              <FormControl placeholder="Search"
                           onChange={this.searchOrder.bind(this)}
                           aria-label="Search" aria-describedby="search-control"/>
              <InputGroup.Append>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch}/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>Open Orders</Card.Title>
                { this.state.openOrders.length > 0 &&
                  <Table hover responsive="sm">
                  <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.openOrders.map((item) =>
                    <tr key={item.orderNumber}>
                      <td>{item.orderNumber}</td>
                      <td>{item.price}</td>
                      <td>
                        <Button size={"sm"} variant="primary" onClick={this.moveToPrepping.bind(this, item)}>
                          Prepping
                        </Button>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
                }
                { this.state.openOrders.length === 0 && <Card.Text className="text-center">No Open Orders Available</Card.Text>}
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>Prepping Orders</Card.Title>
                { this.state.preppingOrders.length > 0 && 
                  <Table hover responsive={"sm"}>
                  <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Price</th>
                    <th/>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.preppingOrders.map((item) =>
                    <tr key={item.orderNumber}>
                      <td>{item.orderNumber}</td>
                      <td>{item.price}</td>
                      <td>
                        <Button size={"sm"} variant="secondary" onClick={this.moveToPackaged.bind(this, item)}>
                          Packaged
                        </Button>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
                }
                { this.state.preppingOrders.length === 0 && <Card.Text className="text-center">No Prepping Orders Available</Card.Text>}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Packaged Orders</Card.Title>
                { this.state.packagedOrders.length > 0 &&
                  <Table hover responsive={"sm"}>
                  <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Price</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.packagedOrders.map((item) =>
                    <tr key={item.orderNumber}>
                      <td>{item.orderNumber}</td>
                      <td>{item.price}</td>
                    </tr>
                  )}
                  </tbody>
                </Table>
                }
                { this.state.packagedOrders.length === 0 && <Card.Text className="text-center">No Packaged Orders Available</Card.Text>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default ManufacturingOrders