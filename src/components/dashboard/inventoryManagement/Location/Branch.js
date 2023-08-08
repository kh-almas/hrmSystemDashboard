import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import { Link } from "react-router-dom";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../common/Paginationbtn";
import Dropdownbtn from "../../../common/button/Dropdownbtn";

const Branch = () => {
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Branch List" />
      <div
        style={{ padding: "0px 20px" }}
        className="d-flex justify-content-between align-items-center pb-3"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "",
            marginBottom: "20px",
          }}
        >
          <button className="btn btn-pill btn-info btn-air-info btn-air-info">
            <Link
              className="btn btn-pill btn-info btn-air-info btn-air-info mx-2"
              to="/dashboard/hrm/add-product"
            >
              Add New Branch
            </Link>
          </button>
        </div>

        <FilesComponent />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive ">
                <table className="table">
                  <thead className=" table-border">
                    <tr className="">
                      <th scope="col">{"Id"}</th>
                      <th scope="col">{"Name"}</th>
                      <th scope="col">{"Address"}</th>
                      <th scope="col">{"Email"}</th>
                      <th scope="col">{"Phone"}</th>
                      <th scope="col">{"Status"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"1"}</td>
                      <td>{"Main Brnch"}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td className="badge text-bg-success">{"Active"}</td>
                      <td>
                        <Dropdownbtn />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Paginationbtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branch;
