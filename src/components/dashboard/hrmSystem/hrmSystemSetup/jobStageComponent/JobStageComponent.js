import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Input from "../../../../common/modal/Input";


const JobStageComponent = ({ stage }) => {
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
  console.log(stage);
  return (
   <div>
     <div className="border" style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center justify-content-center ">
          <i className="icofont icofont-drag fs-5 "></i>
          <p className="fs-5 mt-3 m-l-10">{stage.name}</p>
        </div>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-pill btn-info btn-air-info btn-air-info"
            style={{ padding: "4px 7px", borderRadius: "5px", marginRight: "10px" }}
            onClick={toggle}
          >
            <i className="icofont icofont-pencil-alt-5"></i>
          </button>

          <i
            style={{ backgroundColor: "#ff3a6e", color: "#ffffff" }}
            className="icofont icofont-trash rounded p-2"
          ></i>
        </div>
      </div>
    </div>
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Job Stage</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                labelName={"Title"}
                inputName={"Title"}
                defaultValue={stage?.name}
                // placeholder={stage?.name}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button color="" onClick={toggle} className="me-2">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Update
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
   </div>
  );
};

export default JobStageComponent;
