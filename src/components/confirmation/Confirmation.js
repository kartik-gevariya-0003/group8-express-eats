/**
 * Author: Kartik Gevariya
 */
import React from "react";
import {Link} from "react-router-dom";
import {Button, Image} from "react-bootstrap";
import ApplicationContainer from "../ApplicationContainer";

export default class Confirmation extends ApplicationContainer {
  render() {
    const {confirmation} = this.props.location;
    return (
      <section>
        {super.render()}
        {confirmation && confirmation.message ? (
          <section className="text-center mt-5">
            <h5>{confirmation.message}</h5>
            <br/>
            <Image
              className="mt-3 confirmation-image"
              src={"/confirmation.gif"}
              alt="Action Successful"
            />
            <br/>
            <Link to={confirmation.redirect}>
              <Button variant={"primary"} className="mt-5">
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
