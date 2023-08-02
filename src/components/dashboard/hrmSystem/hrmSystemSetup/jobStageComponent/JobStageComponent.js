import React from "react";

const JobStageComponent = ({ stage }) => {
  console.log(stage);
  return (
    <div className="border" style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center justify-content-center ">
          <i className="icofont icofont-drag fs-5 "></i>
          <p className="fs-5 mt-3 m-l-10">{stage.name}</p>
        </div>
        <div className="d-flex align-items-center">
          <i
            style={{
              backgroundColor: "skyblue",
              color: "#ffffff",
            }}
            className="icofont icofont-pencil-alt-5 rounded m-r-15 p-2"
          ></i>
          <i
            style={{ backgroundColor: "#ff3a6e", color: "#ffffff" }}
            className="icofont icofont-trash rounded p-2"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default JobStageComponent;
