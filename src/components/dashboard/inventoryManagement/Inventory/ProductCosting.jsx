import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../common/Paginationbtn";

const ProductCosting = () => {
  return (
    <>
      <Breadcrumb
        parent="Inventory management"
        title="Product Costing (Sales)"
      />
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
                <th scope="col">{"Id"}</th>
                <th scope="col">{"Image"}</th>
                <th scope="col">{"Name"}</th>
                <th scope="col">{"Address"}</th>
                <th scope="col">{"Product Name"}</th>
                <th scope="col">{"Previous Stock "}</th>
                <th scope="col">{"Newly Added Stock"}</th>
                <th scope="col">{"Last Costing Price(Unit)"}</th>
                <th scope="col">{"New Costing Price(Unit)"}</th>
              </tr>
            </thead>
            <tbody style={{ whiteSpace: "nowrap" }}>
              <tr>
                <td>{"1"}</td>
                <td>
                  <img src="" alt="" />
                </td>
                <td>{"TV PI-230711"}</td>
                <td>{"Main Branch"}</td>
                <td>{"19 Inch LG TV"}</td>
                <td>{"85"}</td>
                <td>{"5"}</td>
                <td>{"$1,000.00 /pcs"}</td>
                <td>{"$1,005.56 /pcs"}</td>
              </tr>
              <tr>
                <td>{"1"}</td>
                <td>
                  <img src="" alt="" />
                </td>
                <td>{"TV PI-230711"}</td>
                <td>{"Main Branch"}</td>
                <td>{"19 Inch LG TV"}</td>
                <td>{"85"}</td>
                <td>{"5"}</td>
                <td>{"$1,000.00 /pcs"}</td>
                <td>{"$1,005.56 /pcs"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Paginationbtn />
    </>
  );
};

export default ProductCosting;
