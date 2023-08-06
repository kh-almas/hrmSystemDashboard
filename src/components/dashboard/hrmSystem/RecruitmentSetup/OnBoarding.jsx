import React, { useState } from "react";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "../../../common/modal/Select";
import Input from "../../../common/modal/Input";
import Textarea from "../../../common/modal/Textarea";

const OnBoarding = () => {
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
      <Breadcrumb parent="HRM System" title="Manage Job On-boarding" />
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
            <thead className=" table-border">
              <tr className="">
                <th scope="col">{"Name"}</th>
                <th scope="col">{"Applied For"}</th>
                <th scope="col">{"Rating"}</th>
                <th scope="col">{"Applied At"}</th>
                <th scope="col">{"CV/Resume"}</th>
                <th scope="col">{"ACTION"}</th>
              </tr>
            </thead>
            <tbody>
              {/*<tr>*/}
              {/*    <td>{"Branchy"}</td>*/}
              {/*    <td>{"AWARD"}</td>*/}
              {/*    <td>{"DATE"}</td>*/}
              {/*    <td>{"GIFT"}</td>*/}
              {/*    <td>{"DESCRIPTION"}</td>*/}
              {/*    <td>{"ACTION"}</td>*/}
              {/*</tr>*/}
            </tbody>
          </table>
          <p className="text-center p-t-10">No entries found</p>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Job OnBoard</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Select
                name={"interviewer"}
                labelName={"Interviewer"}
                placeholder={"Select an option"}
                options={[]}
              />
            </div>

            <div>
              <Input
                labelName={"Joining Date"}
                inputName={"joiningdate"}
                inputType={"date"}
                validation={{ ...register("joiningdate", { required: true }) }}
              />
            </div>

            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Days of week"}
                  inputName={"days"}
                  inputType={"number"}
                  placeholder={"Enter day"}
                  validation={{
                    ...register("days", { required: true }),
                  }}
                />
              </div>
              <div>
                <Input
                  labelName={"Salary"}
                  inputName={"salary"}
                  inputType={"number"}
                  placeholder={"Enter salary"}
                  validation={{ ...register("salary", { required: true }) }}
                />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Select
                  name={"salarytype"}
                  labelName={"Salary Type"}
                  placeholder={"Select an option"}
                  options={[]}
                />
              </div>
              <div>
                <Select
                  name={"salaryduration"}
                  labelName={"Salary Duration"}
                  placeholder={"Select an option"}
                  options={[]}
                />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Select
                  name={"jobtype"}
                  labelName={"Job Type"}
                  placeholder={"Select an option"}
                  options={[]}
                />
              </div>
              <div>
                <Select
                  name={"status"}
                  labelName={"Status"}
                  placeholder={"Select an option"}
                  options={[]}
                />
              </div>
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

export default OnBoarding;
