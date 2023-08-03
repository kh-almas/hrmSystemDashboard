import React from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import { useForm } from "react-hook-form";
import Select from "../../../../common/modal/Select";
import Input from "../../../../common/modal/Input";
import CkEditorComponent from "../../../../common/modal/CkEditorComponent";
import { Button } from "react-bootstrap";

const AddProduct = () => {
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
      <Breadcrumb parent="Inventory management" title="Add New Product" />
      <div className="card p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row row-cols-1 row-cols-lg-3 mb-3">
            <div>
              <Select
                name={"product-type"}
                labelName={"Product-Type"}
                placeholder={"Select a option"}
                options={["Single", "Varient", "Combo", "Service"]}
              />
            </div>
            <div>
              <Input
                labelName={"Product Name"}
                inputName={"product-name"}
                inputType={"text"}
                validation={{ ...register("product-name", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Product Sku"}
                inputName={"product-sku"}
                inputType={"text"}
                validation={{ ...register("product-sku", { required: true }) }}
              />
            </div>
          </div>
          <div
            style={{ position: "relative" }}
            className="row row-cols-1 row-cols-lg-3 mb-3 "
          >
            <p
              style={{ position: "absolute", left: "280px", cursor: "pointer" }}
              className="text-primary"
            >
              New Unit
              <span>
                <i className="icofont icofont-plus-circle"></i>
              </span>
            </p>

            <div>
              <Select
                name={"select-unit"}
                labelName={"Select Unit"}
                placeholder={"Select a unit"}
                options={["pcs piees(s)", "cft CFT(s)"]}
              />
            </div>
            <div>
              <Select
                name={"barcode"}
                labelName={"Barcode Type"}
                placeholder={"Select Barcode"}
                options={["Single", "Varient", "Combo", "Service"]}
              />
            </div>
            <div>
              <Select
                name={"brand"}
                labelName={"Brand"}
                placeholder={"Select Brand"}
                options={["LG"]}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 mb-3">
            <div>
              <Select
                name={"category"}
                labelName={"Category"}
                placeholder={"Select Category"}
                options={["TV"]}
              />
            </div>
            <div>
              <Select
                name={"sub-category"}
                labelName={"Sub Category"}
                placeholder={"Sub Category"}
                options={["Single"]}
              />
            </div>
            <div>
              <Select
                name={"model"}
                labelName={"Model"}
                placeholder={"Select Model"}
                options={["19 Inch"]}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 mb-2">
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

          <div className="row row-cols-1 row-cols-lg-3 mb-2">
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

          <div className="row row-cols-1 row-cols-lg-3 mb-2">
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

          <div className="row row-cols-1 row-cols-lg-2 mb-2">
            <div>
              <Select
                name={"state"}
                labelName={"State"}
                placeholder={"Select State"}
                options={["India", "Australia"]}
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
          <div className="row row-cols-1 row-cols-lg-1 mb-2">
            <div>
              <Input
                name={"address"}
                labelName={"Address"}
                inputType={"text"}
                validation={{ ...register("name", { required: true }) }}
              />
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-1 mb-2">
            <CkEditorComponent label={"Note"} />
          </div>

          <div className="d-flex justify-content-center">
            <Button
              color=""
              className="me-2 btn btn-pill btn-info btn-air-info btn-info-gradien px-4"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
