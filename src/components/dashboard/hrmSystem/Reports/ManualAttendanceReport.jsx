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

const ManualAttendanceReport = () => {
  const [modal, setModal] = useState();
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="pt-4 mb-3">
        <div className="d-flex flex-rows justify-content-center">
          <div>
            <h3 className="fw-bold">Manual Attendance Reports</h3>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Link to={"/dashboard/hrm/attendance/manual/report/pdf"} target="_blank" className="ms-3 btn btn-primary">
            View PDF
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
            <table className="table">
              <thead className="table-border">
                <tr>
                  <th scope="col">{"Employee"}</th>
                  <th scope="col">{"Date"}</th>
                  <th scope="col">{"Status"}</th>
                  <th scope="col">{"Clock In"}</th>
                  <th scope="col">{"Clock Out"}</th>
                  <th scope="col">{"Late In"}</th>
                  <th scope="col">{"Early Leaving"}</th>
                  <th scope="col">{"Overtime"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"John Doe"}</td>
                  <td>{"2023-08-19"}</td>
                  <td>{"Present"}</td>
                  <td>{"09:00"}</td>
                  <td>{"06:00"}</td>
                  <td>{"15"}</td>
                  <td>{"N/A"}</td>
                  <td>{"60"}</td>
                </tr>
                <tr>
                  <td>{"Jane Smith"}</td>
                  <td>{"2023-08-20"}</td>
                  <td>{"Present"}</td>
                  <td>{"09:30"}</td>
                  <td>{"06:15"}</td>
                  <td>{"30"}</td>
                  <td>{"N/A"}</td>
                  <td>{"45"}</td>
                </tr>
                <tr>
                  <td>{"Michael Johnson"}</td>
                  <td>{"2023-08-21"}</td>
                  <td>{"Absent"}</td>
                  <td>{"N/A"}</td>
                  <td>{"N/A"}</td>
                  <td>{"N/A"}</td>
                  <td>{"N/A"}</td>
                  <td>{"N/A"}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-center p-t-10">No entries found</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManualAttendanceReport;
