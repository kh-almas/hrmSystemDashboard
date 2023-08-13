import React, { useState } from "react";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../../common/modal/Input";
import Submitbtn from "../../../common/button/Submitbtn";
import SalePaymentForm from "./SalePaymentForm";

const Payment = () => {
  const [inputCount, setInputCount] = useState(0);
  const inputs = [];

  const increaseInputs = () => {
    setInputCount(inputCount + 1);
  };

  const handleDelete = (i) => {
    const updatedComponents = inputs.filter(
      (component) => component.props.index !== i
    );
    // console.log(i);
    // // inputs.splice(i, 1);
    setInputCount(updatedComponents);
    console.log(inputCount);
  };

  const renderInputs = () => {
    for (let i = 0; i < inputCount; i++) {
      inputs.push(
        <SalePaymentForm
          register={register}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          show={true}
          handleDelete={handleDelete}
          index={i}
        />
      );
    }
    return inputs;
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
    <>
      <Breadcrumb parent="Inventory management" title="Payment" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <CommonSearchComponet />
            <h5 className="ms-5 ">Paid Amount: $ 6,000.00</h5>
            <div className="d-flex justify-content-evenly ">
              <div className="card p-30 w-75 ">
                {/* <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row row-cols-1 row-cols-lg-2 ">
                    <div className="mb-2">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="exampleFormControlSelect9"
                      >
                        Payment Method*
                      </label>
                      <select
                        style={{ fontSize: "13px" }}
                        onChange={(e) => handlePaymentType(e.target.value)}
                        name="paymentMethod"
                        className="form-control digits"
                        id="exampleFormControlSelect9"
                        defaultValue="1"
                      >
                        <option value="">Select a option</option>

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
                      <div className="mb-2">
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
                      <div className="mb-2">
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
                      <div className="mb-2">
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
                      <div className="mb-2">
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
                </form> */}
                <div className="card mb-2 p-2 ">
                  <SalePaymentForm
                    register={register}
                    onSubmit={onSubmit}
                    handleSubmit={handleSubmit}
                    show={false}
                  />
                  <div>{renderInputs()}</div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    onClick={increaseInputs}
                    class="btn btn-info  btn-air-info btn-info-gradien  w-100"
                    type="button"
                  >
                    Add New Payment
                  </button>
                </div>
              </div>
              <div>
                <h5
                  style={{ whiteSpace: "nowrap" }}
                  className="ms-4 text-center"
                >
                  Quick Cash
                  <div className="d-flex flex-column mt-2">
                    <button
                      className="btn btn-square btn-primary btn-sm my-1"
                      type="button"
                    >
                      5000
                    </button>
                    <button
                      className="btn btn-square btn-primary btn-sm my-1"
                      type="button"
                    >
                      1000
                    </button>{" "}
                    <button
                      className="btn btn-square btn-primary btn-sm my-1"
                      type="button"
                    >
                      500
                    </button>{" "}
                    <button
                      className="btn btn-square btn-primary btn-sm my-1"
                      type="button"
                    >
                      100
                    </button>{" "}
                    <button
                      className="btn btn-square btn-primary btn-sm my-1"
                      type="button"
                    >
                      50
                    </button>{" "}
                    <button
                      className="btn btn-square btn-primary btn-sm my-1"
                      type="button"
                    >
                      20
                    </button>{" "}
                    <button
                      className="btn btn-square btn-primary btn-sm my-1"
                      type="button"
                    >
                      10
                    </button>{" "}
                    <button
                      style={{ backgroundColor: "#ff6d67", color: "white" }}
                      className="btn btn-square btn-sm my-1"
                      type="button"
                    >
                      Clear
                    </button>
                  </div>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
