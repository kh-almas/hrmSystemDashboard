import React from "react";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../common/Paginationbtn";

const ReceiveYourProduct = () => {
  return (
    <>
      <div className="card mb-0" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className=" table-border">
              <tr>
                <th scope="col">{"NO"}</th>
                <th scope="col">{"Date"}</th>
                <th scope="col">{"Supplier Name"}</th>
                <th scope="col">{"Reference NO"}</th>
                <th scope="col">{"Is Approved"}</th>
                <th scope="col">{"Is Added to Stock"}</th>
                <th scope="col">{"Status"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"1"}</td>
                <td>{"26th Jul, 2023"}</td>
                <td>{"Supplier-01"}</td>
                <td>{""}</td>
                <td>
                  <span class="badge text-bg-success">{"Yes"}</span>
                </td>
                <td>
                  <span class="badge text-bg-success">{"Added To Stock"}</span>
                </td>
                <td>
                  <div role="group" className="mb-0 btn-group">
                    <button className="dropbtn btn-round btn btn-primary">
                      Primary Button
                      <span>
                        <i className="icofont icofont-arrow-down"></i>
                      </span>
                    </button>
                    <div
                      tabIndex="-1"
                      role="menu"
                      aria-hidden="true"
                      className="dropdown-content dropdown-menu"
                    >
                      <a
                        href="#"
                        tabIndex="0"
                        role="menuitem"
                        className="dropdown-item"
                      >
                        Action
                      </a>
                      <a
                        href="#"
                        tabIndex="0"
                        role="menuitem"
                        className="dropdown-item"
                      >
                        Another Action
                      </a>
                      <a
                        href="#"
                        tabIndex="0"
                        role="menuitem"
                        className="dropdown-item"
                      >
                        Something Else Here
                      </a>
                      <div tabIndex="-1" className="dropdown-divider"></div>
                      <a
                        href="#"
                        tabIndex="0"
                        role="menuitem"
                        className="dropdown-item"
                      >
                        Separated Link
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-center p-t-10">No entries found</p>
        </div>
      </div>
      <Paginationbtn />
    </>
  );
};

export default ReceiveYourProduct;
