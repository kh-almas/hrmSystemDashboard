import React from "react";
import Paginationbtn from "../../../common/Paginationbtn";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Dropdownbtn from "../../../common/button/Dropdownbtn";
const SalesList = () => {
  const checkFunction = () => console.log("it works");
  const data = [
    {
      type: "link",
      url: "#",
      text: "View",
    },
    {
      type: "link",
      url: "#",
      text: "Update",
    },
    {
      type: "link",
      url: "#",
      text: "Delete",
    },
    {
      type: "function",
      url: checkFunction,
      text: "Download",
    },
  ];
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Sales list" />
      <div
        style={{ padding: "0px 20px" }}
        className="d-flex justify-content-end pb-3"
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
                      <th scope="col">{"Sl"}</th>
                      <th scope="col">{"Date"}</th>
                      <th scope="col">{"Invoice No"}</th>
                      <th scope="col">{"User"}</th>
                      <th scope="col">{"Customer"}</th>
                      <th scope="col">{" Amount"}</th>
                      <th scope="col">{"Paid Amount"}</th>
                      <th scope="col">{"Due Amount"}</th>

                      <th scope="col">{"Status"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"1"}</td>
                      <td>{"26th Jul, 2023"}</td>
                      <td>{"INV-230712"}</td>
                      <td>{"Super admin"}</td>
                      <td>{"kjdsgh"}</td>
                      <td>{"$6,000.00"}</td>
                      <td>{"$ 0.00"}</td>
                      <td>{"$6,000.00"}</td>
                      <td>
                        {" "}
                        <span className="badge text-bg-success">
                          {" "}
                          {"Approved"}
                        </span>
                      </td>
                      <td>
                        <Dropdownbtn data={data} />
                      </td>
                    </tr>
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

export default SalesList;
