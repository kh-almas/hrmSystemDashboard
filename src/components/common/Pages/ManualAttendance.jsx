import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Breadcrumb from "../breadcrumb";
import CommonSearchComponet from "../salaryCard/CommonSearchComponet";
import {useForm} from "react-hook-form";
import Select from "../modal/Select";
import Input from "../modal/Input";
import {Link} from "react-router-dom";
import axios from "../../../axios";
import Swal from 'sweetalert2'
import BaseModal from "../modal/BaseModal";
import ManualAttendancesForm from "../modal/Form/ManualAttendancesForm";

const ManualAttendance = () => {
    const [dataModal, setDataModal] = useState(false);
    const [modal, setModal] = useState();
    const [date, setDate] = useState(true);
    const [data, setData] = useState([]);
    const [totalItemCount, setTotalItemCount] = useState();

    useEffect(() => {
        axios.get('https://dashboard-hrm-system-backend.vercel.app/hrm-system/manual-attendance')
            // .then(res => res.json())
            .then(info => {
                // console.log(info.data.body.data);
                setTotalItemCount(info.data.body.data.length)
                setData(info.data.body.data);
            })
            .catch(e => {
                console.log(e);
                Swal.fire({
                    title: 'Something is wrong.',
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    background: '#fff url(/images/trees.png)',
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("/images/nyan-cat.gif")
                        left top
                        no-repeat
                      `
                })
            })
    }, [])


    const timeFormat = time => {
        if (time){
            const timeArray = time.split(":");
            return `${timeArray[0]}h ${timeArray[1]}m`;
        }
    }

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
                        {
                            data ?
                                data?.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item?.employee_name }</td>
                                        <td>{item?.date ?? 'N/A'}</td>
                                        <td>{item?.status ?? 'N/A'}</td>
                                        <td>{timeFormat(item?.in_time) ?? 'N/A'}</td>
                                        <td>{timeFormat(item?.out_time) ?? 'N/A'}</td>
                                        <td>{timeFormat(item?.late) ?? 'N/A'}</td>
                                        <td>{timeFormat(item?.early_out) ?? 'N/A'}</td>
                                        <td>{timeFormat(item?.over_time) ?? 'N/A'}</td>
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
                                )
                                 :
                                <tr>
                                    <td rowSpan={9}>
                                        <p>No entries found</p>
                                    </td>
                                </tr>
                        }
                        </tbody>
                    </table>

                </div>
                <p className="mt-3">Showing {totalItemCount} to {totalItemCount} of {totalItemCount} entries</p>
            </div>

            <ManualAttendancesForm dataModal={dataModal} dataToggle={dataToggle}></ManualAttendancesForm>
        </>
    );
};

export default ManualAttendance;
