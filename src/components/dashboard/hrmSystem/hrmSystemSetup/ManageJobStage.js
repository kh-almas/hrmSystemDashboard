import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import data from "../../../../data/customizer/jobStageData.json";
import JobStageComponent from "./jobStageComponent/JobStageComponent";
const ManageJobStage = () => {
  return (
    <div>
      {/* <Breadcrumb parent="HRM System Setup" title="Manage Job Stage" /> */}

      {data?.map((stage, i) => (
        <JobStageComponent key={i} stage={stage} />
      ))}

      {/* <div className="card border" style={{ padding: "20px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-content-center ">
            <i className="icofont icofont-drag fs-5 "></i>
            <p className="fs-5 mt-3 m-l-10">Applied</p>
          </div>
          <div className="d-flex align-items-center">
            <i className="icofont icofont-pencil-alt-5 custom-div rounded m-r-15 p-2"></i>
            <i
              style={{ backgroundColor: "#ff3a6e", color: "#ffffff" }}
              className="icofont icofont-trash rounded p-2"
            ></i>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ManageJobStage;
