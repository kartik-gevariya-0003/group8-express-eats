/**
 * Author: Kartik Gevariya
 */
import './main.css'
import PlainHeaderComponent from "../PlainHeaderComponent";
import ParticlesBg from "particles-bg";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class Main extends PlainHeaderComponent {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <section>
        {super.render()}
        <ParticlesBg type="cobweb" bg={true} color={"#88CACA"}/>
        <Container fluid={"sm"}>
          <Row className={"justify-content-center mt-5 ml-0 mr-0"}>
            <h1 className={"logo-name"}/>
          </Row>
          <Row className={"justify-content-center text-center mt-5"}>
            <Col sm={6} className={"mt-4"}>
              <h2>All-in-one Food Manufacturing Platform for your supply chain management needs</h2>
              <br/>
              <p>Setup Vendors, Raw Materials, Food Items and manage Purchase Orders, Manufacturing Orders and keep track of your Inventory - everything you need to easily manage your supply chain, within one interface.</p>
              <Link to={"/login"}>
                <Button variant={"info mt-3 mr-2"}>Login / Register</Button>
              </Link>
            </Col>
            <Col sm={6}>
              <Image src={"/main-food.png"} alt={"Plain Logo"} className={"main-image"}/>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Main
