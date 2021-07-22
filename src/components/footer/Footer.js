/**
 * Author: Mansi Gevariya
 */
import {Component} from "react";
import {Navbar} from "react-bootstrap";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar bg="dark" expand="lg" variant={"dark"} fixed={"bottom"}>
        <span>© 2019 Copyright: ExpressEats</span>
      </Navbar>
    );
  }
}

export default Footer;
