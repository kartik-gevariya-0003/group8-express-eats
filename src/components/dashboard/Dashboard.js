/**
 * Author: Mansi Gevariya
*/
import {Button, ButtonGroup, ButtonToolbar, Card, Col, Row, Table} from "react-bootstrap";
import {
  CartesianGrid, Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import ApplicationContainer from "../ApplicationContainer";
import React from "react";
import axios from "axios";
import {
  GET_EXPECTED_REVENUE,
  GET_LOW_INVENTORY, GET_MOST_USED_RAW_MATERIAL, GET_PURCHASED_VS_USED_RAW_MATERIAL,
  GET_TOTAL_EXPENDITURE,
  GET_TOTAL_FOOD_ITEMS_IN_INVENTORY,
  GET_TOTAL_RAW_MATERIALS_IN_INVENTORY
} from "../../config";

class Dashboard extends ApplicationContainer {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lowInventoryItems: [],
      totalRawMaterialsInInventory: 0,
      totalFoodItemsInInventory: 0,
      totalExpenditure: 0,
      expectedRevenue: 0,
      selectedLineChartOption: '1w',
      lineChartData: [],
      selectedPieChartOption: '1w',
      pieChartData: [],
      pieChartColors: [
        '#035384AA',
        '#4EA1D3',
        '#BC3347AA',
        '#119696AA',
        '#32499EAA',
        '#931CA0AA',
        '#DD9A05AA',
        '#6919A3AA'
      ]
    }
    this.chartOptions = ['1w', '1m', '6m', '1y']
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      const headers = {
        'Authorization': 'Bearer ' + user.token
      }
      this.getLowInventoryItems(headers);
      this.getTotalRawMaterialsInInventoryItems(headers);
      this.getTotalFoodItemsInInventoryItems(headers);
      this.getTotalExpenditure(headers);
      this.getExpectedRevenue(headers);
      this.getMostUsedRawMaterials(headers, "1w");
      this.getPurchasedVsUsedRawMaterials(headers, "1w");
    }
  }

  refreshPieChartData = (chartOption, event) => {
    this.setState({selectedPieChartOption: chartOption});
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      const headers = {
        'Authorization': 'Bearer ' + user.token
      }
      this.getMostUsedRawMaterials(headers, chartOption);
    }
  }

  refreshLineChartData = (chartOption, event) => {
    this.setState({selectedLineChartOption: chartOption});
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      const headers = {
        'Authorization': 'Bearer ' + user.token
      }
      this.getPurchasedVsUsedRawMaterials(headers, chartOption);
    }
  }

  getPurchasedVsUsedRawMaterials = (headers, range) => {
    this.setState({loading: true});
    axios.get(GET_PURCHASED_VS_USED_RAW_MATERIAL + range, {headers: headers}).then(result => {
      let purchasedVsUsedMaterials = result.data['purchasedVsUsedMaterials'];
      purchasedVsUsedMaterials.forEach(purchasedVsUsedMaterial => {
        let date = new Date(purchasedVsUsedMaterial.name)
        purchasedVsUsedMaterial.name = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
      })
      this.setState({lineChartData: purchasedVsUsedMaterials, loading: false});
    })
  }

  getMostUsedRawMaterials = (headers, range) => {
    this.setState({loading: true});
    axios.get(GET_MOST_USED_RAW_MATERIAL + range, {headers: headers}).then(result => {
      let mostUsedRawMaterials = result.data['rawMaterialsUsed'];
      mostUsedRawMaterials.forEach((mostUsedRawMaterial, index) => {
        mostUsedRawMaterial.fill = this.state.pieChartColors[index]
      })
      this.setState({pieChartData: mostUsedRawMaterials, loading: false});
    })
  }

  getExpectedRevenue = (headers) => {
    axios.get(GET_EXPECTED_REVENUE, {headers: headers}).then(result => {
      let expectedRevenue = result.data['expectedRevenue'];
      this.setState({expectedRevenue: expectedRevenue});
    })
  }

  getTotalExpenditure = (headers) => {
    axios.get(GET_TOTAL_EXPENDITURE, {headers: headers}).then(result => {
      let totalExpenditure = result.data['totalExpenditure'];
      this.setState({totalExpenditure: totalExpenditure});
    })
  }

  getTotalRawMaterialsInInventoryItems = (headers) => {
    axios.get(GET_TOTAL_RAW_MATERIALS_IN_INVENTORY, {headers: headers}).then(result => {
      let totalRawMaterialsInInventory = result.data['totalRawMaterialsInInventory'];
      this.setState({totalRawMaterialsInInventory: totalRawMaterialsInInventory});
    })
  }

  getTotalFoodItemsInInventoryItems = (headers) => {
    axios.get(GET_TOTAL_FOOD_ITEMS_IN_INVENTORY, {headers: headers}).then(result => {
      let totalFoodItemsInInventory = result.data['totalFoodItemsInInventory'];
      this.setState({totalFoodItemsInInventory: totalFoodItemsInInventory});
    })
  }

  getLowInventoryItems = (headers) => {
    axios.get(GET_LOW_INVENTORY, {headers: headers}).then(result => {
      let lowInventoryItems = result.data['lowInventory'];
      this.setState({lowInventoryItems: lowInventoryItems});
    })
  }

  render() {
    return (
      <section>
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
        {super.render()}
        <Row className="m-3">
          <Col className={"text-left"}>
            <h2>Dashboard</h2>
            <hr/>
          </Col>
        </Row>
        <Row className="m-3 equal">
          <Col sm={3}>
            <section>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <section>Total Expenditure</section>
                    <section className="mt-3 text-danger">
                      <span>
                        {new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(this.state.totalExpenditure)}
                      </span>
                    </section>
                  </Card.Title>
                </Card.Body>
              </Card>
            </section>
            <section className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <section>Raw Materials in Inventory</section>
                    <section className="mt-3 text-secondary"><span>{this.state.totalRawMaterialsInInventory}</span></section>
                  </Card.Title>
                </Card.Body>
              </Card>
            </section>
          </Col>
          <Col sm={3}>
            <section>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <section>Total Expected Revenue</section>
                    <section className="mt-3 text-secondary">
                      <span>
                        {new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(this.state.expectedRevenue)}
                      </span>
                    </section>
                  </Card.Title>
                </Card.Body>
              </Card>
            </section>
            <section className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <section>Total Food Items Inventory</section>
                    <section className="mt-3 text-secondary"><span>{this.state.totalFoodItemsInInventory}</span></section>
                  </Card.Title>
                </Card.Body>
              </Card>
            </section>
          </Col>
          <Col sm={6}>
            <Card style={{height: "100%"}}>
              <Card.Body>
                <Card.Title className="text-left">
                  <section>Low Inventory</section>
                </Card.Title>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Raw Material</th>
                    <th>Quantity in Inventory</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.lowInventoryItems.map(lowInventoryItem => {
                      return <tr key={lowInventoryItem.id}>
                        <td>{lowInventoryItem['raw_material'].rawMaterialName}</td>
                        <td>{lowInventoryItem.quantity}</td>
                      </tr>
                    })
                  }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="m-3">
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-left">
                  <section>
                    <Row>
                      <Col sm={7}>
                        Purchased vs. Used Raw Materials
                      </Col>
                      <Col sm={5}>
                        <ButtonToolbar aria-label="Toolbar with button groups" className="float-right">
                          <ButtonGroup className="mr-2" aria-label="First group">
                            {this.chartOptions.map(chartOption => {
                              return <Button key={chartOption} onClick={this.refreshLineChartData.bind(this, chartOption)}
                                variant={chartOption === this.state.selectedLineChartOption ? 'primary' : 'outline-primary'}>{chartOption}</Button>
                            })}
                          </ButtonGroup>
                        </ButtonToolbar>
                      </Col>
                    </Row>
                  </section>
                  <section className="mt-3">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={this.state.lineChartData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={"name"}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line name="Purchased" type="monotone" dataKey="purchasedMaterials" stroke="#035384AA"/>
                        <Line name="Used" type="monotone" dataKey="usedMaterials" stroke="#BC3347CC"/>
                      </LineChart>
                    </ResponsiveContainer>
                  </section>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-left">
                  <section>
                    <Row>
                      <Col sm={6}>
                        Most Used Raw Materials
                      </Col>
                      <Col sm={6}>
                        <ButtonToolbar aria-label="Toolbar with button groups" className="float-right">
                          <ButtonGroup className="mr-2" aria-label="First group">
                            {this.chartOptions.map(chartOption => {
                              return <Button key={chartOption} onClick={this.refreshPieChartData.bind(this, chartOption)}
                                variant={chartOption === this.state.selectedPieChartOption ? 'primary' : 'outline-primary'}>{chartOption}</Button>
                            })}
                          </ButtonGroup>
                        </ButtonToolbar>
                      </Col>
                    </Row>
                  </section>
                  <section className="mt-3">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={this.state.pieChartData} dataKey={"value"} nameKey={"name"} innerRadius={70} label/>
                        <Legend layout="vertical" verticalAlign="middle" align="right"/>
                        <Tooltip/>
                      </PieChart>
                    </ResponsiveContainer>
                  </section>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    )
  }
}

export default Dashboard