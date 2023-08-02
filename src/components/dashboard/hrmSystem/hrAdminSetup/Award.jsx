import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Input from "../../../modal/Input";
import Select from "../../../modal/Select";
import Textarea from "../../../modal/Textarea";

const Award = () => {
  const {
    register,
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
    <>
      <Breadcrumb parent="HRM System" title="Manage Award" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={toggle}
          className="btn btn-pill btn-info btn-air-info btn-air-info"
          style={{ padding: "5px 10px", borderRadius: "5px" }}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="card" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className="table-light table-border">
              <tr>
                <th scope="col">{"EMPLOYEE"}</th>
                <th scope="col">{"AWARD TYPE"}</th>
                <th scope="col">{"DATE"}</th>
                <th scope="col">{"GIFT"}</th>
                <th scope="col">{"DESCRIPTION"}</th>
                <th scope="col">{"ACTION"}</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <th scope="row">{""}</th>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td></td>
              </tr> */}
            </tbody>
          </table>
          <p className="text-center p-t-10">No entries found</p>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Award</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Select
                  name={"employee"}
                  labelName={"Employee"}
                  placeholder={"Select a option"}
                  options={["Accountant"]}
                />
              </div>
              <div>
                <Select
                  name={"award"}
                  labelName={"Award Type"}
                  placeholder={"Select a option"}
                  options={[]}
                />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Date"}
                  inputName={"date"}
                  inputType={"date"}
                  validation={{ ...register("date", { required: true }) }}
                />
              </div>
              <div>
                <Input
                  labelName={"Gift"}
                  inputName={"gift"}
                  inputType={"text"}
                  placeholder={"Enter Gift"}
                  validation={{ ...register("gift", { required: true }) }}
                />
              </div>
            </div>

            <div>
              <Textarea
                labelName={"Description"}
                inputName={"description"}
                placeholder={"Enter Description"}
                height={"5"}
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
    </>
  );
};

export default Award;
