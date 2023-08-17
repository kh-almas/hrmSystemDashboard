import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Input from "../../../common/modal/Input";
import {useForm} from "react-hook-form";
import Textarea from "../../../common/modal/Textarea";
import Select from "../../../common/modal/Select";

const LeaveApplication = () => {
    const {register, handleSubmit, formState: {errors},} = useForm();
    const [modal, setModal] = useState();

    const toggle = () => {
        setModal(!modal);
    };
    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Leave Application"/>
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
                            <th scope="col">{"Leave Type"}</th>
                            <th scope="col">{"Date From"}</th>
                            <th scope="col">{"Date To"}</th>
                            <th scope="col">{"Status"}</th>
                            <th scope="col">{"Action"}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {/*
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>                      */}
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p className="p-l-10 p-t-10 text-center">Showing 1 to 1 of 1 entries</p>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create Application</ModalHeader>
                <ModalBody>
                    <form className="m-t-15">
                        <div>
                            <Select
                                name={"LeaveType"}
                                labelName={"Leave Type"}
                                placeholder={"Select an option"}
                                options={[]}
                            />
                        </div>
                        <div className="row m-t-15">
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Date From</label>
                                <input
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    required={true}
                                    type="date"
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Date To</label>
                                <input
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    required={true}
                                    type="date"
                                />
                            </div>
                        </div>
                        <div>
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

export default LeaveApplication;