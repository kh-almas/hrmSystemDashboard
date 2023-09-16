import React, {useEffect, useState} from 'react';
import Breadcrumb from '../../../common/breadcrumb';
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Input from "../../../common/modal/Input";
import {useForm} from "react-hook-form";
import Select from "../../../common/modal/Select";
import GetAllLeaveType from "../../../common/Query/hrm/GetAllLeaveType";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import DepartmentUpdateModal from "../../../common/modal/Form/DepartmentUpdateModal";
import LeaveTypeUpdateModal from "../../../common/modal/Form/LeaveTypeUpdateModal";

const LeaveType = () => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [modal, setModal] = useState();
    const [leaveType, setLeaveType] = useState([]);
    const [oldData, setOldData] = useState({});
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const [allLeaveTypeStatus, allLeaveTypeReFetch, allLeaveType, allLeaveTypeError] = GetAllLeaveType();
    // console.log(allLeaveType?.data?.body?.data);
    useEffect(() => {
        setLeaveType(allLeaveType?.data?.body?.data);
    }, [allLeaveType])

    const toggle = () => {
        setModal(!modal);
    };

    const dataUpdateToggle = (item) => {
        setOldData(item);
        setDataUpdateModal(!dataUpdateModal);
    };

    const onSubmit = (data) => {
        console.log(data);
        axios.post('/hrm-system/leave-type', data)
            .then(info => {
                if(info?.status == 200)
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setModal(!modal);
                }
                allLeaveTypeReFetch();
                reset();
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    };

    const deleteLeaveType = id => {
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
                axios.delete(`/hrm-system/leave-type/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        allLeaveTypeReFetch();
                    })
                    .catch(e => {
                        if(e?.response?.data?.body?.message?.sqlState === "23000")
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `Can not delete shift, if there have any attendance in this shift`,
                            })
                        }
                        // if (!empty(e?.response?.data?.body?.message?.details[0].message))
                        // {
                        //     Swal.fire({
                        //         icon: 'error',
                        //         title: 'Oops...',
                        //         text: `${e?.response?.data?.body?.message?.details[0].message}`,
                        //     })
                        // }
                    })
            }
        })
    }

    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Leave Type"/>
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
                            <th scope="col">{"On Leave Type"}</th>
                            <th scope="col">{"Status"}</th>
                            <th scope="col">{"Action"}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            leaveType?.map((item, index) =>
                                <tr key={index}>
                                    <td>{item?.type}</td>
                                    <td>{item?.status}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <button onClick={() => dataUpdateToggle(item)} className="btn me-2" style={{backgroundColor: "skyblue", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                <i className="icofont icofont-pencil-alt-5  rounded" style={{backgroundColor: "skyblue", color: "#ffffff",}}></i>
                                            </button>
                                            <button onClick={() => deleteLeaveType(item.id)} className="btn" style={{backgroundColor: "#ff3a6e", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                <i className="icofont icofont-trash rounded" style={{backgroundColor: "#ff3a6e", color: "#ffffff",}}></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }

                        </tbody>
                    </table>
                </div>
                <p className="p-l-10 p-t-10 text-center">Showing 1 to 1 of 1 entries</p>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create Leave Type</ModalHeader>
                <ModalBody>
                    <form className="m-t-15" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input
                                labelName={"On Leave Type"}
                                inputName={"type"}
                                inputType={"text"}
                                placeholder={"Enter Leave Type"}
                                validation={{...register("type", { required: true }),}}
                            />
                        </div>

                        <div>
                            <Select
                                labelName={"Status"}
                                placeholder={"Select an option"}
                                options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                                validation={{...register("status", {required: true})}}
                                error={errors?.status}
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
            {
                oldData ?
                    <LeaveTypeUpdateModal allLeaveTypeReFetch={allLeaveTypeReFetch} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></LeaveTypeUpdateModal>
                    : ''
            }
        </>
    );
};

export default LeaveType;