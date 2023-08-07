import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const ManageTraining = () => {
  const [modal, setModal] = useState();
  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Training" />
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
        <ModalHeader toggle={toggle}>Create New Training</ModalHeader>
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
                <label htmlFor="exampleFormControlInput1">Trainer Option</label>
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option>{"Interrnal"}</option>
                  <option>{"External"}</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Training Type</label>
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option>{"Training"}</option>
                  <option>{"Training"}</option>
                </select>
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Trainer</label>
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option>{"Trainer"}</option>
                  <option>{"Trainer"}</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Training Cost</label>
                <input className="form-control" required={true} type="number" />
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Employee</label>
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option>{"accountant"}</option>
                  <option>{"Employee"}</option>
                </select>
              </div>
            </div>

            <div className="row m-t-15">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Start Date</label>
                <input className="form-control" required={true} type="date" />
              </div>
              <div className="col">
                <label htmlFor="exampleFormControlInput1">End Date</label>
                <input className="form-control" required={true} type="date" />
              </div>
            </div>
            <div className="row m-t-15">
              <div className="form-group mb-0">
                <label htmlFor="exampleFormControlTextarea4">Description</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea4"
                  rows="5"
                  placeholder="Enter Description"
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
                <th scope="col">{"Training Type"}</th>
                <th scope="col">{"Status"}</th>
                <th scope="col">{"Employee"}</th>
                <th scope="col">{"Trainer"}</th>
                <th scope="col">{"Training Duration"}</th>
                <th scope="col">{"Cost"}</th>
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
                <td></td>
                <td></td>                
                <td></td>                
              </tr> */}
            </tbody>
          </table>
          <p className="text-center p-t-10">No entries found</p>
        </div>
        {/* <p>Showing 1 to 1 of 1 entries</p> */}
      </div>
    </div>
  );
};

export default ManageTraining;
