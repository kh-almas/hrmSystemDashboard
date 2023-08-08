import React from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import FilesComponent from "../../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../../common/Paginationbtn";
import Dropdownbtn from "../../../../common/button/Dropdownbtn";
const Category = () => {
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Category" />
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
          <button className="btn btn-pill btn-info btn-air-info btn-air-info">
            Add Category
          </button>
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
                      <th scope="col">{"Id"}</th>
                      <th scope="col">{"Name"}</th>
                      <th scope="col">{"Code"}</th>
                      <th scope="col">{"Parent"}</th>
                      <th scope="col">{"Description"}</th>
                      <th scope="col">{"Status"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"1"}</td>
                      <td>{"TV"}</td>
                      <td>{"CATE-001"}</td>
                      <td>{"N/A"}</td>
                      <td>{"Television"}</td>
                      <td>
                        {" "}
                        <span className="badge text-bg-success">
                          {" "}
                          {"Active"}
                        </span>
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

export default Category;
