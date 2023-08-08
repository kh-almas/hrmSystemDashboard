import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import Paginationbtn from "../../../common/Paginationbtn";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

import Dropdownbtn from "../../../common/button/Dropdownbtn";
import Select from "../../../common/modal/Select";
const StockAlertList = () => {
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Stock Alert List" />
      <div className="card p-4 py-4  ">
        <div className=" d-flex align-items-center justify-content-around">
          <h3 style={{ fontSize: "25px", fontWeight: "500" }}>
            Stock Alert List
          </h3>

          <div className="w-25 text-center">
            <Select
              name={"select supplier"}
              placeholder={"Select Supplier"}
              options={["Supplier1"]}
            />
          </div>
        </div>
      </div>

      <div
        style={{ padding: "0px 20px" }}
        className="d-flex justify-content-end align-items-center pb-3"
      >
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
                      <th scope="col">{"No"}</th>
                      <th scope="col">{"Image"}</th>
                      <th scope="col">{"Supplier"}</th>
                      <th scope="col">{"Products"}</th>
                      <th scope="col">{"Model"}</th>
                      <th scope="col">{"Brand"}</th>
                      <th scope="col">{"Current QTY"}</th>
                      <th scope="col">{"Alert QTY"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td>{"1"}</td>
                      <td>{"26th Jul, 2023"}</td>
                      <td>{"Supplier-01"}</td>
                      <td>{"PI-230711"}</td>
                      <td>{"$5,500.00"}</td>
                      <td>{"$ 5,500.00"}</td>
                      <td>{"$ 0.00"}</td>
                      <td className="text-success">{"Yes"}</td>
                      <td>
                        <Dropdownbtn />
                      </td>
                    </tr> */}
                  </tbody>
                </table>
                <p className="text-center p-t-10 text-secondary">
                  No data available in table
                </p>
              </div>
            </div>
            <Paginationbtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAlertList;
