import React, { useState } from "react";
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from "@react-pdf/renderer";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {Link} from "react-router-dom";


const LeaveReport = () => {
  const [modal, setModal] = useState();
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="pt-4 mb-3">
        <div className="d-flex flex-rows justify-content-center">
          <div>
            <h3 className="fw-bold">Leave Reports</h3>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Link to={"/dashboard/hrm/employee/leave/pdf"} target="_blank" className="ms-3 btn btn-primary">View
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
          <div className="table-responsive">
            <table className="table text-center table-bordered">
              <tbody>
                <tr>
                  <td scope="col" className="middle" rowSpan={3}>
                    {"Employee Name"}
                  </td>
                  <td scope="col" colSpan={6}>
                    {"Paid"}
                  </td>
                  <td scope="col" colSpan={2}>
                    {"Unpaid"}
                  </td>
                  <td scope="col" className="middle" colSpan={2} rowSpan={2}>
                    {"Compensatory off"}
                  </td>
                </tr>
                <tr>
                  <td scope="col" colSpan={2}>
                    {"Casual Leave"}
                  </td>
                  <td scope="col" colSpan={2}>
                    {"Sick Leave"}
                  </td>
                  <td scope="col" colSpan={2}>
                    {"Total"}
                  </td>
                  <td scope="col" colSpan={2}>
                    {"Absent"}
                  </td>
                </tr>
                <tr>
                  <td scope="col">{"Taken"}</td>
                  <td scope="col">{"Balance"}</td>
                  <td scope="col">{"Taken"}</td>
                  <td scope="col">{"Balance"}</td>
                  <td scope="col">{"Taken"}</td>
                  <td scope="col">{"Balance"}</td>
                  <td scope="col">{"Taken"}</td>
                  <td scope="col">{"Balance"}</td>
                  <td scope="col">{"Taken"}</td>
                  <td scope="col">{"Balance"}</td>
                </tr>
                <tr>
                  <td scope="col">{"Jhon"}</td>
                  <td scope="col">{"5"}</td>
                  <td scope="col">{"10"}</td>
                  <td scope="col">{"2"}</td>
                  <td scope="col">{"13"}</td>
                  <td scope="col">{"3"}</td>
                  <td scope="col">{"12"}</td>
                  <td scope="col">{"1"}</td>
                  <td scope="col">{"14"}</td>
                  <td scope="col">{"3"}</td>
                  <td scope="col">{"12"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveReport;
