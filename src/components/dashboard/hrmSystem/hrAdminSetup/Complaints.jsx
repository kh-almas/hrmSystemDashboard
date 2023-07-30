import React from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const Complaints = () => {
    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Complain" />
            <div className="card" style={{ padding: "20px" }}>
                <CommonSearchComponet />
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">{"Complaint From"}</th>
                            <th scope="col">{"Complaint Against"}</th>
                            <th scope="col">{"Title"}</th>
                            <th scope="col">{"Complaint Date"}</th>
                            <th scope="col">{"Description"}</th>
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
              </tr> */}
                        </tbody>
                    </table>
                    <p className="text-center p-t-10">No entries found</p>
                </div>
            </div>
        </>
    );
};

export default Complaints;