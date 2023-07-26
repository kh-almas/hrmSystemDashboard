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
            <div className="card" style={{padding: "20px"}}>
              <CommonSearchComponet />
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{"Employee ID"}</th>
                      <th scope="col">{"Name"}</th>
                      <th scope="col">{"Email"}</th>
                      <th scope="col">{"Branch"}</th>
                      <th scope="col">{"Department"}</th>
                      <th scope="col">{"Designation"}</th>
                      <th scope="col">{"Date Of Joining"}</th>
                      <th scope="col">{"Last Login"}</th>
                      <th scope="col">{"Action"}</th>
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
                      <Link to="/dashboard/hrm/edit" className="btn btn-pill btn-outline-light btn-xs txt-dark">edit</Link>
                      <button className="btn btn-pill btn-outline-light btn-xs txt-dark">delete</button>
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
