import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const ManageIndicator = () => {
  const [modal, setModal] = useState();

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Indicator" />
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
        <ModalHeader toggle={toggle}>Create New Indicator</ModalHeader>
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
                <label htmlFor="exampleFormControlInput1">Department</label>
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option>{"Select department"}</option>
                  <option>{"other department"}</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Designation</label>
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option>{"Select designation "}</option>
                  <option>{"other designation"}</option>
                </select>
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
                <th scope="col">{"Department"}</th>
                <th scope="col">{"Desigmation"}</th>
                <th scope="col">{"Overall Rating"}</th>
                <th scope="col">{"Added By"}</th>
                <th scope="col">{"Created At"}</th>
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

export default ManageIndicator;
