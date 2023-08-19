import React, { useState } from "react";
import Breadcrumb from "../../../common/breadcrumb";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from "@react-pdf/renderer";
import logo from "../../../../assets/images/logo/companyLogo.jpg";

const DateWiseAttendanceReport = () => (
  <Document>
    {/*// style={styles.page style={{ width: '600px'}}}*/}
    <Page
      size="A4"
      style={{ margin: "10px", padding: "0 20px 0 0", marginRight: "20px" }}
    >
      <View style={{ margin: "10px", padding: "10px" }}>
        <View
          style={{
            fontSize: "11px",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ fontSize: "11px" }}>
            <Image src={logo} style={{ width: "50px" }} />
            <View style={{ marginTop: "8px" }}>
              <Text>7/1 (7th Floor), Kabbokash</Text>
              <Text>Kawran Bazar Rd, Dhaka 1215</Text>
            </View>
          </View>
          <View style={{ fontSize: "11px" }}>
            <Text>Report Date</Text>
            <Text>17.08.2023</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <View>
            <Text style={{ fontSize: "16px", margin: "auto" }}>
              Date Wise Attendance Report
            </Text>
            <Text
              style={{ fontSize: "10px", margin: "auto", paddingTop: "4px" }}
            >
              From: 01 Aug 2023 To: 01 Nov 2023
            </Text>
          </View>
        </View>
        <View>
          <View>
            <Text style={{ fontSize: "13px", margin: "10px 0 13px 0" }}>
              Branch: Developer
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                margin: "0 0 7px 0",
              }}
            >
              Department: Dept1
            </Text>
            <View>
              <View
                style={{
                  paddingBottom: "5px",
                  borderBottom: "1px dashed gray",
                  flexDirection: "row",
                  fontSize: "11px",
                  fontWeight: "100",
                  justifyContent: "space-around",
                }}
              >
                <Text>Date</Text>
                <Text>Employee Code</Text>
                <Text>Employee Name</Text>
                <Text>Designation</Text>
                <Text>In Time</Text>
                <Text>Out Time</Text>
                <Text>Late In</Text>
                <Text>Early Out</Text>
                <Text>Status</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                <Text style={{ fontSize: "10px" }}>No entries found</Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: "15px" }}>
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                margin: "0 0 7px 0",
              }}
            >
              Department: Dept2
            </Text>
            <View>
              <View
                style={{
                  paddingBottom: "5px",
                  borderBottom: "1px dashed gray",
                  flexDirection: "row",
                  fontSize: "11px",
                  justifyContent: "space-around",
                }}
              >
                <Text>Date</Text>
                <Text>Employee Code</Text>
                <Text>Employee Name</Text>
                <Text>Designation</Text>
                <Text>In Time</Text>
                <Text>Out Time</Text>
                <Text>Late In</Text>
                <Text>Early Out</Text>
                <Text>Status</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                <Text style={{ fontSize: "10px" }}>No entries found</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: "15px" }}>
          <View>
            <Text style={{ fontSize: "13px", margin: "10px 0 13px 0" }}>
              Branch: Security
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                margin: "0 0 7px 0",
              }}
            >
              Department: Dept1
            </Text>
            <View>
              <View
                style={{
                  paddingBottom: "5px",
                  borderBottom: "1px dashed gray",
                  flexDirection: "row",
                  fontSize: "11px",
                  fontWeight: "100",
                  justifyContent: "space-around",
                }}
              >
                <Text>Date</Text>
                <Text>Employee Code</Text>
                <Text>Employee Name</Text>
                <Text>Designation</Text>
                <Text>In Time</Text>
                <Text>Out Time</Text>
                <Text>Late In</Text>
                <Text>Early Out</Text>
                <Text>Status</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                <Text style={{ fontSize: "10px" }}>No entries found</Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: "15px" }}>
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                margin: "0 0 7px 0",
              }}
            >
              Department: Dept2
            </Text>
            <View>
              <View
                style={{
                  paddingBottom: "5px",
                  borderBottom: "1px dashed gray",
                  flexDirection: "row",
                  fontSize: "11px",
                  justifyContent: "space-around",
                }}
              >
                <Text>Date</Text>
                <Text>Employee Code</Text>
                <Text>Employee Name</Text>
                <Text>Designation</Text>
                <Text>In Time</Text>
                <Text>Out Time</Text>
                <Text>Late In</Text>
                <Text>Early Out</Text>
                <Text>Status</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                <Text style={{ fontSize: "10px" }}>No entries found</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

const DateWiseAttendance = () => {
  const [modal, setModal] = useState();

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="pt-4 mb-3">
        <div className="d-flex flex-rows justify-content-center">
          <div>
            <h3 className="fw-bold">Date Wise Attendance Report</h3>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <PDFDownloadLink
            document={<DateWiseAttendanceReport />}
            fileName="DateWiseAttendanceReport.pdf"
            className={"btn btn-primary"}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download now!"
            }
          </PDFDownloadLink>
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
            <label htmlFor="exampleFormControlInput1">Branch</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{"Select branch"}</option>
              <option>{"accountant branch"}</option>
              <option>{"accountant branch"}</option>
              <option>{"other branch"}</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="exampleFormControlInput1">Department</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{"Select department"}</option>
              <option>{"accountant department"}</option>
              <option>{"accountant department"}</option>
              <option>{"other department"}</option>
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
          <h6 className="fw-bold">Branch: Developer</h6>
        </div>
        <hr />
        <div className="mb-3">
          <h6 style={{ fontSize: "13px" }} className="fw-bold mb-3">
            Department: Dept1
          </h6>
          <div className="table-responsive">
            <table className="table">
              <thead className="table-border">
                <tr>
                  <th scope="col">{"Date"}</th>
                  <th scope="col">{"Employee Code"}</th>
                  <th scope="col">{"Employee Name"}</th>
                  <th scope="col">{"Designation"}</th>
                  <th scope="col">{"In Time"}</th>
                  <th scope="col">{"Out Time"}</th>
                  <th scope="col">{"Late In"}</th>
                  <th scope="col">{"Early Out"}</th>
                  <th scope="col">{"Status"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"2023-08-19"}</td>
                  <td>{"EMP001"}</td>
                  <td>{"John Doe"}</td>
                  <td>{"Software Engineer"}</td>
                  <td>{"09:00 AM"}</td>
                  <td>{"06:00 PM"}</td>
                  <td>{"15 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                </tr>
                <tr>
                  <td>{"2023-08-20"}</td>
                  <td>{"EMP002"}</td>
                  <td>{"Jane Smith"}</td>
                  <td>{"Product Manager"}</td>
                  <td>{"09:30 AM"}</td>
                  <td>{"06:15 PM"}</td>
                  <td>{"30 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                </tr>
                <tr>
                  <td>{"2023-08-21"}</td>
                  <td>{"EMP003"}</td>
                  <td>{"Michael Johnson"}</td>
                  <td>{"Sales Executive"}</td>
                  <td>{"08:45 AM"}</td>
                  <td>{"05:30 PM"}</td>
                  <td>{"10 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-3">
          <h6 className="fw-bold mb-3">Department: Dept2</h6>
          <div className="table-responsive">
            <table className="table">
              <thead className="table-border">
                <tr>
                  <th scope="col">{"Date"}</th>
                  <th scope="col">{"Employee Code"}</th>
                  <th scope="col">{"Employee Name"}</th>
                  <th scope="col">{"Designation"}</th>
                  <th scope="col">{"In Time"}</th>
                  <th scope="col">{"Out Time"}</th>
                  <th scope="col">{"Late In"}</th>
                  <th scope="col">{"Early Out"}</th>
                  <th scope="col">{"Status"}</th>
                  <th scope="col">{"Action"}</th>
                </tr>
              </thead>
              <tbody style={{ whiteSpace: "nowrap" }}>
                <tr>
                  <td>{"2023-08-19"}</td>
                  <td>{"EMP001"}</td>
                  <td>{"John Doe"}</td>
                  <td>{"Software Engineer"}</td>
                  <td>{"09:00 AM"}</td>
                  <td>{"06:00 PM"}</td>
                  <td>{"15 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>{"2023-08-20"}</td>
                  <td>{"EMP002"}</td>
                  <td>{"Jane Smith"}</td>
                  <td>{"Product Manager"}</td>
                  <td>{"09:30 AM"}</td>
                  <td>{"06:15 PM"}</td>
                  <td>{"30 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>{"2023-08-21"}</td>
                  <td>{"EMP003"}</td>
                  <td>{"Michael Johnson"}</td>
                  <td>{"Sales Executive"}</td>
                  <td>{"08:45 AM"}</td>
                  <td>{"05:30 PM"}</td>
                  <td>{"10 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: "20px" }}>
        <div>
          <h5 className="fw-bold">Branch: Security</h5>
        </div>
        <hr />
        <div className="mb-3">
          <h6 className="fw-bold mb-3">Department: Dept1</h6>
          <div className="table-responsive">
            <table className="table">
              <thead className="table-border">
                <tr>
                  <th scope="col">{"Date"}</th>
                  <th scope="col">{"Employee Code"}</th>
                  <th scope="col">{"Employee Name"}</th>
                  <th scope="col">{"Designation"}</th>
                  <th scope="col">{"In Time"}</th>
                  <th scope="col">{"Out Time"}</th>
                  <th scope="col">{"Late In"}</th>
                  <th scope="col">{"Early Out"}</th>
                  <th scope="col">{"Status"}</th>
                  <th scope="col">{"Action"}</th>
                </tr>
              </thead>
              <tbody style={{ whiteSpace: "nowrap" }}>
                <tr>
                  <td>{"2023-08-19"}</td>
                  <td>{"EMP001"}</td>
                  <td>{"John Doe"}</td>
                  <td>{"Software Engineer"}</td>
                  <td>{"09:00 AM"}</td>
                  <td>{"06:00 PM"}</td>
                  <td>{"15 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>{"2023-08-20"}</td>
                  <td>{"EMP002"}</td>
                  <td>{"Jane Smith"}</td>
                  <td>{"Product Manager"}</td>
                  <td>{"09:30 AM"}</td>
                  <td>{"06:15 PM"}</td>
                  <td>{"30 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>{"2023-08-21"}</td>
                  <td>{"EMP003"}</td>
                  <td>{"Michael Johnson"}</td>
                  <td>{"Sales Executive"}</td>
                  <td>{"08:45 AM"}</td>
                  <td>{"05:30 PM"}</td>
                  <td>{"10 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
           
          </div>
        </div>

        <div className="mb-3">
          <h6 className="fw-bold mb-3">Department: Dept2</h6>
          <div className="table-responsive">
            <table className="table">
              <thead className="table-border">
                <tr>
                  <th scope="col">{"Date"}</th>
                  <th scope="col">{"Employee Code"}</th>
                  <th scope="col">{"Employee Name"}</th>
                  <th scope="col">{"Designation"}</th>
                  <th scope="col">{"In Time"}</th>
                  <th scope="col">{"Out Time"}</th>
                  <th scope="col">{"Late In"}</th>
                  <th scope="col">{"Early Out"}</th>
                  <th scope="col">{"Status"}</th>
                  <th scope="col">{"Action"}</th>
                </tr>
              </thead>
              <tbody style={{ whiteSpace: "nowrap" }}>
                <tr>
                  <td>{"2023-08-19"}</td>
                  <td>{"EMP001"}</td>
                  <td>{"John Doe"}</td>
                  <td>{"Software Engineer"}</td>
                  <td>{"09:00 AM"}</td>
                  <td>{"06:00 PM"}</td>
                  <td>{"15 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>{"2023-08-20"}</td>
                  <td>{"EMP002"}</td>
                  <td>{"Jane Smith"}</td>
                  <td>{"Product Manager"}</td>
                  <td>{"09:30 AM"}</td>
                  <td>{"06:15 PM"}</td>
                  <td>{"30 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>{"2023-08-21"}</td>
                  <td>{"EMP003"}</td>
                  <td>{"Michael Johnson"}</td>
                  <td>{"Sales Executive"}</td>
                  <td>{"08:45 AM"}</td>
                  <td>{"05:30 PM"}</td>
                  <td>{"10 minutes"}</td>
                  <td>{"N/A"}</td>
                  <td>{"Present"}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default DateWiseAttendance;
