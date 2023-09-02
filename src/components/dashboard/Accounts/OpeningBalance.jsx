import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import Breadcrumb from "../../common/breadcrumb";
import Input from "../../common/modal/Input";
import Select from "../../common/modal/Select";

const OpeningBalance = () => {
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
      <Breadcrumb parent="Accounts" title="Add New Opening Balance" />
      <form onSubmit={handleSubmit(onSubmit)} className="card p-20">
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col">
            <Select
              name={"account"}
              labelName={"ACCOUNT *"}
              placeholder={"Select One"}
              options={["BANK ACCOUNT", "SALES"]}
              validation={{ ...register("account", { required: true }) }}
            />
          </div>
          <div>
            <Input
              labelName={"Date *"}
              inputName={"bankName"}
              inputType={"date"}
              placeholder={"Date"}
              validation={{ ...register("data", { required: true }) }}
            />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2">
          <div>
            <Input
              labelName={"AMOUNT *"}
              inputName={"amount"}
              inputType={"text"}
              placeholder={"AMOUNT"}
              validation={{ ...register("amount", { required: true }) }}
            />
          </div>
          <div className="col">
            <Select
              name={"account_type"}
              labelName={"ACCOUNT TYPE *"}
              placeholder={"Select One"}
              options={["ASSET", "LIABILITY"]}
              validation={{ ...register("account_type", { required: true }) }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Button type="submit" className="me-2">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OpeningBalance;
