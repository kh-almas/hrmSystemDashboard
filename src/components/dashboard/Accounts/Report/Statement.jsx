import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../../common/breadcrumb";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import StatementData from "./StatementData";

const Statement = () => {
  const [statementData, setStatementData] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setStatementData(true);
  };
  return (
    <div>
      <Breadcrumb parent="Accounts" title="Statement" />
      <div className="card p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-3 col-sm-1">
              <Input
                labelName={"DATE FROM (DATE RANGE)"}
                inputName={"start_from"}
                inputType={"date"}
                validation={{ ...register("start_from", { required: true }) }}
              />
            </div>
            <div className="col-lg-3 col-sm-1">
              <Input
                labelName={"DATE TO (DATE RANGE)"}
                inputName={"start_to"}
                inputType={"date"}
                validation={{ ...register("start_to", { required: true }) }}
              />
            </div>
            <div className="col-lg-3 col-sm-1">
              <Select
                name={"asset"}
                labelName={"TYPE"}
                placeholder={"Asset"}
                options={["Library", "expense", "income", "equity"]}
              />
            </div>
            <div className="col-lg-3 col-sm-1">
              <Select
                name={"payment"}
                labelName={"ACCOUNT"}
                placeholder={"Choose One"}
                options={[
                  "BANK ACCOUNT",
                  "SALES",
                  "Suppler-01",
                  "Suppler-02",
                  "Suppler-03",
                  "Suppler-04",
                  "Suppler-05",
                ]}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
              gap: "30px",
            }}
          >
            <button className="btn btn-pill btn-info btn-air-info btn-air-info">
              <i className="fa fa-search" style={{ marginRight: "5px" }}></i>
              Search
            </button>
            <button
              onClick={() => (reset(), setStatementData(false))}
              className="btn btn-pill btn-info btn-air-info btn-air-info"
            >
              <i className="fa fa-refresh" style={{ marginRight: "3px" }}></i>{" "}
              Reset
            </button>
          </div>
        </form>
      </div>
      {statementData && (
        <div>
          <h4>Transactions</h4>
          <StatementData />
        </div>
      )}
    </div>
  );
};

export default Statement;
