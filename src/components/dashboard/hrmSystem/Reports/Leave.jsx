import React from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const Leave = () => {
    return (
        <>
            <Breadcrumb parent="HRM System" title="Employee Leave Reports"/>
            <div className="card" style={{padding: "20px"}}>
                <CommonSearchComponet/>
                <div className="table-responsive">
                    <table className="table">
                        <thead className=" table-border">
                        <tr>
                            <th scope="col">{"Employee"}</th>
                            <th scope="col">{"Casual Leave"}</th>
                            <th scope="col">{"Sick Leave"}</th>
                            <th scope="col">{"Absent"}</th>
                            <th scope="col">{"Compensatory off"}</th>
                            <th scope="col">{"Total"}</th>
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

export default Leave;