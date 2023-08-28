import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../../../axios";
import imageUploader from "../../../../utilitis/imageUploader/imageUploader";
import Breadcrumb from "../../../common/breadcrumb";
import Submitbtn from "../../../common/button/Submitbtn";
import CkEditorComponent from "../../../common/modal/CkEditorComponent";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";

const AddContacts = () => {
  const [type, setType] = useState("Supplier");
  const [content, setContent] = useState();
  const navigate = useNavigate();

  const handleTypeChange = (type) => {
    setType(type);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.note = content;

    const image = await imageUploader(data.image[0]);

    const postData = { ...data };
    postData.image = image;
    postData.pc_address = "127.0.0.1";

    const res = await axios.post(
      "/inventory-management/contacts/add-contact",
      postData
    );
    console.log(res);
    navigate(
      `/dashboard/inventory-management/contacts/view-contacts/${res?.data?.body?.data?.insertId}`
    );
  };

  return (
    <>
      <Breadcrumb parent="Inventory management" title="Add Contact" />
      <div className="card p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row row-cols-1 row-cols-lg-3 ">
            <div>
              <label
                style={{ fontSize: "14px" }}
                htmlFor="exampleFormControlSelect9"
              >
                Product-Type
              </label>
              <select
                onChange={(e) => handleTypeChange(e.target.value)}
                style={{ fontSize: "13px" }}
                name="product-type"
                className="form-control digits"
                id="exampleFormControlSelect9"
                {...register("contact_type", { required: true })}
              >
                <option value="Supplier">Supplier</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
            {type === "Supplier" || type === "Customer" ? (
              <div>
                <Input
                  labelName={"Name"}
                  inputName={"name"}
                  inputType={"text"}
                  placeholder={"Name"}
                  validation={{
                    ...register("name", { required: true }),
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {type === "Supplier" || type === "Customer" ? (
              <div>
                <Input
                  labelName={"Profile Picture"}
                  inputName={"profilePicture"}
                  inputType={"file"}
                  placeholder={"Profile Picture"}
                  validation={{
                    ...register("image", { required: true }),
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
                    placeholder={"Business Name"}
                    inputType={"text"}
                    validation={{
                      ...register("business_name", { required: true }),
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
                      ...register("tax_number", { required: true }),
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
                    placeholder={"Openning Balance"}
                    validation={{
                      ...register("opening_balance", { required: true }),
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
                    placeholder={"Pay Term"}
                    validation={{
                      ...register("pay_term", { required: true }),
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
                    validation={{
                      ...register("pay_term_condition", { required: true }),
                    }}
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
                    validation={{
                      ...register("email", { required: true }),
                    }}
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
                    validation={{
                      ...register("mobile", { required: true }),
                    }}
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
                    placeholder={"Alternate Contact No"}
                    validation={{
                      ...register("alternate_contact_no", { required: true }),
                    }}
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
                    validation={{
                      ...register("country", { required: true }),
                    }}
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
                    validation={{
                      ...register("state", { required: true }),
                    }}
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
                    validation={{
                      ...register("city", { required: true }),
                    }}
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
                  placeholder={"Address"}
                  validation={{ ...register("address", { required: true }) }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row row-cols-1 row-cols-lg-1 mb-2">
            <CkEditorComponent
              content={content}
              setContent={setContent}
              label={"Note"}
            />
          </div>
          <Submitbtn name={"Add Contact"} />
        </form>
      </div>
    </>
  );
};

export default AddContacts;
