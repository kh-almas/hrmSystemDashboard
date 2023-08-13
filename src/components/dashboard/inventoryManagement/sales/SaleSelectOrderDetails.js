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

        <div
          className="card p-30 my-3"
          style={{
            width: "25cm",
            height: "29.7",
            margin: "auto",
        
          }}

        >
          <div className="d-flex justify-content-between mb-4">
            <img
              className="img-fluid"
              style={{ width: "100px", height: "50px" }}
              src="https://store.tiggzyit.com/public/uploads/settings/6495f3199f4e1.png"
              alt=""
            />

            <div className="d-flex flex-column fw-bold">
              <span>{"+8801841412141"}</span>
              <span>{"info@spondonit.com"}</span>
              <span>{"89/2 Panthapath, Dhaka 1215,"}</span>
              <span>{"Bangladesh"}</span>
            </div>
          </div>

          <hr />
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column ">
              <span>
                Bill No : <span>{"INV-230712"}</span>
              </span>
              <span>
                Bill Date: <span>{"24th Jul, 2023"}</span>
              </span>
              <span>
                Party Name:<span>{"Bijoy"}</span>
              </span>
              <span>
                Party Address: <span>{""}</span>
              </span>
              <span>
                Phone: <span>{""}</span>
              </span>
              <span>
                Email: <span>{"dhk@gmail.com"}</span>
              </span>
            </div>
            <div className="d-flex flex-column ">
              <span>
                Served By : <span>{"Super admin"}</span>
              </span>
              <span>
                Entry Time: <span>{"2023-07-24 21:56:59"}</span>
              </span>
              <span>
                Sale Type:<span>{"Regular"}</span>
              </span>
            </div>
          </div>
          <div className="table-responsive mt-5 mb-3">
            <table className="table ">
              <thead className=" table-border">
                <tr className="">
                  <th scope="col">{"No"}</th>
                  <th scope="col">{"Product"}</th>
                  <th scope="col">{"Model"}</th>
                  <th scope="col">{"Brand"}</th>
                  <th scope="col">{"Price"}</th>
                  <th scope="col">{"QTY"}</th>
                  <th scope="col">{"Tax"}</th>
                  <th scope="col">{"Dis(%)"}</th>
                  <th scope="col">{"SubTotal"}</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ whiteSpace: "nowrap" }}>
                  <td>{"1"}</td>
                  <td>{"19 Inch LG TV"}</td>
                  <td>{"19 Inch"}</td>
                  <td>{"LG"}</td>
                  <td>{"$ 1,200.00"}</td>
                  <td>{"5"}</td>
                  <td>{"0%"}</td>
                  <td>{"0"}</td>
                  <td>{"$ 6,000.00"}</td>
                </tr>
              </tbody>
              <tfoot className="mb-5">
                <tr>
                  <td colspan="8" style={{ textAlign: "right" }}>
                    <ul>
                      <li class="nowrap">SubTotal :</li>
                      <li>Grand Total :</li>

                      <li class="border-top-0">Total Amount :</li>
                      <li class="border-top-0">Due :</li>
                      <li
                        class="border-top-0 total_due"
                        style={{ display: "none" }}
                      >
                        Total Due :
                      </li>
                    </ul>
                  </td>

                  <td class="text-right mr-0 pr-2">
                    <ul>
                      <li class="nowrap">$ 6,000.00</li>
                      <li class="nowrap">$ 6,000.00</li>
                      <li class="border-top-0">$ 6,000.00</li>
                      <li class="border-top-0">$ 0.00</li>
                      <li
                        class="border-top-0 total_due"
                        style={{ display: "none" }}
                      >
                        $ 1,000.00
                      </li>
                    </ul>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div
            class="row mt-5 mb-5 pb-5"
            style={{ marginTop: "100px", marginBottom: "px" }}
          >
            <div class="col-lg-12">
              <p>Remarks:</p>
              <p class="text-center"></p>
              <span>
                <hr />
              </span>
              <p class="text-center"></p>
            </div>
          </div>
          <div class="row mt-60 signature_bottom ">
            <div class="col-md-4 text-center">
              <img src="" alt="" />
              <p>--------------------------</p>
              <p className="mb-0">Customer</p>
              <p>Signature</p>
            </div>
            <div class="col-md-4 text-center">
              <img src="" alt="" />
              <p>--------------------------</p>
              <p className="mb-0">Accountant</p>
              <p>Signature</p>
            </div>
            <div class="col-md-4 text-center">
              <img src="" alt="" />
              <p>--------------------------</p>
              <p className="mb-0">Authorized</p>
              <p>Signature</p>
            </div>
          </div>
        </div>
        <div class="my-4 d-flex justify-content-center align-items-center">
          <Link
            to={`/dashboard/inventory-management/sale/add-sale`}
            class="me-2 btn btn-pill btn-info btn-air-info btn-info-gradien px-4"
          >
            Back To Sale
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SaleSelectOrderDetails;
