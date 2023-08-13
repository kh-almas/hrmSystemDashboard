import React, { useState } from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import FilesComponent from "../../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../../common/salaryCard/CommonSearchComponet";
import { Link } from "react-router-dom";
import ComboProduct from "./ComboProduct";

const Products = () => {
  const [item, setItem] = useState("products");

  const handleCard = (cardName) => {
    setItem(cardName);
  };

  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Product List" />
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
          <div className="d-flex flex-column flex-md-row  text-center">
            <Link
              to={"/dashboard/inventory-management/products/add-product"}
              className="btn btn-pill btn-info btn-air-info  mx-2 mb-2 mt-1"
            >
              <i className="fa fa-plus me-1"></i>
              New Product
            </Link>
            <Link className="btn btn-pill btn-info btn-air-info">
              <div className="mt-1">
                <i className="fa fa-upload me-1"></i>
                <span>Upload Via CSV</span>
              </div>
            </Link>
          </div>
        </div>

        <FilesComponent />
      </div>
      <div className="mb-3 p-l-20 ">
        <div
          className="btn-group btn-group-square"
          role="group"
          aria-label="Basic example"
        >
          <button
            onClick={() => handleCard("products")}
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginRight: "12px",
              width: "150px",
            }}
            className={`btn btn-outline-primary mr-2 ${
              item == "products" ? "active" : ""
            }`}
            type="button"
          >
            Product
          </button>
          <button
            onClick={() => handleCard("Combo product")}
            style={{
              fontSize: "14px",
              fontWeight: "500",
            }}
            class="btn btn-outline-primary"
            type="button"
          >
            Combo Product
          </button>
        </div>
      </div>

      <div className="container-fluid">
        {item && item == "products" ? (
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ padding: "20px" }}>
                <CommonSearchComponet />
                <div className="table-responsive">
                  <table className="table ">
                    <thead className=" table-border">
                      <tr className="">
                        <th scope="col">{"Sl"}</th>
                        <th scope="col">{"Image"}</th>
                        <th scope="col">{"Name"}</th>
                        <th scope="col">{"Sku"}</th>
                        <th scope="col">{"Brand"}</th>
                        <th scope="col">{"Model"}</th>
                        <th scope="col">{"Purchase Price"}</th>
                        <th scope="col">{"Selling Price"}</th>
                        <th scope="col">{"Min Price"}</th>
                        <th scope="col">{"Stock"}</th>
                        <th scope="col">{"Supplier"}</th>
                        <th scope="col">{"Product Type"}</th>
                        <th scope="col">{"Category"}</th>
                        <th scope="col">{"Stock Alert"}</th>
                        <th scope="col">{"Action"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ whiteSpace: "nowrap" }}>
                        <td>{"1"}</td>
                        <td>
                          <img src="" alt="" />
                        </td>
                        <td>{"19 Inch LG TV"}</td>
                        <td>{"hsdsdfds-1"}</td>
                        <td>{"LG"}</td>
                        <td>{"19 Inch"}</td>
                        <td>{"$1,000.00"}</td>
                        <td>{"$1,300.00"}</td>
                        <td>{"$1,150.00"}</td>
                        <td>{"90"}</td>
                        <td>{"Supplier-01	"}</td>
                        <td>{"Single"}</td>
                        <td>{"TV"}</td>
                        <td>{"20 pcs"}</td>
                        <td>
                          <button
                            class="btn btn-pill btn-outline-info btn-xs p-1 px-4"
                            type="button"
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p style={{ fontSize: "13px" }}>Showing page 1 of 1</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    class="btn btn-pill btn-outline-secondary btn-xs"
                    type="button"
                  >
                    <i
                      style={{ fontSize: "24px" }}
                      className="icofont icofont-swoosh-left"
                    ></i>
                  </button>

                  <p
                    style={{ fontSize: "13px" }}
                    className="p-1 px-2 btn-primary-gradien mt-3 mx-2 rounded text-light"
                  >
                    1
                  </p>
                  <button
                    class="btn btn-pill btn-outline-secondary btn-xs"
                    type="button"
                  >
                    <i
                      style={{ fontSize: "24px" }}
                      className="icofont icofont-swoosh-right"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ComboProduct />
        )}
      </div>
    </div>
  );
};

export default Products;
