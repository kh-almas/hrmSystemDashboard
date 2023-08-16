import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Input from "../../../common/modal/Input";
import {useForm} from "react-hook-form";
import Textarea from "../../../common/modal/Textarea";

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
                            <th scope="col">{"Employee"}</th>
                            <th scope="col">{"Type"}</th>
                            <th scope="col">{"Employee Comment"}</th>
                            <th scope="col">{"Supervisor Comment"}</th>
                            <th scope="col">{"Active"}</th>
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
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input labelName={"Employee"} inputName={"employee"} inputType={"text"} placeholder={"Enter employee name"} validation={{...register("employee", { required: true }),}}/>
                            </div>
                            <div>
                                <Input labelName={"Type"} inputName={"type"} inputType={"text"} placeholder={"Enter Leave Type"} validation={{...register("type", { required: true }),}}/>
                            </div>
                        </div>

                        <div>
                            <Textarea
                                labelName={"Employee Comment"}
                                inputName={"employeecomment"}
                                placeholder={"Enter Employee Comment"}
                                height={"5"}
                            />
                        </div>

                        <div>
                            <Textarea
                                labelName={"Supervisor Comment"}
                                inputName={"supervisorcomment"}
                                placeholder={"Enter Supervisor Comment"}
                                height={"5"}
                            />
                        </div>

                        <div>
                            <div class="checkbox checkbox-dark">
                                <input id="inline-1" type="checkbox" />
                                <label htmlFor="inline-1">Is Active</label>
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
        </>
    );
};

export default LeaveApplication;