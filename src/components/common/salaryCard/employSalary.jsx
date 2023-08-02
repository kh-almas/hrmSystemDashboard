import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const EmploySalary = () => {
  const [modal, setModal] = useState();

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div className="card" style={{ padding: "20px", height: "400px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #ccc",
          paddingBottom: "20px",
        }}
      >
        <h4>Employee Salary</h4>
        <button
          onClick={toggle}
          className="btn btn-pill btn-info btn-air-info btn-air-info"
          style={{ padding: "5px 10px", borderRadius: "5px" }}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <p>Payslip Type</p>
          </div>
          <div className="col">
            <p>Salary</p>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Set Basic Sallary</ModalHeader>
        <ModalBody>
          <form className="m-t-15">
            <div>
              <label htmlFor="exampleFormControlInput1">Payslip Type*</label>
              <select
                className="form-control digits"
                id="exampleFormControlSelect9"
                defaultValue="1"
              >
                <option>{"Select Branch"}</option>
                <option>{"2Select Branch"}</option>
                <option>{"3Select Branch"}</option>
              </select>
            </div>
            <div className="m-t-15">
              <label htmlFor="exampleFormControlInput1">Salary</label>
              <input
                className="form-control"
                id="exampleFormControlInput1"
                required={true}
                type="number"
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Create
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EmploySalary;
