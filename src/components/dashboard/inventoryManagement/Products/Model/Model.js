import React from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import FilesComponent from "../../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../../common/salaryCard/CommonSearchComponet";
import Dropdownbtn from "../../../../common/button/Dropdownbtn";
const Model = () => {
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Model" />
      <div
        style={{ padding: "0px 18px" }}
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
          <button className="btn btn-pill btn-info btn-air-info btn-air-info mx-2">
            Add Model
          </button>
          <button className="btn btn-pill btn-info btn-air-info btn-air-info">
            Upload Via CSV
          </button>
        </div>

        <FilesComponent />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive">
                <table className="table ">
                  <thead
                    className=" table-border"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <tr className="">
                      <th scope="col">{"Id"}</th>
                      <th scope="col">{"Name"}</th>
                      <th scope="col">{"Description"}</th>
                      <th scope="col">{"Status"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ whiteSpace: "nowrap" }}>
                      <td>{"1"}</td>
                      <td>{"19 Inch"}</td>
                      <td>{"19 Inch"}</td>
                      <td className="text-success">{"Active"}</td>
                      <td>
                        <Dropdownbtn />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ fontSize: "13px" }}>Showing page 1 of 1</p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-pill btn-outline-secondary btn-xs"
                  type="button"
                >
                  <i
                    style={{ fontSize: "24px" }}
                    className="icofont icofont-swoosh-left"
                  ></i>
                </button>

                <p
                  style={{ fontSize: "13px" }}
                  className="p-1 px-2 btn-primary-gradien mt-3 mx-2 rounded text-light"
                >
                  1
                </p>
                <button
                  class="btn btn-pill btn-outline-secondary btn-xs"
                  type="button"
                >
                  <i
                    style={{ fontSize: "24px" }}
                    className="icofont icofont-swoosh-right"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
