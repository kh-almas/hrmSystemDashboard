import React from "react";
import Breadcrumb from "../../common/breadcrumb";
import FilesComponent from "../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";
import ChartOfAccountsData from "./ChartOfAccountsData";

const ChartOfAccounts = () => {
  return (
    <div>
      <Breadcrumb parent="Dashboard" title="Chart Of Accounts" />
      <div
        style={{ padding: "0px 20px" }}
        className="d-flex justify-content-between align-items-center pb-3"
      >
        <div>
          <button className="btn btn-pill btn-info btn-air-info btn-air-info mx-2">
            <i className="fa fa-plus me-2"></i>
            Add New Bank Accounts
          </button>
        </div>
        <FilesComponent />
      </div>
      <div className="card p-20">
        <CommonSearchComponet />
        <table className="table">
          <thead className="table-border">
            <tr>
              <th scope="col">{"TYPE"}</th>
              <th scope="col">{"CODE"}</th>
              <th scope="col">{"NAME"}</th>
              <th scope="col">{"COST CENTER"}</th>
              <th scope="col">{"BALANCE"}</th>
              <th scope="col">{"STATUS"}</th>
              <th scope="col">{"ACTION "}</th>
            </tr>
          </thead>
          <tbody>
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
            <ChartOfAccountsData />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChartOfAccounts;
