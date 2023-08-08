import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import Paginationbtn from "../../../common/Paginationbtn";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Dropdownbtn from "../../../common/button/Dropdownbtn";
import { Link } from "react-router-dom";

const PurchaseOrder = () => {
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Purchase Order" />
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
          <Link to={`/dashboard/inventory-management/purchase/add-purchase-order`} className="btn btn-pill btn-info btn-air-info btn-air-info">
            New Order
          </Link>
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
                      <th scope="col">{"No"}</th>
                      <th scope="col">{"Date"}</th>
                      <th scope="col">{"Supplier Name"}</th>
                      <th scope="col">{"Invoice No"}</th>
                      <th scope="col">{"Total Amount"}</th>
                      <th scope="col">{"Paid Amount"}</th>
                      <th scope="col">{" Amount"}</th>
                      <th scope="col">{"Due Amount"}</th>
                      <th scope="col">{"Is Approved"}</th>
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
                      <td>
                        {" "}
                        <span className="badge text-bg-success"> {"yes"}</span>
                      </td>
                      <td>
                        <Dropdownbtn />
                      </td>
                    </tr> */}
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

export default PurchaseOrder;
