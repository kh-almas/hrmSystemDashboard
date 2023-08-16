import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const DailyAttendance = () => {
    return (
        <>
            <Breadcrumb parent="HRM System" title="Daily Attendance Reports"/>
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

export default DailyAttendance;