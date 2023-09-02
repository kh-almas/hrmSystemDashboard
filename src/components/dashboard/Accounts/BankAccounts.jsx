import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Breadcrumb from "../../common/breadcrumb";
import FilesComponent from "../../common/filesComponent/FilesComponent";
import Input from "../../common/modal/Input";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";

const BankAccounts = () => {
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
    setModal(!modal);
  };
  return (
    <div>
      <Breadcrumb parent="Accounts" title="Bank Accounts" />
      <div
        style={{ padding: "0px 20px" }}
        className="d-flex justify-content-between align-items-center pb-3 flex-wrap"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={toggle}
            className="btn btn-pill btn-info btn-air-info btn-air-info mx-2"
          >
            <i className="fa fa-plus me-2"></i>
            Add New Bank Accounts
          </button>
          <Link
            to={"/dashboard/csv/upload"}
            className="btn btn-pill btn-info btn-air-info btn-air-info"
          >
            <i className="fa fa-upload me-1"></i> Upload Via CSV
          </Link>
        </div>
        <FilesComponent />
      </div>
      <div className="card p-20">
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className="table-border">
              <tr>
                <th scope="col">{"ID"}</th>
                <th scope="col">{"ACCOUNT"}</th>
                <th scope="col">{"AMOUNT"}</th>
                <th scope="col">{"NARRATION"}</th>
                <th scope="col">{"DATE"}</th>
                <th scope="col">{"ACTION "}</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <p className="text-center p-t-10">No entries found</p>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Bank Accounts</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row row-cols-1 row-cols-lg-1">
              <div>
                <Input
                  labelName={"BANK NAME *"}
                  inputName={"bankName"}
                  inputType={"text"}
                  placeholder={"BANK NAME "}
                  validation={{ ...register("bankName", { required: true }) }}
                />
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-1">
              <div>
                <Input
                  labelName={"BRANCH NAME *"}
                  inputName={"branch name"}
                  inputType={"text"}
                  placeholder={"BRANCH NAME "}
                  validation={{ ...register("branchName", { required: true }) }}
                />
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-1">
              <div>
                <Input
                  labelName={"Account Number *"}
                  inputName={"account_no"}
                  inputType={"text"}
                  placeholder={"Account Number "}
                  validation={{ ...register("account_no", { required: true }) }}
                />
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-1">
              <div>
                <Input
                  labelName={"Account Name *"}
                  inputName={"account_name"}
                  inputType={"text"}
                  placeholder={"Account Name"}
                  validation={{
                    ...register("account_name", { required: true }),
                  }}
                />
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-1">
              <div>
                <Input
                  labelName={"Description *"}
                  inputName={"description"}
                  inputType={"text"}
                  placeholder={"Description"}
                  validation={{
                    ...register("description", { required: true }),
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <div class="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
                />
                <label className="form-check-label" for="inlineRadio1">
                  Active
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
                />
                <label className="form-check-label" for="inlineRadio2">
                  DeActive
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <Button type="submit" className="me-2">
                Save
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BankAccounts;
