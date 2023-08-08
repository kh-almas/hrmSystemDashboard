import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../common/Paginationbtn";
import Select from "../../../common/modal/Select";
import Submitbtn from "../../../common/button/Submitbtn";

const StockList = () => {
  return (
    <div>
      <div>
        <Breadcrumb parent="Inventory management" title="Stock List" />
        <div className="card p-4">
          <form>
            <div className="row row-cols-1 row-cols-lg-4">
              <div>
                <Select
                  name={"branch"}
                  labelName={"Branch"}
                  placeholder={"Select a Branch"}
                  options={["Main Branch"]}
                />
              </div>

              <div>
                <Select
                  name={"select-supplier"}
                  labelName={"Supplier"}
                  placeholder={"Select supplier"}
                  options={["Supplier1"]}
                />
              </div>
              <div>
                <Select
                  name={"brand"}
                  labelName={"Brand"}
                  placeholder={"Select a unit"}
                  options={["LG"]}
                />
              </div>
              <div>
                <Select
                  name={"product"}
                  labelName={"Product"}
                  placeholder={"Select Product"}
                  options={["19 inch LG TV"]}
                />
              </div>
            </div>
            <Submitbtn name={"Search"} />
          </form>
        </div>
      </div>
      <>
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
            <h4 className="mx-2">Stock Report</h4>
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
                  <th scope="col">{"Image"}</th>
                  <th scope="col">{"Name"}</th>
                  <th scope="col">{"Brand"}</th>
                  <th scope="col">{"Sku"}</th>
                  <th scope="col">{"Branch/Warehouse"}</th>
                  <th scope="col">{"Supplier"}</th>
                  <th scope="col">{"In Stock"}</th>
                  <th scope="col">{"Stock Alert"}</th>
                  <th scope="col">{"Purchase Price"}</th>
                  <th scope="col">{"Purchase Value"}</th>
                  <th scope="col">{"Selling Price"}</th>
                </tr>
              </thead>
              <tbody style={{ whiteSpace: "nowrap" }}>
                <tr>
                  <td>{"1"}</td>
                  <td>
                    <img src="" alt="" />
                  </td>
                  <td>{"19 Inch LG TV"}</td>
                  <td>{"LG"}</td>
                  <td>{"hsdsdfds-1"}</td>
                  <td>{"Main Branch"}</td>
                  <td>{"Supplier-01	"}</td>
                  <td>{"90"}</td>
                  <td>{"20"}</td>
                  <td>{"$1,000.00"}</td>
                  <td>{"$90,000.00	"}</td>
                  <td>{"$1,300.00"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Paginationbtn />
      </>
    </div>
  );
};

export default StockList;
