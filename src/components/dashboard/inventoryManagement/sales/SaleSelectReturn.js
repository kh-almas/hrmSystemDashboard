import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import Submitbtn from "../../../common/button/Submitbtn";
import CkEditorComponent from "../../../common/modal/CkEditorComponent";
import { useForm } from "react-hook-form";

const SaleSelectReturn = () => {
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
      <Breadcrumb parent="Inventory management" title="Sale Return" />
      <div className="card p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row row-cols-1 row-cols-lg-2 ">
            <div>
              <Select
                name={"customer"}
                labelName={"Select Customer"}
                placeholder={"Select Customer"}
                options={["Bijoy", "Almas"]}
              />
            </div>
            <div>
              <Select
                name={"brannch"}
                labelName={"Sale.Select Warehouse or Showroom"}
                placeholder={"Branch"}
                options={["Main Branch(Sale Showroom"]}
              />
            </div>
            <div>
              <Input
                labelName={"Reference No"}
                inputName={"reference-no"}
                inputType={"text"}
                placeholder={"Reference No"}
              />
            </div>{" "}
            <div>
              <Input labelName={"Date"} inputName={"date"} inputType={"date"} />
            </div>
            <div>
              <Input
                labelName={"ATTACH DOCUMENT(PDF,CSV,JPG,PNG,DOC,DOCX,XLXS,ZIP)"}
                inputName={"file"}
                inputType={"file"}
              />
            </div>{" "}
            <div>
              <Input
                labelName={"User"}
                inputName={"user"}
                inputType={"text"}
                placeholder={"User"}
              />
            </div>
          </div>
          <div
            className="table-responsive"
            style={{ padding: "20px 0px", zIndex: "1 !important" }}
          >
            <table className="table ">
              <thead className=" table-border ">
                <tr className="">
                  <th scope="col">{"Product"}</th>
                  <th scope="col">{"Model"}</th>
                  <th scope="col">{"Brand"}</th>
                  <th scope="col">{"Unit Price($)"}</th>
                  <th scope="col">{"Quantity"}</th>
                  <th scope="col">{"Tax (%)"}</th>
                  <th scope="col">{"Discount($)"}</th>
                  <th scope="col">{"SubTotal($)"}</th>
                  <th scope="col">{"Return Quantity"}</th>
                  <th scope="col">{"Return Value ($)"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"19 Inch LG TV"}</td>
                  <td>{"19 Inch"}</td>
                  <td>{"LG"}</td>
                  <td>{"$ 1,200.00"}</td>
                  <td>{"10"}</td>
                  <td>{"0.00"}</td>
                  <td>{"0.00"}</td>
                  <td>{"1,200.00"}</td>
                  <td>
                    {" "}
                    <input
                      className="text-center"
                      type="number"
                      name=""
                      defaultValue="0"
                    />
                  </td>{" "}
                  <td>
                    {" "}
                    <input
                      className="text-center"
                      type="number"
                      name=""
                      defaultValue="0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 my-4">
            <CkEditorComponent label={"Return Note"} />
            <CkEditorComponent label={"Staff Note"} />
          </div>
          <Submitbtn name={"Save"} />
        </form>
      </div>
    </div>
  );
};

export default SaleSelectReturn;
