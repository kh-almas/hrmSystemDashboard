import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import GetAllShift from "../../../common/Query/hrm/GetAllShift";
import GetAllShiftSchedule from "../../../common/Query/hrm/GetAllShiftSchedule";
import ShiftScheduleUpdateModal from "../../../common/modal/Form/ShiftScheduleUpdateModal";

const ShiftSchedule = () => {
    const {register, handleSubmit, reset, formState: { errors },} = useForm();
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);
    const [oldData, setOldData] = useState([]);
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const [shift, setShift] = useState([]);
    const [allShiftStatus, allShiftReFetch, allShift, allShiftError] = GetAllShift();
    const [allShiftScheduleStatus, allShiftScheduleReFetch, allShiftSchedule, allShiftScheduleError] = GetAllShiftSchedule();

    console.log(allShiftSchedule);

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        setShift([])
        allShift?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setShift(prevShift => [...prevShift, set_data]);
        })
    }, [allShift])

    useEffect(() => {
        setData(allShiftSchedule?.data?.body?.data?.data);
    }, [allShiftSchedule])


    const onSubmit = (data) => {
        axios.post('/hrm-system/shift-schedule', data)
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
                    // allShiftScheduleReFetch();
                    reset();
                }
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`,
                })
            })
    };

    const dataUpdateToggle = (item) => {
        setOldData(item);
        setDataUpdateModal(!dataUpdateModal);
    };

    const deleteSchedule = id => {
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
                axios.delete(`/hrm-system/shift-schedule/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        // allShiftScheduleReFetch();
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
                    })
            }
        })
    }

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
                                        <th scope="col">{"SL"}</th>
                                        <th scope="col">{"Date From"}</th>
                                        <th scope="col">{"Date To"}</th>
                                        <th scope="col">{"Shift From"}</th>
                                        <th scope="col">{"Shift To"}</th>
                                        <th scope="col">{"Active On"}</th>
                                        <th scope="col">{"Status"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data?.map((item, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.date_from}</td>
                                                <td>{item?.date_to}</td>
                                                <td>{item?.s_shift}</td>
                                                <td>{item?.e_shift}</td>
                                                <td>{item?.active_on}</td>
                                                <td>{item?.status}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <button onClick={() => dataUpdateToggle(item)} className="btn me-2" style={{backgroundColor: "skyblue", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                            <i className="icofont icofont-pencil-alt-5  rounded" style={{backgroundColor: "skyblue", color: "#ffffff",}}></i>
                                                        </button>
                                                        <button onClick={() => deleteSchedule(item.id)} className="btn" style={{backgroundColor: "#ff3a6e", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
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
                                    validation={{ ...register("date_from", { required: true }) }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"Date To"}
                                    inputName={"dateto"}
                                    inputType={"date"}
                                    validation={{ ...register("date_to", { required: true }) }}
                                />
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Select
                                    labelName={"Shift From"}
                                    placeholder={"Select an option"}
                                    options={shift}
                                    validation={{...register("shift_from", {required: true})}}
                                    error={errors?.shift_from}
                                />
                            </div>
                            <div>
                                <Select
                                    labelName={"Shift To"}
                                    placeholder={"Select an option"}
                                    options={shift}
                                    validation={{...register("shift_to", {required: true})}}
                                    error={errors?.shift_to}
                                />
                            </div>
                        </div>
                        <div>
                            <Select
                                labelName={"Active On"}
                                placeholder={"Select an option"}
                                options={[
                                    {id: "Sunday", value: "Sunday"},
                                    {id: "Monday", value: "Monday"},
                                    {id: "Tuesday", value: "Tuesday"},
                                    {id: "Wednesday", value: "Wednesday"},
                                    {id: "Thursday", value: "Thursday"},
                                    {id: "Friday", value: "Friday"},
                                    {id: "Saturday", value: "Saturday"},
                                ]}
                                validation={{...register("active_on", {required: true})}}
                                error={errors?.active_on}
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
                    <ShiftScheduleUpdateModal shift={shift} allShiftScheduleReFetch={allShiftScheduleReFetch} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></ShiftScheduleUpdateModal>
                    : ''
            }
        </>
    );
};

export default ShiftSchedule;