import React, {useState, useEffect} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useForm} from "react-hook-form";
import Select from "../../../common/modal/Select";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import LeaveTypeUpdateModal from "../../../common/modal/Form/LeaveTypeUpdateModal";
import GetAllLeaveApplication from "../../../common/Query/hrm/GetAllLeaveApplication";
import GetAllLeaveType from "../../../common/Query/hrm/GetAllLeaveType";
import Input from "../../../common/modal/Input";
import LeaveApplicationUpdateModal from "../../../common/modal/Form/LeaveApplicationUpdateModal";

const LeaveApplication = () => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [leaveType, setLeaveType] = useState();
    const [modal, setModal] = useState();
    const [leaveApplication, setLeaveApplication] = useState([]);
    const [oldData, setOldData] = useState({});
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const [allLeaveApplicationStatus, allLeaveApplicationReFetch, allLeaveApplication, allLeaveApplicationError] = GetAllLeaveApplication();
    const [allLeaveTypeStatus, allLeaveTypeReFetch, allLeaveType, allLeaveTypeError] = GetAllLeaveType();


    useEffect(() => {
        setLeaveType([])
        allLeaveType?.data?.body?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.type
            }
            setLeaveType(prevLeaveType => [...prevLeaveType, set_data]);
        })
    }, [allLeaveType])
    useEffect(() => {
        setLeaveApplication(allLeaveApplication?.data?.body?.data);
    }, [allLeaveApplication])

    const dataUpdateToggle = (item) => {
        setOldData(item);
        setDataUpdateModal(!dataUpdateModal);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const onSubmit = (data) => {
        console.log(data);
        axios.post('/hrm-system/leave-application', data)
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
                allLeaveApplicationReFetch();
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
                axios.delete(`/hrm-system/leave-application/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        allLeaveApplicationReFetch();
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
                        {
                            leaveApplication?.map((item, index) =>
                                <tr key={index}>
                                    <td>{item?.leave_type_id}</td>
                                    <td>{item?.date_from}</td>
                                    <td>{item?.date_to}</td>
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
                <ModalHeader toggle={toggle}>Create Application</ModalHeader>
                <ModalBody>
                    <form className="m-t-15" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Select
                                labelName={"Leave Type"}
                                placeholder={"Select an option"}
                                options={leaveType}
                                validation={{...register("leave_type_id", {required: true})}}
                                error={errors?.leave_type_id}
                            />
                        </div>
                        <div className="row m-t-15">
                            <div className="col">
                                <Input
                                    labelName={"Date From"}
                                    inputName={"type"}
                                    inputType={"date"}
                                    placeholder={"Enter Leave Type"}
                                    validation={{...register("date_from", { required: true }),}}
                                />
                            </div>
                            <div className="col">
                                <Input
                                    labelName={"Date To"}
                                    inputName={"type"}
                                    inputType={"date"}
                                    placeholder={"Enter Leave Type"}
                                    validation={{...register("date_to", { required: true }),}}
                                />
                            </div>
                        </div>
                        <div className={"m-t-15"}>
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
                    <LeaveApplicationUpdateModal leaveType={leaveType} allLeaveApplicationReFetch={allLeaveApplicationReFetch} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></LeaveApplicationUpdateModal>
                    : ''
            }
        </>
    );
};

export default LeaveApplication;