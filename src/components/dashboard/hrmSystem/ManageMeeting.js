import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Breadcrumb from "../../common/breadcrumb";
import Input from "../../common/modal/Input";
import Select from "../../common/modal/Select";
import Textarea from "../../common/modal/Textarea";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";

const ManageMeeting = () => {
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
      <Breadcrumb parent="HRM System" title="Manage Meeting" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Link
          to={"/hrm/dashboard/manage-meeting-calender"}
          className="btn btn-pill btn-info btn-air-info btn-air-info me-2"
          style={{ padding: "7px 13px", borderRadius: "5px" }}
        >
          <i class="fa fa-calendar"></i>
        </Link>
        <button
          onClick={toggle}
          className="btn btn-pill btn-info btn-air-info btn-air-info"
          style={{ padding: "7px 13px", borderRadius: "5px" }}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive ">
                <table className="table ">
                  <thead className=" table-border">
                    <tr className="">
                      <th scope="col">{"Meeting Title"}</th>
                      <th scope="col">{"Meeting Date"}</th>
                      <th scope="col">{"Meeting Time"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                        </tr> */}
                  </tbody>
                </table>
                <p className="text-center p-t-10">No entries found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Meeting</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Select
                name={"branch"}
                labelName={"Branch"}
                placeholder={"Select an option"}
                options={["All branch"]}
              />
            </div>
            <div>
              <Select
                name={"department"}
                labelName={"Department"}
                placeholder={"Select an option"}
                options={[]}
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
            <div>
              <Input
                labelName={"Meeting Title"}
                inputName={"title"}
                inputType={"text"}
                placeholder={"Enter a title"}
                validation={{ ...register("title", { required: true }) }}
              />
            </div>
            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Meeting Date"}
                  inputName={"date"}
                  inputType={"date"}
                  validation={{ ...register("date", { required: true }) }}
                />
              </div>
              <div>
                <Input
                  labelName={"Meeting Time"}
                  inputName={"time"}
                  inputType={"time"}
                  validation={{ ...register("time", { required: true }) }}
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
            <div>
              <input
                className="me-2 mt-1"
                id="checkbox-primary-2"
                type="checkbox"
              />
              <label htmlFor="exampleFormControlSelect9">
                Synchronize in Google Calendar ?
              </label>
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

export default ManageMeeting;
