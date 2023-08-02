import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const Sale = () => {
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Sale" />
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

        <div className=" d-flex justify-content-between align-items-center px-3 ">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button class="btn btn-outline-secondary  p-2" type="button">
              <i className="fa fa-files-o "></i>
            </button>
            <button class="btn btn-outline-secondary p-2" type="button">
              <i className="fa fa-file-excel-o"></i>
            </button>
            <button class="btn btn-outline-secondary p-2" type="button">
              <i className="fa fa-file-text"></i>
            </button>
            <button class="btn btn-outline-secondary p-2" type="button">
              <i className="fa fa-file-pdf-o"></i>
            </button>
            <button class="btn btn-outline-secondary p-2" type="button">
              <i className="fa fa-print"></i>
            </button>
            <button class="btn btn-outline-secondary p-2" type="button">
              <i className="fa fa-columns "></i>
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive ">
                <table className="table ">
                  <thead>
                    <tr className="">
                      <th scope="col">{"SL"}</th>
                      <th scope="col">{"DATE"}</th>
                      <th scope="col">{"INVOICE"}</th>
                      <th scope="col">{"USER"}</th>
                      <th scope="col">{"CUSTOMER"}</th>
                      <th scope="col">{"TOTAL AMOUNT"}</th>
                      <th scope="col">{"PAID"}</th>
                      <th scope="col">{"DUE"}</th>
                      <th scope="col">{"STATUS"}</th>
                      <th scope="col">{"ACTION"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"1"}</td>
                      <td>{"24th Jul, 2023"}</td>
                      <td>{"INV-230712"}</td>
                      <td>{"Super admin"}</td>
                      <td>{"	kjdsgh"}</td>
                      <td>{"	$ 6,000.00"}</td>
                      <td>{"	$ 0.00"}</td>
                      <td>{"	$ 6,000.00"}</td>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
