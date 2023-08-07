import React from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import FilesComponent from "../../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../../common/salaryCard/CommonSearchComponet";

const ComboProduct = () => {
  return (
    <div>
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
                      <th scope="col">{"Sl"}</th>
                      <th scope="col">{"Image"}</th>
                      <th scope="col">{"Name"}</th>
                      <th scope="col">{"Price"}</th>
                      <th scope="col">{"Regular Price"}</th>
                      <th scope="col">{"Total Product"}</th>
                      <th scope="col">{"Status"}</th>
                      <th scope="col">{"Enable"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr style={{ whiteSpace: "nowrap" }}>
                        <td>{"1"}</td>
                        <td>
                          <img src="" alt="" />
                        </td>
                        <td>{"19 Inch LG TV"}</td>
                        <td>{"hsdsdfds-1"}</td>
                        <td>{"LG"}</td>
                        <td>{"19 Inch"}</td>
                        <td>{"$1,000.00"}</td>
                        <td>{"$1,300.00"}</td>
                        <td>{"$1,150.00"}</td>
                        <td>{"90"}</td>
                        <td>{"Supplier-01	"}</td>
                        <td>{"Single"}</td>
                        <td>{"TV"}</td>
                        <td>{"20 pcs"}</td>
                        <td>
                          <button
                            class="btn btn-pill btn-outline-info btn-xs p-1 px-4"
                            type="button"
                          >
                            Select
                          </button>
                        </td>
                      </tr> */}
                  </tbody>
                </table>
                <p className="text-center text-bold text-secondary m-t-15">
                  No Data Abailable
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ fontSize: "13px" }}>Showing page 1 of 1</p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-pill btn-outline-secondary btn-xs m-10"
                  type="button"
                >
                  <i
                    style={{ fontSize: "24px" }}
                    className="icofont icofont-swoosh-left"
                  ></i>
                </button>
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

export default ComboProduct;
