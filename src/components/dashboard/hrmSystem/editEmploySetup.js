import React from "react";
import Breadcrumb from "../../common/breadcrumb";
import {Link} from "react-router-dom";

const EditEmploySetup = () => {
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Edit Employee" id="#EMP0000001" />
      <div className="row">
        <div className="col-sm-12 col-xl-6">
          <div className="card" style={{ height: "450px" }}>
            <div className="card-header">
              <h4>Personal Detail</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Name*</label>
                    <input
                      className="form-control"
                      id="exampleFormControlInput1"
                      required={true}
                      type="text"
                      placeholder="accountant"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Phone*</label>
                    <input
                      className="form-control"
                      required={true}
                      type="number"
                      placeholder="Phone"
                    />
                  </div>
                </div>
              </div>
              <div className="row m-t-15">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Date of Birth*</label>
                    <input
                      className="form-control"
                      id="exampleFormControlInput1"
                      required={true}
                      type="date"
                      placeholder="accountant"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group ">
                    <label htmlFor="exampleFormControlInput1">Gender*</label>
                    <div className="form-group m-checkbox-inline mb-0 custom-radio-ml m-t-10">
                      <div className="radio radio-primary">
                        <input
                          id="radioinline1"
                          required={true}
                          type="radio"
                          name="radio3"
                          value="option1"
                        />
                        <label className="mb-0" htmlFor="radioinline1">
                          <span className="digits"> {"Male"}</span>
                        </label>
                      </div>
                      <div className="radio radio-primary">
                        <input
                          id="radioinline2"
                          required={true}
                          type="radio"
                          name="radio3"
                          value="option1"
                        />
                        <label className="mb-0" htmlFor="radioinline2">
                          <span className="digits"> {"Female"}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row m-t-15">
                <div className="col">
                  <div className="form-group mb-0">
                    <label htmlFor="exampleFormControlTextarea4">
                      Address*
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea4"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-xl-6">
          <div className="card" style={{ height: "450px" }}>
            <div className="card-header">
              <h4>Company Detail</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">Employee ID</label>
                  <input
                    className="form-control"
                    id="exampleFormControlInput1"
                    required={true}
                    type="number"
                    defaultValue={"#EMP0000001"}
                    placeholder="#EMP0000001"
                  />
                </div>
              </div>
              <div className="row m-t-15">
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">Branch</label>
                  <select
                    className="form-control digits"
                    id="exampleFormControlSelect9"
                    defaultValue="1"
                  >
                    <option>{"Select Branch"}</option>
                    <option>{"2Select Branch"}</option>
                    <option>{"3Select Branch"}</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">Department</label>
                  <select
                    className="form-control digits"
                    id="exampleFormControlSelect9"
                    defaultValue="1"
                  >
                    <option>{"2Select Department"}</option>
                    <option>{"3Select Department"}</option>
                  </select>
                </div>
              </div>
              <div className="row m-t-15">
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">Designation</label>
                  <select
                    className="form-control digits"
                    id="exampleFormControlSelect9"
                    defaultValue="1"
                  >
                    <option>{"Select any Designation"}</option>
                    <option>{"Select any Designation"}</option>
                    <option>{"Select any Designation"}</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">Department</label>
                  <input
                    className="form-control"
                    id="exampleFormControlInput1"
                    required={true}
                    type="date"
                    placeholder="accountant"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-xl-6">
          <div className="card" style={{ height: "450px" }}>
            <div className="card-header">
              <h4>Document</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xl-6">
          <div className="card" style={{ height: "450px" }}>
            <div className="card-header">
              <h4>Bank Account Detail</h4>
            </div>
            <div className="card-body">
              <div className="row m-t-15">
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">
                    Account Holder Name
                  </label>
                  <input
                    className="form-control"
                    id="exampleFormControlInput1"
                    required={true}
                    type="text"
                  />
                </div>
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">
                    Account Number
                  </label>
                  <input
                    className="form-control"
                    id="exampleFormControlInput1"
                    required={true}
                    type="number"
                  />
                </div>
              </div>
              <div className="row m-t-15">
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">Bank Name</label>
                  <input
                    className="form-control"
                    id="exampleFormControlInput1"
                    required={true}
                    type="text"
                  />
                </div>
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">
                    Bank Identifier Code
                  </label>
                  <input
                    className="form-control"
                    id="exampleFormControlInput1"
                    required={true}
                    type="number"
                  />
                </div>
              </div>
              <div className="row m-t-15">
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">
                    Branch Location
                  </label>
                  <input
                    className="form-control"
                    id="exampleFormControlInput1"
                    required={true}
                    type="text"
                  />
                </div>
                <div className="col">
                  <label htmlFor="exampleFormControlInput1">Tax Payer Id</label>
                  <input
                    className="form-control"
                    id="exampleFormControlInput1"
                    required={true}
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary"
          style={{
            width: "max-content",
            marginLeft: "auto",
            marginBottom: "30px",
            marginRight: "10px",
          }}
          type="submit"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditEmploySetup;
