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
          <div className="row row-cols-1 row-cols-lg-3 mb-3 ">
            <div style={{ position: "relative" }}>
              <p
                style={{
                  position: "absolute",
                  left: "280px",
                  cursor: "pointer",
                }}
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
            </div>
            <div>
              <Select
                name={"barcode"}
                labelName={"Barcode Type"}
                placeholder={"Select Barcode"}
                options={["Single", "Varient", "Combo", "Service"]}
              />
            </div>
            <div style={{ position: "relative" }}>
              <p
                style={{
                  position: "absolute",
                  left: "280px",
                  cursor: "pointer",
                }}
                className="text-primary"
              >
                New Brand
                <span>
                  <i className="icofont icofont-plus-circle"></i>
                </span>
              </p>

              <div>
                <Select
                  name={"select-brand"}
                  labelName={"Select Brand"}
                  placeholder={"Select Brand"}
                  options={["LG"]}
                />
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 mb-3">
            <div style={{ position: "relative" }}>
              <p
                style={{
                  position: "absolute",
                  left: "250px",
                  cursor: "pointer",
                }}
                className="text-primary"
              >
                New Category
                <span>
                  <i className="icofont icofont-plus-circle"></i>
                </span>
              </p>

              <div>
                <Select
                  name={"category"}
                  labelName={"Select Category"}
                  placeholder={"Select Category"}
                  options={["TV"]}
                />
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <p
                style={{
                  position: "absolute",
                  left: "250px",
                  cursor: "pointer",
                }}
                className="text-primary"
              >
                Sub Category
                <span>
                  <i className="icofont icofont-plus-circle"></i>
                </span>
              </p>

              <div>
                <Select
                  name={"sub-category"}
                  labelName={"Sub-Category"}
                  placeholder={"Sub Category"}
                  options={["TV"]}
                />
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <p
                style={{
                  position: "absolute",
                  left: "310px",
                  cursor: "pointer",
                }}
                className="text-primary"
              >
                Model
                <span>
                  <i className="icofont icofont-plus-circle"></i>
                </span>
              </p>

              <div>
                <Select
                  name={"model"}
                  labelName={"Model"}
                  placeholder={"Model"}
                  options={["19 Inch"]}
                />
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 mb-2">
            <div>
              <Input
                name={"hsn"}
                labelName={"HSN"}
                inputType={"text"}
                placeholder={"HSN"}
                validation={{ ...register("hsn", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Length"}
                inputName={"length"}
                inputType={"text"}
                placeholder={"Length"}
                validation={{ ...register("length", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Height"}
                inputName={"height"}
                inputType={"text"}
                placeholder={"height"}
                validation={{
                  ...register("height", { required: true }),
                }}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 mb-2">
            <div>
              <Input
                labelName={"Zip Length"}
                inputName={"zip-length"}
                inputType={"text"}
                placeholder={"Zip Length"}
                validation={{ ...register("zip-length", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Flap Length"}
                inputName={"flap-length"}
                inputType={"text"}
                placeholder={"Flap Length"}
                validation={{ ...register("flap-length", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Stitches"}
                inputName={"stitches"}
                inputType={"text"}
                placeholder={"Stitches"}
                validation={{
                  ...register("stitches", { required: true }),
                }}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 mb-2">
            <div>
              <Input
                labelName={"Fabrics"}
                inputName={"fabrics"}
                inputType={"text"}
                placeholder={"Fabrics"}
                validation={{ ...register("Fabrics", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Front Sheet"}
                inputName={"front sheet"}
                inputType={"text"}
                placeholder={"Front Sheet"}
                validation={{ ...register("front sheet", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Wall"}
                inputName={"wall"}
                inputType={"text"}
                placeholder={"Wall"}
                validation={{
                  ...register("wall", { required: true }),
                }}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-3 mb-2">
            <div>
              <Input
                labelName={"Zipper"}
                inputName={"zipper"}
                inputType={"text"}
                placeholder={"Zipper"}
                validation={{ ...register("zipper", { required: true }) }}
              />
            </div>
            <div>
              <Input
                labelName={"Alert Quantity"}
                inputName={"alert quantity"}
                inputType={"text"}
                validation={{
                  ...register("alert quantity", { required: true }),
                }}
              />
            </div>
            <div>
              <Input
                labelName={"Product Image"}
                inputName={"product image"}
                inputType={"file"}
                placeholder={"Product Image"}
                validation={{
                  ...register("product image", { required: true }),
                }}
              />
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-3 mb-2">
            <div>
              <Input
                labelName={"Purchase Price"}
                inputName={"purchase price"}
                inputType={"number"}
                placeholder={"0"}
                validation={{
                  ...register("purchase price", { required: true }),
                }}
              />
            </div>
            <div>
              <Input
                labelName={"Selling Price*"}
                inputName={"purchase price"}
                inputType={"number"}
                placeholder={"0"}
                validation={{
                  ...register("purchase price", { required: true }),
                }}
              />
            </div>
            <div>
              <Input
                labelName={"Min. Selling Price"}
                inputName={"min-selling-price"}
                inputType={"number"}
                placeholder={"0"}
                validation={{
                  ...register("min-selling-price", { required: true }),
                }}
              />
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-3 mb-2">
            <div>
              <Input
                labelName={"Purchase Price"}
                inputName={"purchase price"}
                inputType={"number"}
                placeholder={"0"}
                validation={{
                  ...register("purchase price", { required: true }),
                }}
              />
            </div>
            <div className="d-flex ">
              <Input
                labelName={"Selling Price*"}
                inputName={"purchase price"}
                inputType={"number"}
                placeholder={"0"}
                validation={{
                  ...register("purchase price", { required: true }),
                }}
              />

              <div className="col-md-3 d-flex align-items-center mt-3 text-center mx-4">
                <input
                  className="form-control text-center rounded-4"
                  type="text"
                  name=""
                  placeholder="%"
                  value=""
                  readOnly
                />
              </div>
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
