import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../common/breadcrumb";
import FilesComponent from "../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";

const ExpenseLists = () => {
  return (
    <div>
      <Breadcrumb parent="Accounts" title="Expense Lists" />
      <div
        style={{ padding: "0px 20px" }}
        className="d-flex justify-content-between align-items-center pb-3"
      >
        <div>
          <Link
            to={"/dashboard/accounts/add-expense"}
            className="btn btn-pill btn-info btn-air-info btn-air-info mx-2"
          >
            <i className="fa fa-plus me-2"></i>
            Add Expense
          </Link>
        </div>
        <FilesComponent />
      </div>
      <div className="card p-15">
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className="table-border">
              <tr>
                <th scope="col">{"ID"}</th>
                <th scope="col">{"BRANCH NAME"}</th>
                <th scope="col">{"TXN id"}</th>
                <th scope="col">{"AMOUNT"}</th>
                <th scope="col">{"APPROVED"}</th>
                <th scope="col">{"ACTION "}</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <th scope="row">{""}</th>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td></td>
              </tr> */}
            </tbody>
          </table>
          <p className="text-center p-t-10">No entries found</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseLists;
