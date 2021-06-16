import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import * as PropTypes from "prop-types";
import {Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ManufacturingOrders from "./components/ManufacturingOrders";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

Route.propTypes = {
  component: PropTypes.any,
  path: PropTypes.string,
  exact: PropTypes.bool
};

function App() {
  const navDropDownTitle = (<FontAwesomeIcon size={"2x"} icon={faUserCircle} className={"secondary"}/>)
  return (
      <div className="App">
        <Navbar bg="dark" expand="lg" variant={"dark"} sticky={"top"}>
          <Navbar.Brand>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="home">Home</Nav.Link>
              <Nav.Link href="vendors">Vendors</Nav.Link>
              <Nav.Link href="raw-materials">Raw Materials</Nav.Link>
              <Nav.Link href="food-items">Food Items</Nav.Link>
              <Nav.Link href="purchase-orders">Purchase Orders</Nav.Link>
              <Nav.Link href="manufacturing-orders">Manufacturing Orders</Nav.Link>
              <Nav.Link href="sales-orders">Sales Orders</Nav.Link>
              <Nav.Link href="inventory">Inventory</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown title={navDropDownTitle} id="navbarScrollingDropdown" alignRight>
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path='/manufacturing-orders' component={ManufacturingOrders} />
          <Redirect exact from='/' to='manufacturing-orders'/>
        </Switch>
      </div>
  );
}

export default App;
