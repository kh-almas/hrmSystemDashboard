import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const Payslip = () => {
  const [modal, setModal] = useState();

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Payslip" />
      <div className="card" style={{ padding: "20px 0px" }}>
        <div className="row">
          <div className="col-sm-12 col-xl-5"></div>
          <div className="col-sm-12 col-xl-2">
            <label htmlFor="exampleFormControlInput1">Select Month</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{"JAN"}</option>
              <option>{"FEB"}</option>
              <option>{"MAR"}</option>
              <option>{"APR"}</option>
              <option>{"MAY"}</option>
              <option>{"JUN"}</option>
              <option>{"JUL"}</option>
              <option>{"AUG"}</option>
              <option>{"SEP"}</option>
              <option>{"OCT"}</option>
              <option>{"NOV"}</option>
              <option>{"DEC"}</option>
            </select>
          </div>
          <div className="col-sm-12 col-xl-2">
            <label htmlFor="exampleFormControlInput1">Select Year</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{"2023"}</option>
              <option>{"2024"}</option>
              <option>{"2025"}</option>
              <option>{"2026"}</option>
              <option>{"2027"}</option>
              <option>{"2028"}</option>
              <option>{"2029"}</option>
              <option>{"2030"}</option>
            </select>
          </div>
          <div className="col-sm-12 col-xl-3">
            <button
              style={{
                margin: "20px 0px 0px 30px",
                padding: "10px 20px",
                backgroundColor: "#4c2fbf",
                border: "none",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Generate Payslip
            </button>
            {/* {state && (
              <Alert color="primary dark">
                <p>{"This is a info alert—check it out!"}</p>
              </Alert>
            )} */}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "20px" }}>
        <div className="row m-t-15">
          <div className="col-sm-12 col-xl-4">
            <h5>Find Employee Payslip</h5>
          </div>
          <div className="col-sm-12 col-xl-2">
            <label htmlFor="exampleFormControlInput1">Select Month</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{"JAN"}</option>
              <option>{"FEB"}</option>
              <option>{"MAR"}</option>
              <option>{"APR"}</option>
              <option>{"MAY"}</option>
              <option>{"JUN"}</option>
              <option>{"JUL"}</option>
              <option>{"AUG"}</option>
              <option>{"SEP"}</option>
              <option>{"OCT"}</option>
              <option>{"NOV"}</option>
              <option>{"DEC"}</option>
            </select>
          </div>
          <div className="col-sm-12 col-xl-2">
            <label htmlFor="exampleFormControlInput1">Select Year</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{"2023"}</option>
              <option>{"2024"}</option>
              <option>{"2025"}</option>
              <option>{"2026"}</option>
              <option>{"2027"}</option>
              <option>{"2028"}</option>
              <option>{"2029"}</option>
              <option>{"2030"}</option>
            </select>
          </div>
          <div className="col-sm-12 col-xl-2">
            <button
              style={{
                margin: "20px 0px 0px 30px",
                padding: "10px 60px",
                backgroundColor: "#4c2fbf",
                border: "none",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Export
            </button>
          </div>
          <div className="col-sm-12 col-xl-2">
            <button
              onClick={toggle}
              style={{
                margin: "20px 0px 0px 30px",
                padding: "10px 20px",
                backgroundColor: "#4c2fbf",
                border: "none",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Bulk Payment
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Bulk Payment</ModalHeader>
        <ModalBody>
          <div>
            <p>Total Unpaid Employee 0 out of 0</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Bulk Payment
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div className="card" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className=" table-border">
              <tr>
                <th scope="col">{"Employee ID"}</th>
                <th scope="col">{"Name"}</th>
                <th scope="col">{"Payroll Type"}</th>
                <th scope="col">{"Salary"}</th>
                <th scope="col">{"Net Salary"}</th>
                <th scope="col">{"Status"}</th>
                <th scope="col">{"Action"}</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <th scope="row">{""}</th>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td></td>
                <td></td>
              </tr> */}
            </tbody>
          </table>
          <p className="text-center p-t-10">No entries found</p>
        </div>
        <p>Showing 1 to 1 of 1 entries</p>
      </div>
    </div>
  );
};

export default Payslip;
