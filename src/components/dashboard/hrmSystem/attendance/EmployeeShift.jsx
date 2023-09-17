import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {useForm} from "react-hook-form";
import Select from "../../../common/modal/Select";
import Input from "../../../common/modal/Input";
import {Link} from "react-router-dom";
import axios from "../../../../axios";
import Swal from 'sweetalert2'
import BaseModal from "../../../common/modal/BaseModal";
import ManualAttendancesForm from "../../../common/modal/Form/ManualAttendancesForm";
import ManualAttendancesUpdateForm from "../../../common/modal/Form/ManualAttendancesUpdateForm";
import GetManualAttendance from "../../../common/Query/hrm/GetManualAttendance";
import GetSingleManualAttendance from "../../../common/Query/hrm/GetSingleManualAttendance";
import EmployeeShiftForm from "../../../common/modal/Form/EmployeeShiftForm";
import EmployeeShiftUpdateForm from "../../../common/modal/Form/EmployeeShiftUpdateForm";
import GetAllEmployeeShift from "../../../common/Query/hrm/GetAllEmployeeShift";

const EmployeeShift = () => {
    const [dataModal, setDataModal] = useState(false);
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const [modal, setModal] = useState();
    const [date, setDate] = useState(true);
    const [oldData, setOldDate] = useState();
    const [data, setData] = useState([]);
    const [totalItemCount, setTotalItemCount] = useState();
    const [allEmployeeShiftStatus, allEmployeeShiftReFetch, allEmployeeShift, allEmployeeShiftError] = GetAllEmployeeShift();

    useEffect(() => {
        setData(allEmployeeShift?.data?.body?.data);
        setTotalItemCount(allEmployeeShift?.data?.body?.data.length)
    }, [allEmployeeShift])


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

    const dataUpdateToggle = (item) => {
        setOldDate(item);
        console.log(item);
        setDataUpdateModal(!dataUpdateModal);
    };

    const deleteEmployeeShift = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/hrm-system/employee-shift/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        allEmployeeShiftReFetch();
                    })
                    .catch(e => {
                        // console.log(e);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${e?.response?.data?.body?.message?.details[0].message}`,
                        })
                    })
            }
        })
    }

    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Employee Shift List"/>
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
                <CommonSearchComponet/>
                <div className="table-responsive">
                    <table className="table">
                        <thead className=" table-border">
                        <tr>
                            <th scope="col">{"Employee"}</th>
                            <th scope="col">{"Shift"}</th>
                            <th scope="col">{"Shift Schedule"}</th>
                            <th scope="col">{"Status"}</th>
                            <th scope="col">{"Action"}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data ?
                                data?.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item?.employee_id }</td>
                                        <td>{item?.shift_id ?? 'N/A'}</td>
                                        <td>{item?.shift_schedule_id ?? 'N/A'}</td>
                                        <td>{item?.status ?? 'N/A'}</td>
                                        <td>
                                            <div className="d-flex justify-content-center">
                                                <button onClick={() => dataUpdateToggle(item)} className="btn me-2" style={{backgroundColor: "skyblue", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                    <i className="icofont icofont-pencil-alt-5  rounded" style={{backgroundColor: "skyblue", color: "#ffffff",}}></i>
                                                </button>
                                                <button onClick={() => deleteEmployeeShift(item.id)} className="btn" style={{backgroundColor: "#ff3a6e", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                    <i className="icofont icofont-trash rounded" style={{backgroundColor: "#ff3a6e", color: "#ffffff",}}></i>
                                                </button>
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

            <EmployeeShiftForm refetch={allEmployeeShiftReFetch} dataModal={dataModal} dataToggle={dataToggle}></EmployeeShiftForm>

            {
                oldData ?
                    <EmployeeShiftUpdateForm refetch={allEmployeeShiftReFetch} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></EmployeeShiftUpdateForm>
                    : ''
            }

        </>
    );
};

export default EmployeeShift;
