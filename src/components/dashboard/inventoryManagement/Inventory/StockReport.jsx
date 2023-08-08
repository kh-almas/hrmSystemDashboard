import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import Select from "../../../common/modal/Select";
import Submitbtn from "../../../common/button/Submitbtn";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../common/Paginationbtn";

const StockReport = () => {
  return (
    <div>
      <div>
        <Breadcrumb parent="Inventory management" title="Stock Report" />
        <div className="card p-4">
          <form>
            <div className="row row-cols-1 row-cols-lg-3">
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
                  name={"brand"}
                  labelName={"Brand"}
                  placeholder={"Select Brand"}
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
            <h4 className="mx-2">Report</h4>
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
                  <th scope="col">{"Name"}</th>
                  <th scope="col">{"Brand"}</th>
                  <th scope="col">{"Branch/Warehouse"}</th>
                  <th scope="col">{"In Qty"}</th>
                  <th scope="col">{"Out Qty"}</th>
                  <th scope="col">{"Stock"}</th>
                  <th scope="col">{"Purchase"}</th>
                  <th scope="col">{"Purchase Value"}</th>
                  <th scope="col">{"Selling Price"}</th>
                  <th scope="col">{"Selling Value"}</th>
                </tr>
              </thead>
              <tbody style={{ whiteSpace: "nowrap" }}>
                <tr>
                  <td>{"1"}</td>
                  <td>{"19 Inch LG TV"}</td>
                  <td>{"LG"}</td>
                  <td>{"Main Branch"}</td>
                  <td>{"105	"}</td>
                  <td>{"15"}</td>
                  <td>{"90"}</td>
                  <td>{"$1,000.00"}</td>
                  <td>{"$90,000.00	"}</td>
                  <td>{"$1,300.00"}</td>
                  <td>{"$1,700.00"}</td>
                </tr>{" "}
                <tr>
                  <td>{""}</td>
                  <td>{""}</td>
                  <td>{""}</td>
                  <td>{""}</td>
                  <td>{"Total"}</td>
                  <td>{"105"}</td>
                  <td>{"90"}</td>
                  <td>{"$1,000.00"}</td>
                  <td>{"$90,000.00	"}</td>
                  <td>{"$1,300.00"}</td>
                  <td>{"$1,700.00"}</td>
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

export default StockReport;
