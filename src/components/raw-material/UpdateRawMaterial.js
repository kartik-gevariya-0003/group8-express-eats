import {Component} from "react";
import {Col, Row} from "react-bootstrap";

class UpdateRawMaterial extends Component {
  constructor(props) {
    super(props);
  }

  goToRawMaterials(event) {
    this.props.history.push('/raw-materials')
  }

  render() {
    return (
      <section>
        <Row className={"m-3"}>
          <Col sm={4}>
          </Col>
        </Row>
      </section>
    )
  }
}

export default UpdateRawMaterial