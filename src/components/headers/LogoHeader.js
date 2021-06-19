import {Component} from "react";
import {Button, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

class LogoHeader extends Component{

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activeLink: window.location.pathname
        }
        this.showUserIcon = this.state.activeLink === '/home'
        this.showLoginButton = this.state.activeLink === '/'
    }

    render() {
        const navDropDownTitle = (<FontAwesomeIcon size={"2x"} icon={faUserCircle} className={"secondary"}/>)
        return (
          <Navbar bg="dark" expand="lg" variant={"dark"} sticky={"top"}
                  className={(this.state.activeLink === '/login' || this.state.activeLink === '/register') ? "justify-content-center" : ""}>
              <Navbar.Brand href="/home" className={"mr-5"}>
                  <Image
                    src={"/logo.png"}
                    width="70"
                    height="40"
                    className="d-inline-block align-top"
                    alt="Express Eats"
                  />
                  <Image
                    src={"/logo_name.png"}
                    width="100"
                    height="30"
                    className="d-inline-block ml-2"
                    alt="Express Eats"
                  />
              </Navbar.Brand>
              {
                  this.showUserIcon &&
                  <Navbar.Collapse className="justify-content-end">
                      <Nav>
                          <NavDropdown title={navDropDownTitle} id="navbarScrollingDropdown" alignRight>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item>Log out</NavDropdown.Item>
                          </NavDropdown>
                      </Nav>
                  </Navbar.Collapse>
              }
              {
                  this.showLoginButton &&
                  <Navbar.Collapse className="justify-content-end">
                      <Button variant="primary">Login</Button>
                  </Navbar.Collapse>
              }
          </Navbar>
        )
    }
}
export default LogoHeader