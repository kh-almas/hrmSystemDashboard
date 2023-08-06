import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Editbtn from "../../../common/button/Editbtn";

const SetSalary = () => {
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Employee Salary" />
      <div className="container-fluid dark-sidebar-body-mix">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-border">
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
                      <td>{"#EMP0000001"}</td>
                      <td>{"accountant"}</td>
                      <td>{""}</td>
                      <td>{"0.66$"}</td>
                      <td>{""}</td>
                      <td>
                        <Editbtn />
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
