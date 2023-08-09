import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import CkEditorComponent from "../../../common/modal/CkEditorComponent";
import Submitbtn from "../../../common/button/Submitbtn";
import Deletebtn from "../../../common/button/Deletebtn";
import CencelBtn from "../../../common/button/CencelBtn";
import ResetBtn from "../../../common/button/ResetBtn";
import { toast } from "react-toastify";

const AddPurchaseOrder = () => {
  const [supplier, setSupplier] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleSupplierChange = (supplier) => {
    if (supplier !== "") {
      setSupplier(supplier);
    } else {
      toast.warn("Please provide a supplier");
    }
  };
  const handlePaymentType = (type) => {
    console.log(type);

    if (type !== "") {
      setPaymentMethod(type);
    } else {
      toast.warn("Please choose One Payment Method ");
    }
  };

  return (
    <>
      <h4 className="p-4 ">Add Purchase Order</h4>
      <div className="card p-30">
        {supplier ? <h5 className="pb-3 text-danger">Total Due: $0.00</h5> : ""}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row row-cols-1 row-cols-lg-3 ">
            <div>
              <label
                style={{ fontSize: "14px" }}
                htmlFor="exampleFormControlSelect9"
              >
                Select Supplier*
              </label>
              <select
                style={{ fontSize: "13px" }}
                onChange={(e) => handleSupplierChange(e.target.value)}
                name="supplier"
                className="form-control digits"
                id="exampleFormControlSelect9"
                defaultValue="1"
              >
                <option value="">Select a option</option>
                <option value="Supplier-01">Supplier-01</option>
                <option value="Supplier-02">Supplier-02</option>
              </select>
            </div>
            <div>
              <Select
                name={"branch"}
                labelName={"Select Warehouse Or Branch*"}
                placeholder={"Main Branch"}
                options={["Main Branch"]}
              />
            </div>
            <div>
              <Input
                labelName={"Attach Document (PDF,JPG,PNG,DOC,DOCX,ZIP)"}
                inputName={"document"}
                inputType={"file"}
                placeholder={"Attach Document"}
                validation={{
                  ...register("document", { required: true }),
                }}
              />
            </div>
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
            <div>
              <Input
                labelName={"Shipping Address"}
                inputName={"shipping-address"}
                inputType={"text"}
                placeholder={"Shipping Address"}
                validation={{
                  ...register("shipping-address", { required: true }),
                }}
              />
            </div>
            <div>
              <Input
                labelName={"Reference No"}
                inputName={"reference-no"}
                inputType={"text"}
                placeholder={"Reference-No"}
                validation={{
                  ...register("reference-no", { required: true }),
                }}
              />
            </div>
            <div>
              <Input
                labelName={"Lc No."}
                inputName={"lc-no"}
                inputType={"text"}
                placeholder={"Lc No."}
                validation={{
                  ...register("lc-no", { required: true }),
                }}
              />
            </div>
            <div>
              <Select
                name={"c&f-agent"}
                labelName={"C&F Agent"}
                placeholder={"Choose One"}
                options={[""]}
              />
            </div>
            <div>
              <Input
                labelName={"Discount"}
                inputName={"discount"}
                inputType={"number"}
                placeholder={"0"}
              />
            </div>
            <div>
              <Select
                name={"discount-type"}
                labelName={"Discount-Type"}
                placeholder={"Amount"}
                options={[""]}
              />
            </div>{" "}
            <div>
              <Select
                name={"select-product"}
                labelName={"Select Product"}
                placeholder={"Select Product"}
                options={["19 Inch LG TV > Brand: LG > Model: 19 Inch"]}
              />
            </div>{" "}
            <div>
              <label
                style={{ fontSize: "14px" }}
                htmlFor="exampleFormControlSelect9"
              >
                Payment Method*
              </label>
              <select
                style={{ fontSize: "13px" }}
                onChange={(e) => handlePaymentType(e.target.value)}
                name="supplier"
                className="form-control digits"
                id="exampleFormControlSelect9"
                defaultValue="1"
              >
                <option value="">Select a option</option>
                <option value="Due">Due</option>
                <option value="Cash">Cash</option>
                <option value="Bank Account">Bank Account</option>
                <option value="Stripe">Stripe</option>
                <option value="Paypal">Paypal</option>
                <option value="Other Income">Other Income</option>
                <option value="Other Expence">Other Expence</option>
              </select>
            </div>
            {paymentMethod === "Cash" ||
            paymentMethod === "Bank Account" ||
            paymentMethod === "Stripe" ||
            paymentMethod === "Paypal" ||
            paymentMethod === "Other Income" ||
            paymentMethod === "Other Expence" ? (
              <div>
                <Input
                  labelName={"Amount"}
                  inputName={"amount"}
                  inputType={"number"}
                  placeholder={"0"}
                />
              </div>
            ) : (
              ""
            )}
            {paymentMethod === "Bank Account" ||
            paymentMethod === "Stripe" ||
            paymentMethod === "Paypal" ||
            paymentMethod === "Other Income" ||
            paymentMethod === "Other Expence" ? (
              <div>
                <Input
                  labelName={"Bank Name"}
                  inputName={"bank-name"}
                  inputType={"text"}
                  placeholder={"Bank Name"}
                />
              </div>
            ) : (
              ""
            )}
            {paymentMethod === "Bank Account" ||
            paymentMethod === "Stripe" ||
            paymentMethod === "Paypal" ||
            paymentMethod === "Other Income" ||
            paymentMethod === "Other Expence" ? (
              <div>
                <Input
                  labelName={"Branch"}
                  inputName={"branch"}
                  inputType={"text"}
                  placeholder={"Branch Name"}
                />
              </div>
            ) : (
              ""
            )}
            {paymentMethod === "Bank Account" ||
            paymentMethod === "Stripe" ||
            paymentMethod === "Paypal" ||
            paymentMethod === "Other Income" ||
            paymentMethod === "Other Expence" ? (
              <div>
                <Input
                  labelName={"Account Owner"}
                  inputName={"account-owner"}
                  inputType={"text"}
                  placeholder={"Account Owner"}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card" style={{ padding: "20px" }}>
                  <div className="table-responsive ">
                    <table className="table">
                      <thead className=" table-border">
                        <tr className="">
                          <th scope="col">{"Product Name"}</th>
                          <th scope="col">{"Sku"}</th>
                          <th scope="col">{"Model"}</th>
                          <th scope="col">{"Brand"}</th>
                          <th scope="col">{"Price"}</th>
                          <th scope="col">{"Sell Price"}</th>
                          <th scope="col">{"Quantity"}</th>
                          <th scope="col">{"Tax (%)"}</th>
                          <th scope="col">{"Discount"}</th>
                          <th scope="col">{"Sub Total"}</th>
                          <th scope="col">{"Action"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{"19 Inch LG TV"}</td>
                          <td>{"hsdsdfds-1"}</td>
                          <td>{"19 Inch"}</td>
                          <td>{"LG"}</td>
                          <td>{"1000"}</td>
                          <td>{"1300"}</td>
                          <td>{"1"}</td>
                          <td>{"5"}</td>
                          <td>{"0"}</td>
                          <td>{"1000"}</td>
                          <td>
                            {" "}
                            <Deletebtn />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-end">
                <div>
                  <div>
                    <Input
                      labelName={"Total Quantity"}
                      inputName={"total-quantity"}
                      inputType={"text"}
                      placeholder={"0"}
                      validation={{
                        ...register("total-quantity", { required: true }),
                      }}
                    />
                  </div>{" "}
                  <div>
                    <Input
                      labelName={"Sub Total"}
                      inputName={"sub-total"}
                      inputType={"text"}
                      placeholder={"0"}
                      validation={{
                        ...register("sub-total", { required: true }),
                      }}
                    />
                  </div>{" "}
                  <div>
                    <Input
                      labelName={"Grand Total"}
                      inputName={"grand-total"}
                      inputType={"text"}
                      placeholder={"0"}
                      validation={{
                        ...register("grand-total", { required: true }),
                      }}
                    />
                  </div>
                  <div>
                    <Select
                      name={"order-tax"}
                      labelName={"Order Tax"}
                      placeholder={"No Tax"}
                      options={["0"]}
                    />
                  </div>
                  <div>
                    <Input
                      labelName={"Shipping Charge"}
                      inputName={"shipping charge"}
                      inputType={"text"}
                      placeholder={"0"}
                      validation={{
                        ...register("shipping charge", { required: true }),
                      }}
                    />
                  </div>{" "}
                  <div>
                    <Input
                      labelName={"Other Charge"}
                      inputName={"other-charge"}
                      inputType={"text"}
                      placeholder={"0"}
                      validation={{
                        ...register("other-charge", { required: true }),
                      }}
                    />
                  </div>{" "}
                  <div>
                    <Input
                      labelName={"Payable Amount"}
                      inputName={"payable amount"}
                      inputType={"text"}
                      placeholder={"0"}
                      validation={{
                        ...register("payable amount", { required: true }),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-1 mb-2">
            <CkEditorComponent label={"Note"} />
          </div>
          <div className="d-flex justify-content-center ">
            <CencelBtn />
            <ResetBtn />
            <Submitbtn name={"Submit"} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPurchaseOrder;
