import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, Image} from "react-bootstrap";

export default class Confirmation extends Component {
  render() {
    const {confirmation} = this.props.location;

    return (
      <section className="text-center mt-5">
        {confirmation && confirmation.message ? (
          <section>
            <h5>{confirmation.message}</h5>
            <br/>
            <Image
              className="mt-3 confirmation-image"
              src={"/confirmation.gif"}
              alt="Action Successful"
            />
            <br/>
            <Link to={confirmation.redirect}>
              <Button variant={"success"} className="mt-5">
                {confirmation.button}
              </Button>
            </Link>
          </section>
        ) : (
          <h5>No Confirmation Message!</h5>
        )}
      </section>
    );
  }
}
