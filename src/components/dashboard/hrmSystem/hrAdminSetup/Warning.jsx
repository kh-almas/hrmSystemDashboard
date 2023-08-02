import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Input from "../../../modal/Input";
import Select from "../../../modal/Select";
import Textarea from "../../../modal/Textarea";

const Warning = () => {
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
      <Breadcrumb parent="HRM System" title="Manage Warning" />
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
          style={{ padding: "7px 13px", borderRadius: "5px" }}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="card" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">{"WARNING BY"}</th>
                <th scope="col">{"WARNING TO"}</th>
                <th scope="col">{"SUBJECT"}</th>
                <th scope="col">{"WARNING DATE"}</th>
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
        <ModalHeader toggle={toggle}>Create New Warning</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Select
                  labelName={"Warning By"}
                  name={"warningby"}
                  placeholder={"Select a option"}
                  options={["Accountant"]}
                />
              </div>
              <div>
                <Select
                  labelName={"Warning To"}
                  name={"warningto"}
                  placeholder={"Select a option"}
                  options={["Accountant"]}
                />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Subject"}
                  inputName={"subject"}
                  inputType={"text"}
                  placeholder={"Enter subject"}
                  validation={{ ...register("subject", { required: true }) }}
                />
              </div>
              <div>
                <Input
                  labelName={"Warning Date"}
                  inputName={"date"}
                  inputType={"date"}
                  validation={{ ...register("date", { required: true }) }}
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

export default Warning;
