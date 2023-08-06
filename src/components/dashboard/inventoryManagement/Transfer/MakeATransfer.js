import React, { useState } from "react";
import Breadcrumb from "../../../common/breadcrumb";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import Submitbtn from "../../../common/button/Submitbtn";
import { useForm } from "react-hook-form";
const MakeATransfer = () => {
  const [type, setType] = useState("Supplier");

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
              {type === "Bank Transfer" ? (
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
                  Product-Type
                </label>
                <select
                  onChange={(e) => handleTypeChange(e.target.value)}
                  style={{ fontSize: "16px" }}
                  name="product-type"
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option value="Cash Transfer">Cash Transfer</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              {type === "Supplier" || type === "Customer" ? (
                <div>
                  <Input
                    labelName={"Profile Picture"}
                    inputName={"profilePicture"}
                    inputType={"file"}
                    validation={{
                      ...register("profilePicture", { required: true }),
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              {type === "Supplier" || type === "Customer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Business Name"}
                      inputName={"business-name"}
                      inputType={"text"}
                      validation={{
                        ...register("business-name", { required: true }),
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type === "Supplier" || type === "Customer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Tax Number"}
                      inputName={"tex-number"}
                      inputType={"text"}
                      placeholder={"0"}
                      validation={{
                        ...register("tex-number", { required: true }),
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type === "Supplier" || type === "Customer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Openning Balance"}
                      inputName={"opennibg-balance"}
                      inputType={"text"}
                      validation={{
                        ...register("opennibg-balance", { required: true }),
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type === "Supplier" || type === "Customer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Pay Term"}
                      inputName={"pay-term"}
                      inputType={"text"}
                      validation={{
                        ...register("pay-term", { required: true }),
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type == "Supplier" || type === "Customer" ? (
                <div style={{ position: "relative" }}>
                  <div>
                    <Select
                      name={"pay-term-condition"}
                      labelName={"Pay-Term-Condition"}
                      placeholder={"Select condition"}
                      options={["Days", "Months"]}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type == "Supplier" || type === "Customer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Email"}
                      inputName={"email"}
                      inputType={"email"}
                      placeholder={"Email"}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type == "Customer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Credit Limit"}
                      inputName={"credit limit"}
                      inputType={"text"}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type == "Supplier" || type === "Customer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Mobile"}
                      inputName={"mobile"}
                      inputType={"text"}
                      placeholder={"Mobile"}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type == "Supplier" || type === "Customer" ? (
                <div>
                  <div>
                    <Input
                      labelName={"Alternate Contact No"}
                      inputName={"alternate-contact-no"}
                      inputType={"text"}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type == "Supplier" || type === "Customer" ? (
                <div>
                  <div>
                    <Select
                      name={"country"}
                      labelName={"Country"}
                      placeholder={"Select country"}
                      options={["Bangladesh", "Australia"]}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type == "Supplier" || type === "Customer" ? (
                <div>
                  <div>
                    <Select
                      name={"state"}
                      labelName={"State"}
                      placeholder={"Select State"}
                      options={[""]}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type == "Supplier" || type === "Customer" ? (
                <div>
                  <div>
                    <Select
                      name={"city"}
                      labelName={"City"}
                      placeholder={"Select City"}
                      options={[""]}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {type == "Supplier" || type === "Customer" ? (
                <div>
                  <Input
                    labelName={"Address"}
                    inputName={"address"}
                    inputType={"text"}
                    placeholder={""}
                    validation={{ ...register("address", { required: true }) }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <Submitbtn name={"Save"} />
          </form>
        </div>
      </>
    </div>
  );
};

export default MakeATransfer;
