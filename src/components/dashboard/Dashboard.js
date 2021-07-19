import {Button, ButtonGroup, ButtonToolbar, Card, Col, Row, Table} from "react-bootstrap";
import {
  CartesianGrid,
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

class Dashboard extends ApplicationContainer {

  constructor(props) {
    super(props);
    this.state = {
      lowInventoryItems: [
        {item: 'Eggs', quantity: 12},
        {item: 'Bread', quantity: 25}
      ],
      selectedLineChartOption: '1d',
      lineChartData: [
        {name: "12:00 AM", uv: 4000, pv: 2400, amt: 2400},
        {name: "04:00 AM", uv: 3000, pv: 1398, amt: 2210},
        {name: "08:00 AM", uv: 2000, pv: 9800, amt: 2290},
        {name: "12:00 PM", uv: 2780, pv: 3908, amt: 2000},
        {name: "04:00 PM", uv: 1890, pv: 4800, amt: 2181},
        {name: "08:00 PM", uv: 2390, pv: 3800, amt: 2500}
      ],
      selectedPieChartOption: '1w',
      pieChartData: [
        {name: "Cheese", value: 200, fill: '#035384AA'},
        {name: "Black Beans", value: 120, fill: '#4EA1D3'},
        {name: "Bell Peppers", value: 80, fill: '#BC3347CC'}
      ]
    }
    this.chartOptions = ['1d', '1w', '1m', '6m', '1y']
  }


  render() {
    return (
      <section>
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
                    <section className="mt-3 text-danger"><span>$33,534.34</span></section>
                  </Card.Title>
                </Card.Body>
              </Card>
            </section>
            <section className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <section>Raw Materials in Inventory</section>
                    <section className="mt-3 text-secondary"><span>1,932</span></section>
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
                    <section className="mt-3 text-secondary"><span>$54,323.77</span></section>
                  </Card.Title>
                </Card.Body>
              </Card>
            </section>
            <section className="mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <section>Total Food Items Inventory</section>
                    <section className="mt-3 text-secondary"><span>7,214</span></section>
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
                      return <tr key={lowInventoryItem.item}>
                        <td>{lowInventoryItem.item}</td>
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
                              return <Button key={chartOption}
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
                        <Line name="Purchased" type="monotone" dataKey="pv" stroke="#035384AA"/>
                        <Line name="Used" type="monotone" dataKey="uv" stroke="#BC3347CC"/>
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
                              return <Button key={chartOption}
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