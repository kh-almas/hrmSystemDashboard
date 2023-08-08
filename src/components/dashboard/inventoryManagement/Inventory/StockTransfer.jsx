import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../common/Paginationbtn";

const StockTransfer = () => {
  return (
    <>
      <Breadcrumb parent="Inventory management" title="Stock Transfer" />
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
            Transfer Product
          </button>
        </div>

        <FilesComponent />
      </div>
      <div className="card mb-0" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className=" table-border">
              <tr>
                <th scope="col">{"Sl"}</th>
                <th scope="col">{"Date"}</th>
                <th scope="col">{"From"}</th>
                <th scope="col">{"To"}</th>
                <th scope="col">{"Status"}</th>
                <th scope="col">{"Action"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>{"1"}</td>
                <td>{"26th Jul, 2023"}</td>
                <td>{"Supplier-01"}</td>
                <td>{""}</td>
                <td>
                  <span className="badge text-bg-success">{"Yes"}</span>
                </td>
                <td>
                  <span className="badge text-bg-success">
                    {"Added To Stock"}
                  </span>
                </td>
                <td>
                  <div role="group" className="mb-0 btn-group">
                    <button className="dropbtn btn-round btn btn-primary">
                      Select
                      <span>
                        <i className="icofont icofont-arrow-down"></i>
                      </span>
                    </button>
                  </div>
                </td> */}
              </tr>
            </tbody>
          </table>
          <p className="text-center p-t-10">No data available in table</p>
        </div>
      </div>
      <Paginationbtn />
    </>
  );
};

export default StockTransfer;
