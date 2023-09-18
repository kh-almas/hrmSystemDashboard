import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Select from "../../../common/modal/Select";

const EmployeeLeave = () => {
    const [modal, setModal] = useState();

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Employee Leave"/>
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
                    style={{padding: "5px 10px", borderRadius: "5px"}}
                >
                    <i className="fa fa-plus"></i>
                </button>
            </div>

            <div className="card" style={{padding: "20px"}}>
                <CommonSearchComponet/>
                <div className="table-responsive">
                    <table className="table">
                        <thead className=" table-border">
                        <tr>
                            <th scope="col">{"Employee"}</th>
                            <th scope="col">{"Leave Type"}</th>
                            <th scope="col">{"Applied On"}</th>
                            <th scope="col">{"Start Date"}</th>
                            <th scope="col">{"End Date"}</th>
                            <th scope="col">{"Total Days"}</th>
                            <th scope="col">{"Leave Reason"}</th>
                            <th scope="col">{"Status"}</th>
                            <th scope="col">{"Action"}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {/* <th scope="row">{"#EMP0000001"}</th>
                      <td>{"accountant"}</td>
                      <td>{"accountant@example.com"}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td></td>                      */}
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p className="p-l-10 p-t-10 text-center">Showing 1 to 1 of 1 entries</p>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create Employee Leave</ModalHeader>
                <ModalBody>
                    <form className="m-t-15">
                        <div className="col">
                            <label htmlFor="exampleFormControlInput1">Employee</label>
                            <select
                                className="form-control digits"
                                id="exampleFormControlSelect9"
                                defaultValue="1"
                            >
                                <option>{"Select Employee"}</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="exampleFormControlInput1">Leave Type</label>
                            <select
                                className="form-control digits"
                                id="exampleFormControlSelect9"
                                defaultValue="1"
                            >
                                <option>{"Select Leave Type"}</option>
                            </select>
                        </div>

                        <div className="row m-t-15">
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Start Date</label>
                                <input
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    required={true}
                                    type="date"
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">End Date</label>
                                <input
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    required={true}
                                    type="date"
                                />
                            </div>
                        </div>
                        <div className="row m-t-15">
                            <div className="form-group mb-0">
                                <label htmlFor="exampleFormControlTextarea4">
                                    Leave Reason
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea4"
                                    rows="5"
                                    placeholder="Leave Reason"
                                ></textarea>
                            </div>
                        </div>
                        <div className="row m-t-15">
                            <div className="form-group mb-0">
                                <label htmlFor="exampleFormControlTextarea4">Remark</label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea4"
                                    rows="5"
                                    placeholder="Leave Remark"
                                ></textarea>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Select
                                name={"status"}
                                labelName={"Status"}
                                placeholder={"Select an option"}
                                options={["Approve", "Decline", "Pending"]}
                            />
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
        </>
    );
};

export default EmployeeLeave;
