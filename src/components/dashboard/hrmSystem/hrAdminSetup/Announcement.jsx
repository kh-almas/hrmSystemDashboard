import React from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const Announcement = () => {
    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Announcement" />
            <div className="card" style={{ padding: "20px" }}>
                <CommonSearchComponet />
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">{"Title"}</th>
                            <th scope="col">{"Start Date"}</th>
                            <th scope="col">{"End Date"}</th>
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

export default Announcement;