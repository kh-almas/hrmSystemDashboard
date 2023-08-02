import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../../common/breadcrumb";
import Select from "../../../modal/Select";
import Input from "../../../modal/Input";
import Textarea from "../../../modal/Textarea";
import { Button} from "reactstrap";

const AddContacts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Breadcrumb parent="Inventory management" title="Add Contact" />
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
          <div className="row row-cols-1 row-cols-lg-3 mb-3">
            <div>
              <Select
                name={"contact-type"}
                labelName={"Contact Type"}
                placeholder={"Select a option"}
                options={["SUPLIER", "CUSTOMER"]}
              />
            </div>
            <div>
              <Input
                labelName={"Name"}
                inputName={"name"}
                inputType={"text"}
                validation={{ ...register("name", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Profile Picture"}
                inputName={"file"}
                inputType={"file"}
                validation={{ ...register("file", { required: true }) }}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 mb-3">
            <div>
              <Input
                name={"businessName"}
                labelName={"Business Name"}
                inputType={"text"}
                validation={{ ...register("businessName", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Tax Number"}
                inputName={"taxNumber"}
                inputType={"text"}
                validation={{ ...register("taxNumber", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Opening Balance"}
                inputName={"opening-balance"}
                inputType={"text"}
                validation={{
                  ...register("opening-balance", { required: true }),
                }}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 mb-3">
            <div>
              <Input
                labelName={"Name"}
                inputName={"name"}
                inputType={"text"}
                validation={{ ...register("name", { required: true }) }}
              />
            </div>
            <div>
              <Select
                name={"contact-type"}
                labelName={"Pay Term Condition"}
                placeholder={"Select a option"}
                options={["Months", "Days"]}
              />
            </div>
            <div>
              <Input
                labelName={"Email"}
                inputName={"email"}
                inputType={"email"}
                validation={{ ...register("email", { required: true }) }}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 mb-3">
            <div>
              <Input
                labelName={"Mobile Number"}
                inputName={"number"}
                inputType={"text"}
                validation={{ ...register("number", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Alternate Cotact No"}
                inputName={"al"}
                inputType={"alternate-number"}
                validation={{
                  ...register("alternate-number", { required: true }),
                }}
              />
            </div>
            <div>
              <Select
                name={"country"}
                labelName={"Country"}
                placeholder={"Select Country"}
                options={["Bangladesh", "India", "Australia"]}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-2">
          <div>
              <Select
                name={"state"}
                labelName={"State"}
                placeholder={"Select State"}
                options={["", "India", "Australia"]}
              />
            </div>
          
            <div>
              <Select
                name={"country"}
                labelName={"Select City"}
                placeholder={"Select City"}
                options={["Dhaka"]}
              />
            </div>
          </div>

          <div>
            <Textarea
              labelName={"Description"}
              inputName={"description"}
              placeholder={"Enter Description"}
              height={"5"}
            />
          </div>

          <div className="d-flex justify-content-end">
            <Button color="" className="me-2">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddContacts;
