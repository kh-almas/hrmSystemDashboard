import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const DateWiseAttendance = () => {
    const [modal, setModal] = useState();


    const toggle = () => {
        setModal(!modal);
    };
    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Date Wise Attendance"/>
            <div className="card" style={{padding: "20px"}}>
                <div className="row">
                    <div className="col-sm-12 col-xl-6">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Date</label>
                                <input className="form-control" required={true} type="date"/>
                            </div>
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Branch</label>
                                <select className="form-control digits" id="exampleFormControlSelect9" defaultValue="1">
                                    <option>{"Select branch"}</option>
                                    <option>{"accountant branch"}</option>
                                    <option>{"accountant branch"}</option>
                                    <option>{"other branch"}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-6">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Department</label>
                                <select className="form-control digits" id="exampleFormControlSelect9" defaultValue="1">
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
                <CommonSearchComponet/>
                <div className="table-responsive">
                    <table className="table">
                        <thead className=" table-border">
                        <tr>
                            <th scope="col">{"Employee"}</th>
                            <th scope="col">{"Date"}</th>
                            <th scope="col">{"Status"}</th>
                            <th scope="col">{"Clock In"}</th>
                            <th scope="col">{"Clock Out"}</th>
                            <th scope="col">{"Late"}</th>
                            <th scope="col">{"Early Leaving"}</th>
                            <th scope="col">{"Overtime"}</th>
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
                    <td></td>
                    <td></td>
                  </tr> */}
                        </tbody>
                    </table>
                    <p className="text-center p-t-10">No entries found</p>
                </div>
                <p>Showing 1 to 1 of 1 entries</p>
            </div>


        </>
    );
};

export default DateWiseAttendance;