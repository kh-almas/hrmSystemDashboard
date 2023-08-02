import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const Supplier = () => {
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Supplier" />
      <div className="d-flex justify-content-between align-items-center pb-3">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "",
            marginBottom: "20px",
          }}
        >
          <button className="btn btn-pill btn-info btn-air-info btn-air-info">
            New Sale
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
                <table className="table ">
                  <thead className="table-light table-border ">
                    <tr className="">
                      <th scope="col">{"Sl"}</th>
                      <th scope="col">{"Ccntact ID"}</th>
                      <th scope="col">{"Supplier Name"}</th>
                      <th scope="col">{"Email"}</th>
                      <th scope="col">{"Phone"}</th>
                      <th scope="col">{"Pay Term"}</th>
                      <th scope="col">{"Tex Number"}</th>
                      <th scope="col">{"Active"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"1"}</td>
                      <td>{"SUP-200002"}</td>
                      <td>{"Supplier-01"}</td>
                      <td>{"Super admin"}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{"Months"}</td>
                      <td className="text-success">{"Approved"}</td>
                      <td>
                        <button
                          class="btn btn-pill btn-outline-info btn-xs p-1 px-4"
                          type="button"
                        >
                          Select
                        </button>
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

export default Supplier;
