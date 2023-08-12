import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import { Link } from "react-router-dom";

const SaleSelectOrderDetails = () => {
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Order Details" />
      <div
        style={{ padding: "0px 18px" }}
        className="d-flex justify-content-between align-items-center pb-3"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "",
            marginBottom: "20px",
          }}
        >
          <div className="d-flex flex-column flex-md-row ">
            <h5 className="text-center me-2 mt-1">INV-230711</h5>
            <Link className="btn btn-pill btn-info  btn-air-info mx-2 mb-2">
              Partial
            </Link>
            <Link className="btn btn-pill btn-info  btn-air-info mx-2 mb-2">
              Print
            </Link>{" "}
            <Link className="btn btn-pill btn-info  btn-air-info mx-2 mb-2">
              Challan
            </Link>{" "}
            <Link className="btn btn-pill btn-info  btn-air-info mx-2 mb-2">
              Pdf
            </Link>{" "}
            <Link className="btn btn-pill btn-info  btn-air-info mx-2 mb-2">
              Preview
            </Link>{" "}
            <Link className="btn btn-pill btn-info  btn-air-info mx-2 mb-2">
              View Payments
            </Link>{" "}
            <Link className="btn btn-pill btn-info  btn-air-info mx-2 mb-2">
              Mail
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-3 p-l-20 ">
        <div
          className="btn-group btn-group-square"
          role="group"
          aria-label="Basic example"
        >
          <button
            // onClick={() => handleCard("products")}
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginRight: "12px",
              width: "150px",
            }}
            className="btn btn-outline-primary mr-2"
            // className={`btn btn-outline-primary mr-2 ${
            //   item == "products" ? "active" : ""
            // }`}
            type="button"
          >
            A4 Size
          </button>
          <button
            // onClick={() => handleCard("Combo product")}
            style={{
              fontSize: "14px",
              fontWeight: "500",
            }}
            class="btn btn-outline-primary"
            type="button"
          >
            Pos Machine
          </button>
        </div>

        <div className="card p-30 my-3">
          <div className="d-flex justify-content-between">
            <img
              className="img-fluid"
              style={{ width: "100px", height: "50px" }}
              src="https://store.tiggzyit.com/public/uploads/settings/6495f3199f4e1.png"
              alt=""
            />

            <div className="d-flex flex-column">
              <span>{"+8801841412141"}</span>
              <span>{"info@spondonit.com"}</span>
              <span>{"89/2 Panthapath, Dhaka 1215,"}</span>
              <span>{"Bangladesh"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleSelectOrderDetails;
