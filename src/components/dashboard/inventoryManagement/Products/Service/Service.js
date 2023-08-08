import React from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import FilesComponent from "../../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../../common/Paginationbtn";
import { Link } from "react-router-dom";

const Service = () => {
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Service" />
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
          <Link
              className="btn btn-pill btn-info btn-air-info btn-air-info mx-2"
              to="/dashboard/inventory-management/products/add-product"
          >
            New Product
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
                      <th scope="col">{"Sl"}</th>
                      <th scope="col">{"Image"}</th>
                      <th scope="col">{"Name"}</th>
                      <th scope="col">{"Sku"}</th>
                      <th scope="col">{"Hourly Rate"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td>{"1"}</td>
                      <td>{"24th Jul, 2023"}</td>
                      <td>{"INV-230712"}</td>
                      <td>{"Super admin"}</td>
                      <td>{"	kjdsghddsfbdsf"}</td>
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

export default Service;
