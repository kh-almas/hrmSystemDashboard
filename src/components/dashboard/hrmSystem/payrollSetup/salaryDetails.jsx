import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import Allowance from "../../../common/salaryCard/Allowance";
import Commission from "../../../common/salaryCard/Commission";
import CreateLoan from "../../../common/salaryCard/CreateLoan";
import Deduction from "../../../common/salaryCard/Deduction";
import Overtime from "../../../common/salaryCard/Overtime";
import Payment from "../../../common/salaryCard/Payment";
import EmploySalary from "../../../common/salaryCard/employSalary";

const SalaryDetails = () => {
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Employee Set Salary" />
      <div className="row">
        <div className="col-sm-12 col-xl-6">
          <EmploySalary />
        </div>
        <div className="col-sm-12 col-xl-6">
          <Allowance />
        </div>
        <div className="col-sm-12 col-xl-6">
          <Commission />
        </div>
        <div className="col-sm-12 col-xl-6">
          <CreateLoan />
        </div>
        <div className="col-sm-12 col-xl-6">
          <Deduction />
        </div>
        <div className="col-sm-12 col-xl-6">
          <Payment />
        </div>
        <div className="col-sm-12 col-xl-6">
          <Overtime />
        </div>
      </div>
    </div>
  );
};

export default SalaryDetails;
