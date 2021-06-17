import {Component} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headerLinks: [
        {id: 'home', link: '/home', name: 'Home'},
        {id: 'vendors', link: '/vendors', name: 'Vendors'},
        {id: 'raw-materials', link: '/raw-materials', name: 'Raw Materials'},
        {id: 'food-items', link: '/food-items', name: 'Food Items'},
        {id: 'purchase-orders', link: '/purchase-orders', name: 'Purchase Orders'},
        {id: 'manufacturing-orders', link: '/manufacturing-orders', name: 'Manufacturing Orders'},
        {id: 'sales-orders', link: '/sales-orders', name: 'Sales Orders'},
        {id: 'inventory', link: '/inventory', name: 'Inventory'},
      ],
      activeLink: ''
    }
  }

  handleLinkClick(item, event) {
    this.setState({activeLink: item.id});
  }

  render() {
    const navDropDownTitle = (<FontAwesomeIcon size={"2x"} icon={faUserCircle} className={"secondary"}/>)
    return (
      <Navbar bg="dark" expand="lg" variant={"dark"} sticky={"top"}>
        <Navbar.Brand>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {
              this.state.headerLinks.map(headerLink => {
                return <Nav.Link href={headerLink.link} key={headerLink.id}
                                 className={this.state.activeLink === headerLink.id ? 'active' : ''}
                                 onClick={this.handleLinkClick.bind(this, headerLink)}>
                  {headerLink.name}
                </Nav.Link>
              })
            }
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
    )
  }
}
export default Header