import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../../axios";
import imageUploader from "../../../../utilitis/imageUploader/imageUploader";
import Breadcrumb from "../../../common/breadcrumb";
import Submitbtn from "../../../common/button/Submitbtn";
import CkEditorComponent from "../../../common/modal/CkEditorComponent";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";

const EditContact = () => {
  const [item, setItem] = useState({});
  const [type, setType] = useState("Supplier");
  const [content, setContent] = useState();
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const getItem = async () => {
      try {
        const item = await axios.get(
          `inventory-management/contacts/${params.id}`
        );
        console.log(item);
        setItem(item?.data?.body?.contact);
        setContent(item?.data?.body?.contact?.note);
        setImageUrl(item?.data?.body?.contact?.image);
        reset();
      } catch (err) {
        console.log(err);
      }
    };
    getItem();
  }, [params.id, reset]);

  const handleTypeChange = (type) => {
    setType(type);
  };

  const onSubmit = async (data) => {
    data.note = content;

    const image = await imageUploader(data.image[0]);

    const postData = { ...data };
    postData.image = image;
    postData.pc_address = "127.0.0.1";
    console.log("gg", postData);

    const res = await axios.put(
      `inventory-management/contacts/update-contact/${params.id}`,
      postData
    );
    console.log(res);
    navigate(
      `/dashboard/inventory-management/contacts/view-contacts/${params?.id}`
    );
  };

  return (
    <>
      <Breadcrumb parent="Inventory management" title="Edit Contact" />
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
                defaultValue={item?.contact_type}
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
                  defaultValue={item?.name}
                />
              </div>
            ) : (
              ""
            )}
            {type === "Supplier" || type === "Customer" ? (
              <div>
                {imageUrl ? (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <label>Image</label>
                    <div
                      style={{ display: "flex", position: "relative" }}
                      onMouseOver={() => setShow(true)}
                      onMouseOut={() => setShow(false)}
                    >
                      <img
                        src={imageUrl}
                        alt="profile"
                        width="60"
                        height="60"
                        className="rounded-circle"
                      />
                      {show && (
                        <button
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            border: "0",
                            backgroundColor: "transparent",
                          }}
                          onClick={() => setImageUrl("")}
                        >
                          <i
                            style={{ color: "red" }}
                            className="fa fa-times"
                          ></i>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <Input
                    labelName={"Profile Picture"}
                    inputName={"profilePicture"}
                    inputType={"file"}
                    placeholder={"Profile Picture"}
                    validation={{
                      ...register("image", { required: true }),
                    }}
                  />
                )}
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
                    defaultValue={item?.business_name}
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
                    defaultValue={item?.tax_number}
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
                    defaultValue={item?.opening_balance}
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
                    defaultValue={item?.pay_term}
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
                    defaultValue={item?.pay_term_condition}
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
                    defaultValue={item?.email}
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
                    placeholder={"Credit Limit"}
                    validation={{
                      ...register("credit_limit", { required: true }),
                    }}
                    defaultValue={item?.credit_limit}
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
                    defaultValue={item?.mobile}
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
                    defaultValue={item?.alternate_contact_no}
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
                    defaultValue={item?.country}
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
                    defaultValue={item?.state}
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
                    defaultValue={item?.city}
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
                  defaultValue={item?.address}
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
          <Submitbtn name={"Update Contact"} />
        </form>
      </div>
    </>
  );
};

export default EditContact;
