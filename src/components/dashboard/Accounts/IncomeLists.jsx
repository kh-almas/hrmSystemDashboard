import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../common/breadcrumb";
import FilesComponent from "../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";
import IncomeListsData from "./IncomeListsData";

const IncomeLists = () => {
  return (
    <div>
      <Breadcrumb parent="Accounts" title="Income Lists" />
      <div
        style={{ padding: "0px 20px" }}
        className="d-flex justify-content-between align-items-center pb-3"
      >
        <div>
          <Link
            to={"/dashboard/accounts/add-income"}
            className="btn btn-pill btn-info btn-air-info btn-air-info mx-2"
          >
            <i className="fa fa-plus me-2"></i>
            Add Income
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
                <th scope="col">{"ACCOUNT"}</th>
                <th scope="col">{"AMOUNT"}</th>
                <th scope="col">{"NARRATION"}</th>
                <th scope="col">{"DATE"}</th>
                <th scope="col">{"ACTION "}</th>
              </tr>
            </thead>
            <tbody>
              <IncomeListsData />
            </tbody>
          </table>
          {/* <p className="text-center p-t-10">No entries found</p> */}
        </div>
      </div>
    </div>
  );
};

export default IncomeLists;
