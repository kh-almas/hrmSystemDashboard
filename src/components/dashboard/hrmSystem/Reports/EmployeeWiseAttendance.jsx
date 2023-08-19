import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Document, Image, Page, PDFDownloadLink, Text, View} from "@react-pdf/renderer";
import logo from "../../../../assets/images/logo/companyLogo.jpg";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const EmployeeWiseAttendanceReport = () => (
    <Document>
        {/*// style={styles.page style={{ width: '600px'}}}*/}
        <Page size="A4" style={{margin: '10px', padding: '0 20px 0 0', marginRight: '20px'}}>
            <View style={{margin: '10px', padding: '10px',}}>
                <View style={{fontSize: '11px', flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                    <View style={{fontSize: '11px',}}>
                        <Image src={logo} style={{width: "50px",}}/>
                        <View style={{marginTop: "8px"}}>
                            <Text>7/1 (7th Floor), Kabbokash</Text>
                            <Text>Kawran Bazar Rd, Dhaka 1215</Text>
                        </View>
                    </View>
                    <View style={{fontSize: '11px',}}>
                        <Text>Report Date</Text>
                        <Text>17.08.2023</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: "15px"}}>
                    <View>
                        <Text style={{fontSize: '16px', margin: 'auto'}}>Employee Wise Attendance Reports</Text>
                        <Text style={{fontSize: '10px', margin: 'auto', paddingTop: '4px'}}>From: 01 Aug 2023 To: 01 Nov 2023</Text>
                    </View>
                </View>
                <View style={{marginTop: '10px'}}>
                    <Text style={{fontSize: '10px', paddingTop: '4px'}}>Employee Name: ABC</Text>
                    <Text style={{fontSize: '10px', paddingTop: '4px'}}>Employee Code: #abc</Text>
                    <Text style={{fontSize: '10px', paddingTop: '4px'}}>Department: IT</Text>
                    <Text style={{fontSize: '10px', paddingTop: '4px'}}>Branch: Maintenance</Text>
                </View>
                <View style={{marginTop: '10px'}}>
                    <View style={{paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                        <Text>Date</Text>
                        <Text>In Time</Text>
                        <Text>Out Time</Text>
                        <Text>Late In</Text>
                        <Text>Early Out</Text>
                        <Text>Over Time</Text>
                        <Text>Total Hours</Text>
                        <Text>Status</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: "5px"}}>
                        <Text style={{fontSize: '10px', }}>No entries found</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

const EmployeeWiseAttendance = () => {
    const [modal, setModal] = useState();
    const toggle = () => {
        setModal(!modal);
    };
    return (
        <>
            <div className="pt-4 mb-3">
                <div className="d-flex flex-rows justify-content-center">
                    <div>
                        <h3 className="fw-bold">Employee Wise Attendance Reports</h3>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <PDFDownloadLink document={<EmployeeWiseAttendanceReport />} fileName="EmployeeWiseAttendanceReport.pdf" className={"btn btn-primary"}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download now!'
                        }
                    </PDFDownloadLink>
                </div>
            </div>

            <div className="card" style={{padding: "20px"}}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Date From</label>
                        <input className="form-control" required={true} type="date"/>
                    </div>
                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Date To</label>
                        <input className="form-control" required={true} type="date"/>
                    </div>
                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Employee Name</label>
                        <select className="form-control digits" id="exampleFormControlSelect9" defaultValue="1">
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
                                style={{padding: "5px 15px"}}
                            >
                                <i className="fa fa-search"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-lg"
                                style={{padding: "5px 15px", borderRadius: "5px"}}
                            >
                                <i className="fa fa-trash-o"></i>
                            </button>
                            <button
                                onClick={toggle}
                                className="btn btn-primary btn-lg"
                                style={{padding: "5px 15px"}}
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
                        <br/>
                        <input type="file"/>
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

            <div className="card" style={{padding: "20px"}}>
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
                            <thead className=" table-border">
                            <tr>
                                <th scope="col">{"Date"}</th>
                                <th scope="col">{"In Time"}</th>
                                <th scope="col">{"Out Time"}</th>
                                <th scope="col">{"Late In"}</th>
                                <th scope="col">{"Early Out"}</th>
                                <th scope="col">{"Over Time"}</th>
                                <th scope="col">{"Total Hours"}</th>
                                <th scope="col">{"Status"}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* <tr>
                                <td>{""}</td>
                                <td>{""}</td>
                                <td>{""}</td>
                                <td>{""}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr> */}
                            </tbody>
                        </table>
                        <p className="text-center p-t-10">No entries found</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeWiseAttendance;