/**
 * Author: Mansi Gevariya
 * Author: Kartik Gevariya
 */

/**
 * This component is responsible for showing header along with all possible navigation.
 * This header is added to ApplicationContainer component which is root component for all pages that will be displayed after login.
 */
import "./header.css"
import {Component} from "react";
import {Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import {withRouter} from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerLinks: [
        {id: 'Dashboard', link: '/dashboard', name: 'Dashboard'},
        {id: 'vendors', link: '/vendors', name: 'Vendors'},
        {id: 'raw-materials', link: '/raw-materials', name: 'Raw Materials'},
        {id: 'food-items', link: '/food-items', name: 'Food Items'},
        {id: 'purchase-orders', link: '/purchase-orders', name: 'Purchase Orders'},
        {id: 'manufacturing-orders', link: '/manufacturing-orders', name: 'Manufacturing Orders'},
        {id: 'inventory', link: '/inventory', name: 'Inventory'},
      ],
      activeLink: window.location
    }
  }

  handleLinkClick(item, event) {
    this.setState({activeLink: item.id});
  }

  invalidateSession = () => {
    localStorage.removeItem('user');
    toast.success('User logged out successfully.');
    this.props.history.push({
      pathname: '/login'
    });
  }

  render() {
    const navDropDownTitle = (
      <FontAwesomeIcon
        size={"2x"}
        icon={faUserCircle}
        className={"secondary"}
      />
    );
    return (
      <Navbar bg="dark" expand="lg" variant={"dark"} sticky={"top"}>
        <Navbar.Brand href="/home" className={"mr-5"}>
          <Image
            src={"/logo.png"}
            width="70"
            height="40"
            className="d-inline-block align-top"
            alt="Express Eats"
          />
          <span className={"ml-2 logo-name-small"}>Express Eats</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {
              this.state.headerLinks.map(headerLink => {
                return <Nav.Link href={headerLink.link} key={headerLink.id}
                                 className={this.state.activeLink.pathname === headerLink.link ? 'active' : ''}
                                 onClick={this.handleLinkClick.bind(this, headerLink)}>
                  {headerLink.name}
                </Nav.Link>

              })}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown
              title={navDropDownTitle}
              id="navbarScrollingDropdown"
              alignRight
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item onClick={this.invalidateSession}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Header) ;
