import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const SetSalary = () => {
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Employee Salary" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-light table-border">
                    <tr>
                      <th scope="col">{"Employee ID"}</th>
                      <th scope="col">{"Name"}</th>
                      <th scope="col">{"Payroll Type"}</th>
                      <th scope="col">{"Salary"}</th>
                      <th scope="col">{"Net Salary"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{"#EMP0000001"}</th>
                      <td>{"accountant"}</td>
                      <td>{""}</td>
                      <td>{"0.66$"}</td>
                      <td>{""}</td>
                      <td>
                        <Link to="/dashboard/hrm/salary-details">
                          <i
                            style={{
                              backgroundColor: "skyblue",
                              color: "#ffffff",
                            }}
                            className="icofont icofont-eye-alt rounded m-r-15 p-2"
                          ></i>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="p-l-10 p-t-10">Showing 1 to 1 of 1 entries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetSalary;
