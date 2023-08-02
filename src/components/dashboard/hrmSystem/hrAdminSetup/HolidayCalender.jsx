import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Select from "../../../common/modal/Select";
import Input from "../../../common/modal/Input";
import Textarea from "../../../common/modal/Textarea";
import Calendar2 from "./Calendar2";

const Holiday = () => {
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
      <Breadcrumb parent="HRM System" title="Manage Holiday" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Link
          to={"/dashboard/admin/holiday"}
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

      <div className="card p-4">
        <div className="d-md-flex justify-content-end">
          <div className="me-2">
            <Input
              labelName={"Start Date"}
              inputName={"startdate"}
              inputType={"date"}
              validation={{ ...register("startdate", { required: true }) }}
            />
          </div>
          <div className="me-2">
            <Input
              labelName={"End Date"}
              inputName={"enddate"}
              inputType={"date"}
              validation={{ ...register("enddate", { required: true }) }}
            />
          </div>
          <div className="d-flex align-items-end justify-content-end justify-content-md-start mb-3">
            <div>
              <button
                className="btn btn-pill btn-info btn-air-info btn-air-info me-1"
                style={{ padding: "7px 13px", borderRadius: "5px" }}
              >
                <i class="fa fa-search"></i>
              </button>
            </div>
            <div>
              <button
                className="btn btn-pill btn-info btn-air-info btn-air-info"
                style={{ padding: "7px 13px", borderRadius: "5px" }}
              >
                <i class="fa fa-trash-o"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Calendar2 />
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Holiday</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                labelName={"Occasion"}
                inputName={"occasion"}
                inputType={"text"}
                placeholder={"Enter occasion name"}
                validation={{ ...register("occasion", { required: true }) }}
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

export default Holiday;
