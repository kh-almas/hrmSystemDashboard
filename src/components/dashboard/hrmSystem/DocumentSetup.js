import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Breadcrumb from "../../common/breadcrumb";
import Input from "../../common/modal/Input";
import Select from "../../common/modal/Select";
import Textarea from "../../common/modal/Textarea";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";
const DocumentSetup = () => {
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
      <Breadcrumb parent="HRM System" title="Manage Document" />
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive ">
                <table className="table ">
                  <thead className=" table-border">
                    <tr className="">
                      <th scope="col">{"Name"}</th>
                      <th scope="col">{"Documents"}</th>
                      <th scope="col">{"Role"}</th>
                      <th scope="col">{"Description"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                        <td>{""}</td>
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
        <ModalHeader toggle={toggle}>Create New Document Type</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Name"}
                  inputName={"name"}
                  inputType={"text"}
                  placeholder={"Enter Name"}
                  validation={{ ...register("name", { required: true }) }}
                />
              </div>
              <div>
                <Select
                  name={"role"}
                  labelName={"Role"}
                  placeholder={"Select an option"}
                  options={["Accountant", "Client"]}
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
            {/*<div>*/}
            {/*  <Input*/}
            {/*    labelName={"Document"}*/}
            {/*    inputName={"file"}*/}
            {/*    inputType={"file"}*/}
            {/*    validation={{ ...register("file", { required: true }) }}*/}
            {/*  />*/}
            {/*</div>*/}

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

export default DocumentSetup;
