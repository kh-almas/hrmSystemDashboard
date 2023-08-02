import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Select from "../../../common/modal/Select";
import Input from "../../../common/modal/Input";
import Textarea from "../../../common/modal/Textarea";

const Trip = () => {
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
      <Breadcrumb parent="HRM System" title="Manage Trip" />
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
            <thead className="table-light table-border">
              <tr>
                <th scope="col">{"EMPLOYEE NAME"}</th>
                <th scope="col">{"START DATE"}</th>
                <th scope="col">{"END DATE"}</th>
                <th scope="col">{"PURPOSE OF TRIP"}</th>
                <th scope="col">{"COUNTRY"}</th>
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
                <td>{""}</td>
                <td></td>
              </tr> */}
            </tbody>
          </table>
          <p className="text-center p-t-10 table-text">No entries found</p>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Trip</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Select
                name={"employee"}
                labelName={"Employee"}
                placeholder={"Select an option"}
                options={["Accountant"]}
              />
            </div>

            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Start Date"}
                  inputName={"startdate"}
                  inputType={"date"}
                  validation={{ ...register("startdate", { required: true }) }}
                />
              </div>
              <div>
                <Input
                  labelName={"End Date"}
                  inputName={"enddate"}
                  inputType={"date"}
                  validation={{ ...register("enddate", { required: true }) }}
                />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Purpose of Trip"}
                  inputName={"trippurpose"}
                  inputType={"text"}
                  placeholder={"Enter trip purpose"}
                  validation={{
                    ...register("trippurpose", { required: true }),
                  }}
                />
              </div>
              <div>
                <Input
                  labelName={"Country"}
                  inputName={"country"}
                  inputType={"text"}
                  placeholder={"Enter a country name"}
                  validation={{ ...register("country", { required: true }) }}
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

export default Trip;
