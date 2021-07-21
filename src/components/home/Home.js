/**
 * Author: Kartik Gevariya
 */
import "./home.css";
import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faHamburger,
  faIndustry,
  faShoppingBag,
  faUsers,
  faWarehouse
} from "@fortawesome/free-solid-svg-icons";
import PlainHeaderComponent from "../PlainHeaderComponent";
import {Col, Image, Row} from "react-bootstrap";

class Home extends PlainHeaderComponent {
  constructor(props) {
    super(props);
    this.props = props;

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      this.props.history.push({
        pathname: '/login'
      });
    }
  }

  render() {
    return (
      <section>
        {super.render()}
        <Row className="m-0 pt-5 justify-content-center">
          <Link to={"/dashboard"}>
            <Col className="dashboard-landing">
              <FontAwesomeIcon icon={faChartLine} color={"#32499EAA"} className="mt-3" size="6x"/>
            </Col>
            <span className="text-decoration-none component-text">Dashboard</span>
          </Link>

          <Link to={"/vendors"} className={"ml-5"}>
            <Col className="vendor-landing">
              <FontAwesomeIcon icon={faUsers} color={"#BC3347AA"} className="mt-3" size="6x"/>
            </Col>
            <span className="text-decoration-none component-text">Vendors</span>
          </Link>

          <Link to={"/raw-materials"} className={"ml-5"}>
            <Col className="raw-material-landing">
              <Image className={"raw-material-image"} src={"/raw_materials.png"} alt={"Raw Materials"}/>
            </Col>
            <span className="text-decoration-none component-text">Raw Materials</span>
          </Link>

          <Link to={"/food-items"} className={"ml-5"}>
            <Col className="food-item-landing">
              <FontAwesomeIcon icon={faHamburger} color={"#035384AA"} className="mt-3" size="6x"/>
            </Col>
            <span className="text-decoration-none component-text">Food Items</span>
          </Link>
        </Row>
        <Row className="m-0 pt-5 justify-content-center">
          <Link to={"/purchase-orders"}>
            <Col className="po-landing">
              <FontAwesomeIcon icon={faShoppingBag} color={"#119696AA"} className="mt-3" size="6x"/>
            </Col>
            <span className="text-decoration-none component-text">Purchase Orders</span>
          </Link>

          <Link to={"/manufacturing-orders"} className={"ml-5"}>
            <Col className="mo-landing">
              <FontAwesomeIcon icon={faIndustry} color={"#DD9A05AA"} className="mt-3" size="6x"/>
            </Col>
            <span className="text-decoration-none component-text">Manufacturing Orders</span>
          </Link>

          <Link to={"/inventory"} className={"ml-5"}>
            <Col className="inventory-landing">
              <FontAwesomeIcon icon={faWarehouse} color={"#6919A3AA"} className="mt-3" size="6x"/>
            </Col>
            <span className="text-decoration-none component-text">Inventory</span>
          </Link>
        </Row>
      </section>
    )
  }
}

export default Home
