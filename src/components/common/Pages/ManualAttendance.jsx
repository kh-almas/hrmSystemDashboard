import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Breadcrumb from "../breadcrumb";
import CommonSearchComponet from "../salaryCard/CommonSearchComponet";
import {useForm} from "react-hook-form";
import Select from "../modal/Select";
import Input from "../modal/Input";
import Textarea from "../modal/Textarea";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const ManualAttendance = () => {
    const {register, handleSubmit, formState: {errors},} = useForm();
    const [dataModal, setDataModal] = useState(false);
    const [modal, setModal] = useState();
    const [date, setDate] = useState(true);


    const dateObj = new Date();
    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();
    const shortDate = `${year}-${month}`;

    const toggle = () => {
        setModal(!modal);
    };

    const dataToggle = () => {
        setDataModal(!dataModal);
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Manual Attendance List"/>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: "20px",
                }}
            >
                <button
                    onClick={dataToggle}
                    className="btn btn-pill btn-info btn-air-info btn-air-info"
                    style={{padding: "7px 13px", borderRadius: "5px"}}
                >
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            <div className="card" style={{padding: "20px"}}>
                <div className="row">
                    <div className="col-sm-12 col-xl-2">
                        <label htmlFor="exampleFormControlInput1">Type</label>
                        <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                            <div className="radio radio-primary">
                                <input
                                    id="radioinline1"
                                    type="radio"
                                    name="radio3"
                                    value="option1"
                                    onClick={() => setDate(true)}
                                />
                                <label className="mb-0" htmlFor="radioinline1">
                                    {Option}
                                    <span className="digits"> {"Monthly"}</span>
                                </label>
                            </div>
                            <div className="radio radio-primary">
                                <input
                                    id="radioinline2"
                                    type="radio"
                                    name="radio3"
                                    value="option1"
                                    onClick={() => setDate(false)}
                                />
                                <label className="mb-0" htmlFor="radioinline2">
                                    {Option}
                                    <span className="digits"> {"Daily"}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-5">
                        <div className="row">
                            {date && (
                                <div className="col">
                                    <label htmlFor="exampleFormControlInput1">Month</label>
                                    <input
                                        className="form-control"
                                        required={true}
                                        type="month"
                                        defaultValue={shortDate}
                                    />
                                </div>
                            )}
                            {!date && (
                                <div className="col">
                                    <label htmlFor="exampleFormControlInput1">Date</label>
                                    <input className="form-control" required={true} type="date"/>
                                </div>
                            )}
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Branch</label>
                                <select
                                    className="form-control digits"
                                    id="exampleFormControlSelect9"
                                    defaultValue="1"
                                >
                                    <option>{"Select branch"}</option>
                                    <option>{"accountant branch"}</option>
                                    <option>{"accountant branch"}</option>
                                    <option>{"other branch"}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-5">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Department</label>
                                <select
                                    className="form-control digits"
                                    id="exampleFormControlSelect9"
                                    defaultValue="1"
                                >
                                    <option>{"Select department"}</option>
                                    <option>{"accountant department"}</option>
                                    <option>{"accountant department"}</option>
                                    <option>{"other department"}</option>
                                </select>
                            </div>
                            <div className="col">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "20px",
                                        marginTop: "20px",
                                    }}
                                >
                                    <button
                                        className="btn btn-primary btn-lg"
                                        style={{padding: "5px 15px"}}
                                    >
                                        <i className="fa fa-search"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger btn-lg"
                                        style={{padding: "5px 15px", borderRadius: "5px"}}
                                    >
                                        <i className="fa fa-trash-o"></i>
                                    </button>
                                    <button
                                        onClick={toggle}
                                        className="btn btn-primary btn-lg"
                                        style={{padding: "5px 15px"}}
                                    >
                                        <i className="fa fa-paste"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Import employee CSV file</ModalHeader>
                <ModalBody>
                    <form className="m-t-15 m-b-15">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "20px",
                            }}
                        >
                            <h6 className="m-0">Download sample employee CSV file</h6>
                            <button className="btn btn-primary btn-lg">
                                {" "}
                                <i className="fa fa-upload"></i> Download
                            </button>
                        </div>
                        <label htmlFor="exampleFormControlInput1">Select CSV File</label>{" "}
                        <br/>
                        <input type="file"/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">
                        Upload
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            <div className="card" style={{padding: "20px"}}>
                <CommonSearchComponet/>
                <div className="table-responsive">
                    <table className="table">
                        <thead className=" table-border">
                        <tr>
                            <th scope="col">{"Employee"}</th>
                            <th scope="col">{"Date"}</th>
                            <th scope="col">{"Status"}</th>
                            <th scope="col">{"Clock In"}</th>
                            <th scope="col">{"Clock Out"}</th>
                            <th scope="col">{"Late"}</th>
                            <th scope="col">{"Early Leaving"}</th>
                            <th scope="col">{"Overtime"}</th>
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
                <td></td>
              </tr> */}
                        </tbody>
                    </table>
                    <p className="text-center p-t-10">No entries found</p>
                </div>
                <p>Showing 1 to 1 of 1 entries</p>
            </div>

            <Modal isOpen={dataModal} toggle={dataToggle}>
                <ModalHeader toggle={dataToggle}>Manual Attendance</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input
                                    labelName={"Employee Name"}
                                    inputName={"name"}
                                    inputType={"text"}
                                    placeholder={"Enter Employee name"}
                                    validation={{
                                        ...register("name", { required: true }),
                                    }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"Date"}
                                    inputName={"date"}
                                    inputType={"date"}
                                    validation={{ ...register("date", { required: true }) }}
                                />
                            </div>
                        </div>

                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input
                                    labelName={"Clock In"}
                                    inputName={"inTime"}
                                    inputType={"time"}
                                    validation={{ ...register("inTime", { required: true }) }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"Clock Out"}
                                    inputName={"outTime"}
                                    inputType={"time"}
                                    validation={{ ...register("outTime", { required: true }) }}
                                />
                            </div>
                        </div>

                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input
                                    labelName={"Early Leave"}
                                    inputName={"leave"}
                                    inputType={"time"}
                                    validation={{ ...register("leave", { required: true }) }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"Overtime"}
                                    inputName={"overtime"}
                                    inputType={"time"}
                                    validation={{ ...register("overtime", { required: true }) }}
                                />
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

                        <div>
                            <div class="checkbox checkbox-dark">
                                <input id="inline-1" type="checkbox" />
                                <label htmlFor="inline-1">Is Late</label>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button color="danger" onClick={dataToggle} className="me-2">
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

export default ManualAttendance;
