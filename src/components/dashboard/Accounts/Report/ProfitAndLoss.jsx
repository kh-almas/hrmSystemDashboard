import React from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import Input from "../../../common/modal/Input";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const ProfitAndLoss = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumb parent="Accounts" title="Profit & Loss" />
      <h4>Select Criteria</h4>
      <div className="card p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6 col-sm-1">
              <Input
                labelName={"DATE FROM"}
                inputName={"start_from"}
                inputType={"date"}
                validation={{ ...register("start_from", { required: true }) }}
              />
            </div>
            <div className="col-lg-6 col-sm-1">
              <Input
                labelName={"DATE TO"}
                inputName={"start_to"}
                inputType={"date"}
                validation={{ ...register("start_to", { required: true }) }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginTop: "20px",
            }}
          >
            <button className="btn btn-pill btn-info btn-air-info btn-air-info">
              <i className="fa fa-search" style={{ marginRight: "5px" }}></i>
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-between align-items-center pb-3 p-10">
        <div>
          <h4>Profit & Loss</h4>
        </div>
        <FilesComponent />
      </div>
      <div className="card p-30">
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className="table-border">
              <tr>
                <th scope="col">{"TIME "}</th>
                <th scope="col">{"INCOME "}</th>
                <th scope="col">{"INCOME "}</th>
                <th scope="col">{"PROFIT / LOSS "}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"all"}</td>
                <td>{"$ 19,000,.00"}</td>
                <td>{"$ 5,500,.00"}</td>
                <td>{"$ 13,500,.00"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfitAndLoss;
