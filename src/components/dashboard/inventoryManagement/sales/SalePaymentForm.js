import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../common/modal/Input";

const SalePaymentForm = ({ handleSubmit, onSubmit, index, handleDelete, show }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const handlePaymentType = (type) => {
    console.log(type);

    if (type !== "") {
      setPaymentMethod(type);
    } else {
      toast.warn("Please choose One Payment Method ");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row row-cols-1 row-cols-lg-2 ">
         <p className={`${show ? "d-block" : "d-none"}`} onClick={() => handleDelete(index)} type="">X</p>
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
      </form>
    </div>
  );
};

export default SalePaymentForm;
