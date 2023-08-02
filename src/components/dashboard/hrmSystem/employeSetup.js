import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../common/breadcrumb";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";

const EmployeSetup = () => {
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Employee" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-light table-border">
                    <tr>
                      <th scope="col">{"EMPLOYEE ID"}</th>
                      <th scope="col">{"NAME"}</th>
                      <th scope="col">{"EMAIL"}</th>
                      <th scope="col">{"BRANCH"}</th>
                      <th scope="col">{"DEPARTMENT"}</th>
                      <th scope="col">{"DESIGMATION"}</th>
                      <th scope="col">{"DATE OF JOINING"}</th>
                      <th scope="col">{"LAST LOGIN"}</th>
                      <th scope="col">{"ACTION"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{"#EMP0000001"}</th>
                      <td>{"accountant"}</td>
                      <td>{"accountant@example.com"}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>
                        <Link to="/dashboard/hrm/edit">
                          <i className="icofont icofont-pencil-alt-5 custom-div rounded m-r-15 p-2"></i>
                        </Link>
                        <Link to="/dashboard/hrm/employee">
                          {" "}
                          <i
                            style={{
                              backgroundColor: "#ff3a6e",
                              color: "#ffffff",
                            }}
                            className="icofont icofont-trash rounded p-2"
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

export default EmployeSetup;
