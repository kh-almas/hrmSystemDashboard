import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import Select from "../../../common/modal/Select";
import Input from "../../../common/modal/Input";
import CkEditorComponent from "../../../common/modal/CkEditorComponent";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Textarea from "../../../common/modal/Textarea";
import Submitbtn from "../../../common/button/Submitbtn";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../common/Paginationbtn";

const OpeningStock = () => {
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
      <Breadcrumb parent="Inventory management" title="Opening Stock" />

      <div className="mb-3">
        <h5>Add Opening Stock</h5>
      </div>
      <div className="card p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row row-cols-1 row-cols-lg-2">
            <div>
              <Select
                name={"product"}
                labelName={"Product"}
                placeholder={"Select an option"}
                options={["19 Inch LG TV"]}
              />
            </div>
            <div>
              <Input
                labelName={"Date"}
                inputName={"date"}
                inputType={"date"}
                validation={{ ...register("date", { required: true }) }}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-2">
            <div>
              <Input
                labelName={"STOCK QUANTITY"}
                inputName={"stockquantity"}
                inputType={"text"}
                placeholder={"Enter stock quantity"}
                validation={{
                  ...register("stockquantity", { required: true }),
                }}
              />
            </div>
            <div>
              <Select
                name={"employee"}
                labelName={"Select warehouse or branch"}
                placeholder={"Select an option"}
                options={["Main branch"]}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-2">
            <div>
              <Input
                labelName={"Purchase Price"}
                inputName={"purchaseprice"}
                inputType={"text"}
                placeholder={"Enter purchase price"}
                validation={{
                  ...register("purchaseprice", { required: true }),
                }}
              />
            </div>
            <div>
              <Input
                labelName={"Selling Price"}
                inputName={"sellingprice"}
                inputType={"text"}
                placeholder={"Enter selling price"}
                validation={{ ...register("sellingprice", { required: true }) }}
              />
            </div>
          </div>

          <Submitbtn />
        </form>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h5>Opening Stock List</h5>
        </div>
        <div>
          <FilesComponent />
        </div>
      </div>

      <div className="card mb-0" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className=" table-border">
              <tr>
                <th scope="col">{"Sl"}</th>
                <th scope="col">{"Date"}</th>
                <th scope="col">{"Name"}</th>
                <th scope="col">{"SKU"}</th>
                <th scope="col">{"Model"}</th>
                <th scope="col">{"Brand"}</th>
                <th scope="col">{"Branch"}</th>
                <th scope="col">{"Purchase Price"}</th>
                <th scope="col">{"Selling Price"}</th>
                <th scope="col">{"Stock"}</th>
                <th scope="col">{"Created User"}</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <th scope="row">{""}</th>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td></td>
              </tr> */}
            </tbody>
          </table>
          <p className="text-center p-t-10">No entries found</p>
        </div>
      </div>
      <Paginationbtn />
    </>
  );
};

export default OpeningStock;
