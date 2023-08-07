import React, { useState } from "react";
import Breadcrumb from "../../../common/breadcrumb";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import Submitbtn from "../../../common/button/Submitbtn";
import { useForm } from "react-hook-form";
const MakeATransfer = () => {
  const [type, setType] = useState("Cash Transfer");

  const handleTypeChange = (type) => {
    setType(type);
  };
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
      <>
        <Breadcrumb parent="Inventory management" title="Make A Transfer" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        ></div>

        <div className="card p-30">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row row-cols-1 row-cols-lg-2 ">
              {type === "Cash Transfer" || type === "Bank Transfer" ? (
                <div>
                  <Input
                    labelName={"Date"}
                    inputName={"date"}
                    inputType={"date"}
                    validation={{
                      ...register("date", { required: true }),
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              <div>
                <label
                  style={{ color: "#8990b6", fontSize: "16px" }}
                  htmlFor="exampleFormControlSelect9"
                >
                  Payment From
                </label>
                <select
                  onChange={(e) => handleTypeChange(e.target.value)}
                  style={{ fontSize: "16px" }}
                  name="payment from"
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option value="Cash Transfer">Cash Transfer</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              {type === "Cash Transfer" || type === "Bank Transfer" ? (
                <div>
                  <Input
                    labelName={"Narration"}
                    inputName={"narration"}
                    inputType={"text"}
                    placeholder={"Narration"}
                    validation={{
                      ...register("narration", { required: true }),
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              {type === "Cash Transfer" || type === "Bank Transfer" ? (
                <div>
                  <Select
                    name={"payment-from-account"}
                    labelName={"Payment From Account*"}
                    placeholder={"Select a option"}
                    options={["Cash-Account", "Main Branch Cash"]}
                  />
                </div>
              ) : (
                ""
              )}
              {type === "Cash Transfer" || type === "Bank Transfer" ? (
                <div>
                  <Select
                    name={"payment-to"}
                    labelName={"Payment To*"}
                    placeholder={"Select a option"}
                    options={["Main Branch Cash"]}
                  />
                </div>
              ) : (
                ""
              )}
              {type === "Cash Transfer" || type === "Bank Transfer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Amount*"}
                      inputName={"amount"}
                      inputType={"text"}
                      placeholder={"Amount"}
                      validation={{
                        ...register("amount", { required: true }),
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              {type === "Bank Transfer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Cheque Number *"}
                      inputName={"cheque_number"}
                      inputType={"text"}
                      placeholder={"Cheque Number"}
                      validation={{
                        ...register("cheque_number", { required: true }),
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              {type === "Bank Transfer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Cheque Date*"}
                      inputName={"cheque_date"}
                      inputType={"date"}
                      placeholder={"Cheque Date"}
                      validation={{
                        ...register("cheque_date", { required: true }),
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}{" "}
              {type === "Bank Transfer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Bank Name*"}
                      inputName={"bank-name"}
                      inputType={"text"}
                      placeholder={"Bank Name"}
                      validation={{
                        ...register("bank-name", { required: true }),
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}{" "}
              {type === "Bank Transfer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Bank Branch*"}
                      inputName={"bank-branch"}
                      inputType={"text"}
                      placeholder={"Bank Branch"}
                      validation={{
                        ...register("bank-branch", { required: true }),
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <Submitbtn name={"Save"} />

            <div className="row row-cols-1 row-cols-lg-1 ">
              {type === "Cash Transfer" || type === "Bank Transfer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Total Amount*"}
                      inputName={"total-amount"}
                      inputType={"text"}
                      placeholder={"Total Amount"}
                      validation={{
                        ...register("total-amount", { required: true }),
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default MakeATransfer;
