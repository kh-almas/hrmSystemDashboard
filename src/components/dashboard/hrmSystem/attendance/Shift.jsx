import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap"
import Input from "../../../common/modal/Input";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const Shift = () => {
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
    };
    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Shift" />
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
                    style={{ padding: "7px 13px", borderRadius: "5px" }}
                >
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card" style={{ padding: "20px" }}>
                            <CommonSearchComponet />
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className=" table-border">
                                    <tr>
                                        <th scope="col">{"Shift Id"}</th>
                                        <th scope="col">{"Shift Name"}</th>
                                        <th scope="col">{"Start Time"}</th>
                                        <th scope="col">{"End Time"}</th>
                                        <th scope="col">{"Weekend"}</th>
                                        <th scope="col">{"Status"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{"#EMP0000001"}</td>
                                        <td>{"accountant"}</td>
                                        <td>{"accountant@example.com"}</td>
                                        <td>{""}</td>
                                        <td>{""}</td>
                                        <td>{""}</td>
                                        <td>
                                            <div className="d-flex justify-content-center">
                                                <Link to="/dashboard/hrm/edit">
                                                    <i
                                                        style={{
                                                            backgroundColor: "skyblue",
                                                            color: "#ffffff",
                                                        }}
                                                        className="icofont icofont-pencil-alt-5  rounded m-r-15 p-2"
                                                    ></i>
                                                </Link>
                                                <Link to="/dashboard/hrm/employee">
                                                    {" "}
                                                    <i
                                                        style={{
                                                            backgroundColor: "#ff3a6e",
                                                            color: "#ffffff",
                                                        }}
                                                        className="icofont icofont-trash rounded p-2"
                                                    ></i>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="p-l-10 p-t-10">Showing 1 to 1 of 1 entries</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Trip</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input
                                labelName={"Shift Name"}
                                inputName={"name"}
                                inputType={"text"}
                                placeholder={"Enter shift name"}
                                validation={{
                                    ...register("naem", { required: true }),
                                }}
                            />
                        </div>
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input
                                    labelName={"Start Time"}
                                    inputName={"starttime"}
                                    inputType={"time"}
                                    validation={{ ...register("starttime", { required: true }) }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"End Time"}
                                    inputName={"endtime"}
                                    inputType={"time"}
                                    validation={{ ...register("endtime", { required: true }) }}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="weekdays">Weekend</label>
                            <DropdownMultiselect
                                options={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
                                name="weekdays"
                            />
                            {/*<div>*/}
                            {/*    <Select*/}
                            {/*        name={"weekend"}*/}
                            {/*        labelName={"Weekend"}*/}
                            {/*        placeholder={"Select an option"}*/}
                            {/*        options={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </div>
                        {/*<div>*/}
                        {/*    <div>*/}
                        {/*        <Select*/}
                        {/*            name={"weekend"}*/}
                        {/*            labelName={"Weekend"}*/}
                        {/*            placeholder={"Select an option"}*/}
                        {/*            options={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="d-flex justify-content-end">
                            <Button color="danger" onClick={toggle} className="me-2">
                                Cancel
                            </Button>
                            <Button color="primary" type="submit">
                                Create
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
};

export default Shift;