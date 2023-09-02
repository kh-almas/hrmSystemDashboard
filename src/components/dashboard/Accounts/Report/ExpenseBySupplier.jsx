import React from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import Input from "../../../common/modal/Input";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const ExpenseBySupplier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumb parent="Accounts" title="Expense By Supplier" />
      <h4>Select Criteria</h4>
      <div className="card p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-4 col-sm-1">
              <Input
                labelName={"DATE FROM (RANGE)"}
                inputName={"start_from"}
                inputType={"date"}
                validation={{ ...register("start_from", { required: true }) }}
              />
            </div>
            <div className="col-lg-4 col-sm-1">
              <Input
                labelName={"DATE TO (RANGE)"}
                inputName={"start_to"}
                inputType={"date"}
                validation={{ ...register("start_to", { required: true }) }}
              />
            </div>
            <div className="col-lg-4 col-sm-1">
              <button
                className="btn btn-pill btn-info btn-air-info btn-air-info w-100 m-t-30"
                style={{ borderRadius: "5px" }}
              >
                <i className="fa fa-search" style={{ marginRight: "5px" }}></i>
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="d-flex justify-content-between align-items-center pb-3 p-10">
        <div>
          <h4>Expense By Supplier</h4>
        </div>
        <FilesComponent />
      </div>
      <div className="card p-30">
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className="table-border">
              <tr>
                <th scope="col">{"#"}</th>
                <th scope="col">{"SUPPLIER"}</th>
                <th scope="col">{"EXPENSE"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"1"}</td>
                <td>{"Supplier-01"}</td>
                <td>{"$ 5000.00"}</td>
              </tr>
              <tr>
                <td>{"2"}</td>
                <td>{"Supplier-02"}</td>
                <td>{"$ 2000.00"}</td>
              </tr>
              <tr>
                <td>{"Total"}</td>
                <td>{""}</td>
                <td>{"$ 7000.00"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseBySupplier;
