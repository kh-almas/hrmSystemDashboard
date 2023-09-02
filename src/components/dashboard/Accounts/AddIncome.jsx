import React from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../common/breadcrumb";
import Submitbtn from "../../common/button/Submitbtn";
import Input from "../../common/modal/Input";
import Select from "../../common/modal/Select";

const AddIncome = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dateObj = new Date();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();
  const shortDate = `${year}-${month}-${day}`;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Breadcrumb parent="Accounts" title="Add New Income" />
      <div className="card p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-2 col-sm-1">
              <Input
                labelName={"DATE*"}
                inputName={"starttime"}
                inputType={"date"}
                validation={{ ...register("starttime", { required: true }) }}
                defaultValue={shortDate}
              />
            </div>
            <div className="col-lg-2 col-sm-1">
              <Input
                labelName={"NARRATION"}
                inputName={"narration"}
                placeholder={"NARRATION"}
                inputType={"text"}
                validation={{ ...register("narration", { required: true }) }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 col-sm-1">
              <Select
                name={"payment"}
                labelName={"PAYMENT FROM *"}
                placeholder={"Select One"}
                options={["BANK ACCOUNT", "SALES"]}
              />
            </div>
            <div className="col-lg-2 col-sm-1">
              <Input
                labelName={"AMOUNT *"}
                inputName={"amount"}
                placeholder={"AMOUNT"}
                inputType={"text"}
                validation={{ ...register("amount", { required: true }) }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Input
                labelName={"TRANSACTION NOTE"}
                inputName={"transnote"}
                placeholder={"TRANSACTION NOTE"}
                inputType={"text"}
                validation={{ ...register("transnote", { required: true }) }}
              />
            </div>
          </div>
          <Submitbtn name={"Save"} />
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
