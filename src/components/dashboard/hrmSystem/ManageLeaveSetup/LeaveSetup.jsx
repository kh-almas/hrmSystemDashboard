import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Select from "../../../common/modal/Select";
import Input from "../../../common/modal/Input";
import {useForm} from "react-hook-form";

const LeaveSetup = () => {

    const {register, handleSubmit, formState: {errors},} = useForm();
    const [modal, setModal] = useState();

    const toggle = () => {
        setModal(!modal);
    };
    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Leave Setup"/>
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
                            {/*<th scope="col">{"Days"}</th>*/}
                            <th scope="col">{"Total Days"}</th>
                            <th scope="col">{"Year"}</th>
                            <th scope="col">{"Carry Foreword"}</th>
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
                <ModalHeader toggle={toggle}>Create Leave Setup</ModalHeader>
                <ModalBody>
                    <form className="m-t-15">
                        <div className="row row-cols-1 row-cols-md-2">
                            <div>
                                <Select
                                    name={"LeaveType"}
                                    labelName={"Leave Type"}
                                    placeholder={"Select an option"}
                                    options={[]}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"Total Days"}
                                    inputName={"totaldays"}
                                    inputType={"number"}
                                    placeholder={"Enter Total Leave Days"}
                                    validation={{
                                        ...register("type", { required: true }),
                                    }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"Select Year"}
                                    inputName={"leaveyear"}
                                    inputType={"text"}
                                    placeholder={"Enter year"}
                                    validation={{
                                        ...register("leaveyear", { required: true }),
                                    }}
                                />
                            </div>
                            <div>
                                <Select
                                    name={"carried"}
                                    labelName={"Carry Foreword"}
                                    placeholder={"Select an option"}
                                    options={["Yes", "No"]}
                                />
                            </div>
                            <div>
                                <Select
                                    name={"status"}
                                    labelName={"Status"}
                                    placeholder={"Select an option"}
                                    options={["Active", "Inactive"]}
                                />
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

export default LeaveSetup;