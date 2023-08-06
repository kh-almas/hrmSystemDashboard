import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import Textarea from "../../../common/modal/Textarea";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const Announcement = () => {
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
      <Breadcrumb parent="HRM System" title="Manage Announcement" />
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
            <thead className="table-border">
              <tr>
                <th scope="col">{"Title"}</th>
                <th scope="col">{"Start Date"}</th>
                <th scope="col">{"End Date"}</th>
                <th scope="col">{"Description"}</th>
                <th scope="col">{"Action"}</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <th scope="row">{""}</th>
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
        <ModalHeader toggle={toggle}>Create New Announcement</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Announcement Title"}
                  inputName={"title"}
                  inputType={"text"}
                  placeholder={"Enter title"}
                  validation={{ ...register("title", { required: true }) }}
                />
              </div>
              <div>
                <Select
                  labelName={"Branch"}
                  name={"branch"}
                  placeholder={"Select an option"}
                  options={["All branch"]}
                />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Select
                  name={"department"}
                  labelName={"Department"}
                  placeholder={"Select an option"}
                  options={["All department"]}
                />
              </div>
              <div>
                <Select
                  name={"employee"}
                  labelName={"Employee"}
                  placeholder={"Select an option"}
                  options={[]}
                />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Announcement Start Date"}
                  inputName={"startdate"}
                  inputType={"date"}
                  validation={{ ...register("startdate", { required: true }) }}
                />
              </div>
              <div>
                <Input
                  labelName={"Announcement End Date"}
                  inputName={"enddate"}
                  inputType={"date"}
                  validation={{ ...register("enddate", { required: true }) }}
                />
              </div>
            </div>

            <div>
              <Textarea
                labelName={"Announcement Description"}
                inputName={"description"}
                placeholder={"Enter Announcement Description"}
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

export default Announcement;
