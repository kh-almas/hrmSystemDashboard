import React from "react";
import Paginationbtn from "../../../common/Paginationbtn";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import Breadcrumb from "../../../common/breadcrumb";

const ProductInformation = () => {
  return (
    <>
      <Breadcrumb parent="Inventory management" title="Product Information" />
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
        ></div>

        <FilesComponent />
      </div>
      <div className="card mb-0" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className=" table-border">
              <tr>
                <th scope="col">{"Sl"}</th>
                <th scope="col">{"Image"}</th>
                <th scope="col">{"Name"}</th>
                <th scope="col">{"Sku"}</th>
                <th scope="col">{"In Stock"}</th>
                <th scope="col">{"Purchase Price"}</th>
                <th scope="col">{"Selling Price"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"1"}</td>
                <td>
                  <img src="" alt="" />
                </td>
                <td>{"19 Inch LG TV"}</td>
                <td>{"hsdsdfds-1"}</td>
                <td>{"90 pcs"}</td>
                <td>{"$ 90,500.40"}</td>
                <td>{"$ 117,000.00"}</td>
              </tr>
              <tr>
                <td className="fw-bold">{"Total"}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{"hsdsdfds-1"}</td>
                <td>{"90 pcs"}</td>
                <td>{"$ 90,500.40"}</td>
                <td>{"$ 117,000.00"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Paginationbtn />
    </>
  );
};

export default ProductInformation;
