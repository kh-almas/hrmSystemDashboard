import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../common/breadcrumb";
import Submitbtn from "../../common/button/Submitbtn";
import Input from "../../common/modal/Input";
import Select from "../../common/modal/Select";

const AddExpense = () => {
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

  //! FAQ
  const [payForms, setPayment] = useState([]);
  const addPayment = () => {
    const newForm = { amount: "", narration1: "" };
    setPayment([...payForms, newForm]);
  };
  const updateAmount = (formIndex, fieldName, value) => {
    const updatedForms = [...payForms];
    updatedForms[formIndex][fieldName] = value;
    setPayment(updatedForms);
  };
  const removeAmount = (formIndex) => {
    const updatedForms = [...payForms];
    updatedForms.splice(formIndex, 1);
    setPayment(updatedForms);
  };
  // console.log("data", payForms);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumb parent="Accounts" title="Add New Expense" />
      <div>
        <form className="card p-30" onSubmit={handleSubmit(onSubmit)}>
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
              <Select
                name={"payment"}
                labelName={"PAYMENT FROM *"}
                placeholder={"Select One"}
                options={["Account for Cash", "Account for Bank"]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 col-sm-1">
              <Input
                labelName={"NARRATION*"}
                inputName={"narration"}
                inputType={"text"}
                validation={{ ...register("narration", { required: true }) }}
                placeholder={"NARRATION"}
              />
            </div>
            <div className="col"></div>
          </div>

          <div
            style={{
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
              marginBottom: "30px",
              marginTop: "20px",
            }}
          >
            <p
              className="text-center m-0 p-t-15 p-b-15"
              style={{ color: "#828bb2" }}
            >
              PLEASE ENTER YOUR DEBIT DETAILS
            </p>
          </div>

          <div className="row">
            <div className="col-lg-3 col-sm-2">
              <Select
                name={"payment"}
                labelName={"PAYMENT TO *"}
                placeholder={"Select One"}
                options={[
                  "SALARY & ALLOWANCE LIST",
                  "COST OF GOODS SOLD",
                  "RETAILER SALES COMMISSION",
                  "DISCOUNT EXPENSE",
                  "EXTRA SALARY ALLOWANCE",
                  "SALER RETURN ACCOUNT",
                  "PACKAGING COST",
                  "OTHER EXPENSE",
                ]}
              />
            </div>
            <div className="col-lg-3 col-sm-2">
              <Input
                labelName={"AMOUNT*"}
                inputName={"amount"}
                inputType={"text"}
                validation={{ ...register("amount", { required: true }) }}
                placeholder={"AMOUNT"}
              />
            </div>
            <div className="col-lg-3 col-sm-2">
              <Input
                labelName={"NARRATION*"}
                inputName={"narration1"}
                inputType={"text"}
                validation={{ ...register("narration1", { required: true }) }}
                placeholder={"NARRATION"}
              />
            </div>
            <div className="col-lg-3 col-sm-2">
              {" "}
              <button
                className="btn btn-pill btn-info btn-air-info btn-air-info"
                onClick={addPayment}
                type="button"
                style={{
                  padding: "5px 7px",
                  borderRadius: "5px",
                  marginTop: "30px",
                }}
              >
                <i
                  className="fa fa-plus"
                  style={{ color: "#fff", marginRight: "3px" }}
                ></i>
                {"ADD"}
              </button>
            </div>

            {/* Render multiple amount forms */}
            {payForms.map((form, index) => (
              <div className="row" key={index}>
                <div className="col-lg-3 col-sm-2">
                  <Select
                    name={"payment"}
                    labelName={"PAYMENT TO *"}
                    placeholder={"Select One"}
                    options={[
                      "SALARY & ALLOWANCE LIST",
                      "COST OF GOODS SOLD",
                      "RETAILER SALES COMMISSION",
                      "DISCOUNT EXPENSE",
                      "EXTRA SALARY ALLOWANCE",
                      "SALER RETURN ACCOUNT",
                      "PACKAGING COST",
                      "OTHER EXPENSE",
                    ]}
                  />
                </div>
                <div className="col-lg-3 col-sm-2">
                  <Input
                    labelName={"AMOUNT*"}
                    inputName={"amount"}
                    inputType={"text"}
                    validation={{ ...register("amount", { required: true }) }}
                    placeholder={"AMOUNT"}
                    onChange={(e) =>
                      updateAmount(index, "amount", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-3 col-sm-2">
                  <Input
                    labelName={"NARRATION*"}
                    inputName={"narration1"}
                    inputType={"text"}
                    validation={{
                      ...register("narration1", { required: true }),
                    }}
                    placeholder={"NARRATION"}
                    onChange={(e) =>
                      updateAmount(index, "narration1", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-3 col-sm-2">
                  {" "}
                  <button
                    className="btn btn-pill btn-info btn-air-info btn-air-info"
                    onClick={() => removeAmount(index)}
                    type="button"
                    style={{
                      padding: "5px 7px",
                      borderRadius: "5px",
                      marginTop: "30px",
                    }}
                  >
                    <i
                      className="fa fa-trash-o"
                      style={{ color: "#fff", marginRight: "5px" }}
                    ></i>
                    {"Delete"}
                  </button>
                </div>
              </div>
            ))}
            <div>
              <div className="row">
                <Input
                  labelName={"TOTAL AMOUNT*"}
                  inputName={"tamount"}
                  inputType={"number"}
                  validation={{ ...register("tamount", { required: true }) }}
                  placeholder={"0"}
                />
              </div>
            </div>
          </div>
          <Submitbtn name="Save" />
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
