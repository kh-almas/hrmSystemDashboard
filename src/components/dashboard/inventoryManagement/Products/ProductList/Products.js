import React, { useState } from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import FilesComponent from "../../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../../common/salaryCard/CommonSearchComponet";
import { Link } from "react-router-dom";

const Products = () => {
  const [item, setItem] = useState("products");

  const handleCard = (cardName) => {
    setItem(cardName);
  };

  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Product List" />
      <div style={{ padding: "0px 18px" }} className="d-flex justify-content-between align-items-center pb-3">
        <div style={{display: "flex", alignItems: "center", justifyContent: "", marginBottom: "20px",}}>
          <div className="d-flex flex-column flex-md-row  text-center">
            <Link
              to={"/dashboard/inventory-management/products/add-product"}
              className="btn btn-pill btn-info btn-air-info  mx-2 mb-2 mt-1"
            >
              <i className="fa fa-plus me-1"></i>
              New Product
            </Link>
          </div>
        </div>
        <FilesComponent />
      </div>

    </div>
  );
};

export default Products;
