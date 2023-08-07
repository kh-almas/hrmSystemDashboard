import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const ManageTrainer = () => {
  const [modal, setModal] = useState();
  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Trainer" />
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Trainer</ModalHeader>
        <ModalBody>
          <form className="m-t-15 m-b-15">
            <div className="col">
              <label htmlFor="exampleFormControlInput1">Branch</label>
              <select
                className="form-control digits"
                id="exampleFormControlSelect9"
                defaultValue="1"
              >
                <option>{"Select branch"}</option>
                <option>{"other branch"}</option>
              </select>
            </div>
            <div className="row m-t-15">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">First Name</label>
                <input
                  className="form-control"
                  id="exampleFormControlInput1"
                  required={true}
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Last Name</label>
                <input
                  className="form-control"
                  id="exampleFormControlInput1"
                  required={true}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Contact</label>
                <input
                  className="form-control"
                  id="exampleFormControlInput1"
                  required={true}
                  type="text"
                  placeholder="Contact"
                />
              </div>
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Email</label>
                <input
                  className="form-control"
                  id="exampleFormControlInput1"
                  required={true}
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="row m-t-15">
              <div className="form-group mb-0">
                <label htmlFor="exampleFormControlTextarea4">Expertise</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea4"
                  rows="5"
                  placeholder="Enter Expertise"
                ></textarea>
              </div>
            </div>
            <div className="row m-t-15">
              <div className="form-group mb-0">
                <label htmlFor="exampleFormControlTextarea4">Address</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea4"
                  rows="5"
                  placeholder="Enter Address"
                ></textarea>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Create
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div className="card" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className=" table-border">
              <tr>
                <th scope="col">{"Branch"}</th>
                <th scope="col">{"Full Name"}</th>
                <th scope="col">{"Contact"}</th>
                <th scope="col">{"Email"}</th>
                <th scope="col">{"Action"}</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <th scope="row">{""}</th>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>                           
              </tr> */}
            </tbody>
          </table>
          <p className="text-center p-t-10 table-text">No entries found</p>
        </div>
        {/* <p>Showing 1 to 1 of 1 entries</p> */}
      </div>
    </div>
  );
};

export default ManageTrainer;
