import React from "react";
import { Button, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Vendor() {
  let history = useHistory();
  const createVendor = () => {
    history.push("/vendors/create");
  };
  return (
    <>
      <Row className={"m-3 justify-content-center"}>
        <Button variant={"success"} onClick={createVendor}>
          Create Vendor
        </Button>
      </Row>
    </>
  );
}

export default Vendor;
