import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from "@react-pdf/renderer";
import {Link} from "react-router-dom";


const EmployeeMovement = () => {
  const [modal, setModal] = useState();
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="pt-4 mb-3">
        <div className="d-flex flex-rows justify-content-center">
          <div>
            <h3 className="fw-bold">Employee Movement Reports</h3>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Link to={"/dashboard/hrm/employee/movements/pdf"} target="_blank" className="ms-3 btn btn-primary">View
            PDF
          </Link>
        </div>
      </div>

      <div className="card" style={{ padding: "20px" }}>
        <div className="row">
          <div className="col">
            <label htmlFor="exampleFormControlInput1">Date From</label>
            <input className="form-control" required={true} type="date" />
          </div>
          <div className="col">
            <label htmlFor="exampleFormControlInput1">Date To</label>
            <input className="form-control" required={true} type="date" />
          </div>
          <div className="col">
            <label htmlFor="exampleFormControlInput1">Employee Name</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{"Select employee name"}</option>
            </select>
          </div>
          <div className="col">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <button
                className="btn btn-primary btn-lg"
                style={{ padding: "5px 15px" }}
              >
                <i className="fa fa-search"></i>
              </button>
              <button
                className="btn btn-danger btn-lg"
                style={{ padding: "5px 15px", borderRadius: "5px" }}
              >
                <i className="fa fa-trash-o"></i>
              </button>
              <button
                onClick={toggle}
                className="btn btn-primary btn-lg"
                style={{ padding: "5px 15px" }}
              >
                <i className="fa fa-paste"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Import employee CSV file</ModalHeader>
        <ModalBody>
          <form className="m-t-15 m-b-15">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "20px",
              }}
            >
              <h6 className="m-0">Download sample employee CSV file</h6>
              <button className="btn btn-primary btn-lg">
                {" "}
                <i className="fa fa-upload"></i> Download
              </button>
            </div>
            <label htmlFor="exampleFormControlInput1">Select CSV File</label>{" "}
            <br />
            <input type="file" />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Upload
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div className="card" style={{ padding: "20px" }}>
        <div>
          <h6 className="fw-bold">Employee Name: ABC</h6>
          <p className="fw-bold mb-1">Employee Code: #abc</p>
          <p className="fw-bold mb-1">Department: IT</p>
          <p className="fw-bold mb-1">Branch: Maintenance</p>
        </div>
        <hr />
        <div>
          <div className="table-responsive">
            <table className="table">
              <thead className="table-border">
                <tr>
                  <th scope="col">{"Date"}</th>
                  <th scope="col">{"In Time"}</th>
                  <th scope="col">{"Out Time"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"2023-08-19"}</td>
                  <td>{"09:00 AM"}</td>
                  <td>{"06:00 PM"}</td>
                </tr>
                <tr>
                  <td>{"2023-08-20"}</td>
                  <td>{"09:30 AM"}</td>
                  <td>{"06:15 PM"}</td>
                </tr>
                <tr>
                  <td>{"2023-08-21"}</td>
                  <td>{"08:45 AM"}</td>
                  <td>{"05:30 PM"}</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeMovement;
