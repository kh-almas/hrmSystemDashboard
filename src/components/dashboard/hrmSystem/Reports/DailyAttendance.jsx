import React, {useState} from 'react';
import {Link} from "react-router-dom";


const DailyAttendance = () => {
    return (
        <>
            <div className="pt-4 mb-3">
                <div className="d-flex flex-rows justify-content-center">
                    <div>
                        <h3 className="fw-bold">Daily Attendance Report</h3>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div>
                        <Link to={"/dashboard/hrm/attendance/daily/pdf"} target="_blank" className="ms-3 btn btn-primary" >View PDF</Link>
                    </div>
                </div>
            </div>
            <div className="card" style={{padding: "20px"}}>
                <div>
                    <h6 className="fw-bold">Branch: Developer</h6>
                </div>
                <hr />
                <div className="mb-3">
                    <h6 style={{fontSize: "13px"}} className="fw-bold mb-3">Department: Dept1</h6>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className=" table-border">
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
                                    <td>2023-08-01</td>
                                    <td>EMP001</td>
                                    <td>John Smith</td>
                                    <td>Manager</td>
                                    <td>09:00</td>
                                    <td>18:00</td>
                                    <td>00:15</td>
                                    <td>00:00</td>
                                    <td>Present</td>
                                </tr>
                                <tr>
                                    <td>2023-08-01</td>
                                    <td>EMP002</td>
                                    <td>Jane Doe</td>
                                    <td>Analyst</td>
                                    <td>09:15</td>
                                    <td>17:30</td>
                                    <td>00:30</td>
                                    <td>00:30</td>
                                    <td>Partial</td>
                                </tr>
                                <tr>
                                    <td>2023-08-01</td>
                                    <td>EMP003</td>
                                    <td>Michael Brown</td>
                                    <td>Clerk</td>
                                    <td>09:30</td>
                                    <td>18:15</td>
                                    <td>01:00</td>
                                    <td>00:15</td>
                                    <td>Present</td>
                                </tr>
                            </tbody>
                        </table>
                        {/*<p className="text-center p-t-10">No entries found</p>*/}
                    </div>
                </div>

                <div className="mb-3">
                    <h6 className="fw-bold mb-3">Department: Dept2</h6>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className=" table-border">
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
                                    <td>2023-08-01</td>
                                    <td>EMP001</td>
                                    <td>John Smith</td>
                                    <td>Manager</td>
                                    <td>09:00</td>
                                    <td>18:00</td>
                                    <td>00:15</td>
                                    <td>00:00</td>
                                    <td>Present</td>
                                </tr>
                                <tr>
                                    <td>2023-08-01</td>
                                    <td>EMP002</td>
                                    <td>Jane Doe</td>
                                    <td>Analyst</td>
                                    <td>09:15</td>
                                    <td>17:30</td>
                                    <td>00:30</td>
                                    <td>00:30</td>
                                    <td>Partial</td>
                                </tr>
                                <tr>
                                    <td>2023-08-01</td>
                                    <td>EMP003</td>
                                    <td>Michael Brown</td>
                                    <td>Clerk</td>
                                    <td>09:30</td>
                                    <td>18:15</td>
                                    <td>01:00</td>
                                    <td>00:15</td>
                                    <td>Present</td>
                                </tr>
                            </tbody>
                        </table>
                        {/*<p className="text-center p-t-10">No entries found</p>*/}
                    </div>
                </div>
            </div>
            <div className="card" style={{padding: "20px"}}>
                <div>
                    <h5 className="fw-bold">Branch: Security</h5>
                </div>
                <hr />
                <div className="mb-3">
                    <h6 className="fw-bold mb-3">Department: Dept1</h6>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className=" table-border">
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
                                <td>2023-08-01</td>
                                <td>EMP001</td>
                                <td>John Smith</td>
                                <td>Manager</td>
                                <td>09:00</td>
                                <td>18:00</td>
                                <td>00:15</td>
                                <td>00:00</td>
                                <td>Present</td>
                            </tr>
                            <tr>
                                <td>2023-08-01</td>
                                <td>EMP002</td>
                                <td>Jane Doe</td>
                                <td>Analyst</td>
                                <td>09:15</td>
                                <td>17:30</td>
                                <td>00:30</td>
                                <td>00:30</td>
                                <td>Partial</td>
                            </tr>
                            <tr>
                                <td>2023-08-01</td>
                                <td>EMP003</td>
                                <td>Michael Brown</td>
                                <td>Clerk</td>
                                <td>09:30</td>
                                <td>18:15</td>
                                <td>01:00</td>
                                <td>00:15</td>
                                <td>Present</td>
                            </tr>
                            </tbody>
                        </table>
                        {/*<p className="text-center p-t-10">No entries found</p>*/}
                    </div>
                </div>

                <div className="mb-3">
                    <h6 className="fw-bold mb-3">Department: Dept2</h6>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className=" table-border">
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
                                <td>2023-08-01</td>
                                <td>EMP001</td>
                                <td>John Smith</td>
                                <td>Manager</td>
                                <td>09:00</td>
                                <td>18:00</td>
                                <td>00:15</td>
                                <td>00:00</td>
                                <td>Present</td>
                            </tr>
                            <tr>
                                <td>2023-08-01</td>
                                <td>EMP002</td>
                                <td>Jane Doe</td>
                                <td>Analyst</td>
                                <td>09:15</td>
                                <td>17:30</td>
                                <td>00:30</td>
                                <td>00:30</td>
                                <td>Partial</td>
                            </tr>
                            <tr>
                                <td>2023-08-01</td>
                                <td>EMP003</td>
                                <td>Michael Brown</td>
                                <td>Clerk</td>
                                <td>09:30</td>
                                <td>18:15</td>
                                <td>01:00</td>
                                <td>00:15</td>
                                <td>Present</td>
                            </tr>
                            </tbody>
                        </table>
                        {/*<p className="text-center p-t-10">No entries found</p>*/}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DailyAttendance;