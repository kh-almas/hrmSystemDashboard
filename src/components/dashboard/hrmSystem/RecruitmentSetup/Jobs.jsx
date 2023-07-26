import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../common/breadcrumb";

const Jobs = () => {
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Job" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Link
          to="/"
          className="btn btn-pill btn-info btn-air-info btn-air-info"
        >
          <i className="fa fa-plus"></i>
        </Link>
      </div>
    </div>
  );
};

export default Jobs;
