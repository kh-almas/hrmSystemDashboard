import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Link} from "react-router-dom";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Input from "../../../common/modal/Input";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Select from "../../../common/modal/Select";
import {useForm} from "react-hook-form";

const ShiftSchedule = () => {
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
    const [selectAllDays, setSelectAllDays] = useState(false);

    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Shift Schedule" />
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
                                        <th scope="col">{"Date From"}</th>
                                        <th scope="col">{"Date To"}</th>
                                        <th scope="col">{"Shift From"}</th>
                                        <th scope="col">{"Shift To"}</th>
                                        <th scope="col">{"Weekdays"}</th>
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
                <ModalHeader toggle={toggle}>Shift Schedule Entry</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input
                                    labelName={"Date From"}
                                    inputName={"datefrom"}
                                    inputType={"date"}
                                    validation={{ ...register("datefrom", { required: true }) }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"Date To"}
                                    inputName={"dateto"}
                                    inputType={"date"}
                                    validation={{ ...register("dateto", { required: true }) }}
                                />
                            </div>
                        </div>

                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Select
                                    name={"shiftfrom"}
                                    labelName={"Shift From"}
                                    placeholder={"Select an option"}
                                    options={["Morning", "Evening", "Night"]}
                                />
                            </div>
                            <div>
                                <Select
                                    name={"shiftto"}
                                    labelName={"Shift To"}
                                    placeholder={"Select an option"}
                                    options={["Morning", "Evening", "Night"]}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="weekdays">Active On</label>
                            <div>
                                <div class="animate-chk">
                                    <div class="row">
                                        <div class="col">
                                            <label className="d-block" htmlFor="chk-ani">
                                                <input onClick={() => setSelectAllDays(!selectAllDays)} className="checkbox_animated" id="chk-ani" type="checkbox" />
                                                All Days
                                            </label>
                                            <label className="d-block" htmlFor="chk-ani">
                                                <input checked={selectAllDays} className="checkbox_animated" id="chk-ani" type="checkbox" />
                                                Sunday
                                            </label>
                                            <label className="d-block" htmlFor="chk-ani1">
                                                <input checked={selectAllDays} className="checkbox_animated" id="chk-ani1" type="checkbox" />
                                                Monday
                                            </label>
                                            <label className="d-block" htmlFor="chk-ani2">
                                                <input checked={selectAllDays} className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                Tuesday
                                            </label>
                                            <label className="d-block" htmlFor="chk-ani3">
                                                <input checked={selectAllDays} className="checkbox_animated" id="chk-ani3" type="checkbox" />
                                                Wednesday
                                            </label>
                                            <label className="d-block" htmlFor="chk-ani3">
                                                <input checked={selectAllDays} className="checkbox_animated" id="chk-ani3" type="checkbox" />
                                                Thursday
                                            </label>
                                            <label className="d-block" htmlFor="chk-ani3">
                                                <input checked={selectAllDays} className="checkbox_animated" id="chk-ani3" type="checkbox" />
                                                Friday
                                            </label>
                                            <label className="d-block" htmlFor="chk-ani3">
                                                <input checked={selectAllDays} className="checkbox_animated" id="chk-ani3" type="checkbox" />
                                                Saturday
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Select
                                name={"status"}
                                labelName={"Status"}
                                placeholder={"Select an option"}
                                options={["Active", "Inactive"]}
                            />
                        </div>

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

export default ShiftSchedule;