import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import { Cast } from "react-feather";


const Jobs = () => {
  return (
    <>
      <Breadcrumb parent="HRM System" title="Manage Job" />
        <div className="row" style={{ paddingBottom: "14px" }}>
            <div className="col-12 col-lg-4 ms-0">
                <div className="card p-4 mb-0 shadow">
                    <div className="d-flex align-items-center">
                        <div class="d-flex  align-items-center w-100">
                            <div className="px-3 pt-3 pb-2 me-2" style={{backgroundColor: "#A14088", color: "#ffffff", borderRadius: "18px"}}>
                                <Cast />
                            </div>
                            <div>
                                <p className="m-0 text-muted">Total</p>
                                <p className="m-0" style={{fontSize: "20px"}}>Jobs</p>
                            </div>
                        </div>
                        <div>
                            <p className="m-0" style={{fontSize: "25px"}}>0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-4 ms-0">
                <div className="card p-4 mb-0 shadow">
                    <div className="d-flex align-items-center">
                        <div class="d-flex  align-items-center w-100">
                            <div className="px-3 pt-3 pb-2 me-2" style={{backgroundColor: "#3EC9D6", color: "#ffffff", borderRadius: "18px"}}>
                                <Cast />
                            </div>
                            <div>
                                <p className="m-0 text-muted">Active</p>
                                <p className="m-0" style={{fontSize: "20px"}}>Jobs</p>
                            </div>
                        </div>
                        <div>
                            <p className="m-0" style={{fontSize: "25px"}}>0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-4 ms-0">
                <div className="card p-4 mb-0 shadow">
                    <div className="d-flex align-items-center">
                        <div class="d-flex  align-items-center w-100">
                            <div className="px-3 pt-3 pb-2 me-2 bg-info" style={{backgroundColor: "#FFA21D", color: "#ffffff", borderRadius: "18px"}}>
                                <Cast />
                            </div>
                            <div>
                                <p className="m-0 text-muted">Inactive</p>
                                <p className="m-0" style={{fontSize: "20px"}}>Jobs</p>
                            </div>
                        </div>
                        <div>
                            <p className="m-0" style={{fontSize: "25px"}}>0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="card" style={{ padding: "20px" }}>
            <CommonSearchComponet />
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light table-border">
                    <tr className="">
                        <th scope="col">{"Branch"}</th>
                        <th scope="col">{"Branch"}</th>
                        <th scope="col">{"DATE"}</th>
                        <th scope="col">{"GIFT"}</th>
                        <th scope="col">{"DESCRIPTION"}</th>
                        <th scope="col">{"ACTION"}</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/*<tr>*/}
                        {/*    <td>{"Branchy"}</td>*/}
                        {/*    <td>{"AWARD"}</td>*/}
                        {/*    <td>{"DATE"}</td>*/}
                        {/*    <td>{"GIFT"}</td>*/}
                        {/*    <td>{"DESCRIPTION"}</td>*/}
                        {/*    <td>{"ACTION"}</td>*/}
                        {/*</tr>*/}
                    </tbody>
                </table>
                <p className="text-center p-t-10">No entries found</p>
            </div>
        </div>
    </>
  );
};

export default Jobs;
