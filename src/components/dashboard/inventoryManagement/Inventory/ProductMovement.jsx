import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../common/Paginationbtn";

const ProductMovement = () => {
  return (
    <>
      <Breadcrumb parent="Inventory management" title="Product Movement" />
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
                <th scope="col">{"Branch/WareHouse"}</th>
                <th scope="col">{"Purpose"}</th>
                <th scope="col">{"Product Name"}</th>
                <th scope="col">{"Quantity"}</th>
                <th scope="col">{"Date"}</th>
                <th scope="col">{"Creadted User"}</th>
                <th scope="col">{"Updated User"}</th>
              </tr>
            </thead>
            <tbody style={{ whiteSpace: "nowrap" }}>
              <tr>
                <td>{"1"}</td>
                <td>{"Main Branch"}</td>
                <td>{"SALES"}</td>
                <td>{"19 Inch LG TV	"}</td>
                <td>{"5"}</td>
                <td>{"24th Jul, 2023"}</td>
                <td>{"Super admin"}</td>
                <td>{"X"}</td>
              </tr>
              <tr>
                <td>{"2"}</td>
                <td>{""}</td>
                <td>{"PURCHASE	"}</td>
                <td>{"19 Inch LG TV	"}</td>
                <td>{"5"}</td>
                <td>{"24th Jul, 2023"}</td>
                <td>{"Super admin"}</td>
                <td>{"Super admin"}</td>
              </tr>
            
            </tbody>
          </table>
        </div>
      </div>
      <Paginationbtn />
    </>
  );
};

export default ProductMovement;
