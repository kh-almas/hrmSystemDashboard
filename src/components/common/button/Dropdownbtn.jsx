import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Dropdownbtn = (menu) => {
  /// used in sale in sales in inventory management
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="info"
          id="dropdown-basic"
          className="btn btn-pill btn-outline-info btn-xs p-1 px-4"
          type="button"
          style={{ zIndex: "900" }}
        >
          Select
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ zIndex: "100" }}>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Dropdownbtn;
