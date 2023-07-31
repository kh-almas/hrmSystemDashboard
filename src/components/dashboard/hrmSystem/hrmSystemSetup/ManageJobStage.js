import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import { FaEdit } from "react-icons/fa";
const ManageJobStage = () => {
  return (
    <div>
      <Breadcrumb parent="HRM System Setup" title="Manage Job Stage" />

      <div className="card border" style={{ padding: "20px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="fw-bold fs-6">Applied</p>
          </div>
          <div className="d-flex align-items-center">
            <FaEdit className="bg-primary m-r-15" />
            <i class="fa-solid fa-trash  "></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageJobStage;
