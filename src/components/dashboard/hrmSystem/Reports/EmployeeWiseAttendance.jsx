import React from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const EmployeeWiseAttendance = () => {
    return (
        <>
            <Breadcrumb parent="HRM System" title="Employee Wise Attendance Reports"/>
            <div className="card" style={{padding: "20px"}}>
                <CommonSearchComponet/>
                <div className="table-responsive">
                    <table className="table">
                        <thead className=" table-border">
                        <tr>
                            <th scope="col">{"Day"}</th>
                            <th scope="col">{"In Time"}</th>
                            <th scope="col">{"Out Time"}</th>
                            <th scope="col">{"Total Hours"}</th>
                            <th scope="col">{"Total Planed Hours"}</th>
                            <th scope="col">{"Variance Hours"}</th>
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
                    <td>{""}</td>
                    <td></td>
                  </tr> */}
                        </tbody>
                    </table>
                    <p className="text-center p-t-10 table-text">No entries found</p>
                </div>
            </div>
        </>
    );
};

export default EmployeeWiseAttendance;