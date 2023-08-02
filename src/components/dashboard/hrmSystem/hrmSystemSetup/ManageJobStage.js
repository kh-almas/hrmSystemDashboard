import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import data from "../../../../data/customizer/jobStageData.json";
import Input from "../../../common/modal/Input";
import JobStageComponent from "./jobStageComponent/JobStageComponent";

const ManageJobStage = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState();

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="card" style={{ padding: "20px" }}>
      {/* <Breadcrumb parent="HRM System Setup" title="Manage Job Stage" /> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          className="btn btn-pill btn-info btn-air-info btn-air-info"
          style={{ padding: "7px 13px", borderRadius: "5px" }}
          onClick={toggle}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Job Stage</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                labelName={"Title"}
                inputName={"Title"}
                placeholder={"Enter Stage Title"}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button color="" onClick={toggle} className="me-2">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Create
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ManageJobStage;
