import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Breadcrumb from "../../common/breadcrumb";
import FilesComponent from "../../common/filesComponent/FilesComponent";
import Input from "../../common/modal/Input";
import Select from "../../common/modal/Select";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";
import ChartOfAccountsData from "./ChartOfAccountsData";

const ChartOfAccounts = () => {
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
      <Breadcrumb parent="Accounts" title="Chart Of Accounts" />
      <div
        style={{ padding: "0px 20px" }}
        className="d-flex justify-content-between align-items-center pb-3"
      >
        <div>
          <button
            onClick={toggle}
            className="btn btn-pill btn-info btn-air-info btn-air-info mx-2"
          >
            <i className="fa fa-plus me-2"></i>
            Add New Bank Accounts
          </button>
        </div>
        <FilesComponent />
      </div>
      <div className="card p-20">
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className="table-border">
              <tr>
                <th scope="col">{"TYPE"}</th>
                <th scope="col">{"CODE"}</th>
                <th scope="col">{"NAME"}</th>
                <th scope="col">{"COST CENTER"}</th>
                <th scope="col">{"BALANCE"}</th>
                <th scope="col">{"STATUS"}</th>
                <th scope="col">{"ACTION "}</th>
              </tr>
            </thead>
            <tbody>
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
              <ChartOfAccountsData />
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Bank Accounts</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row row-cols-1 row-cols-lg-1">
              <div>
                <Input
                  labelName={"Name *"}
                  inputName={"name"}
                  inputType={"text"}
                  placeholder={"Name "}
                  validation={{ ...register("name", { required: true }) }}
                />
              </div>
            </div>
            <div className="col">
              <Select
                name={"payment"}
                labelName={"Type *"}
                placeholder={"Select One"}
                options={["BANK ACCOUNT", "SALES"]}
              />
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
            <div>
              <input type="radio" name="radio-1" className="radio" />
              <label>Yes</label>
              <input type="radio" name="radio-1" className="radio" />
              <label>No</label>
            </div>
            <div>
              <input type="radio" name="radio-2" />
              <label>Active</label>
              <input type="radio" name="radio-2" className="radio" />
              <label>DeActive</label>
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

export default ChartOfAccounts;
