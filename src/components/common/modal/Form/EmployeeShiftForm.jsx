import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Input from "../Input";
import Select from "../Select";
import BaseModal from "../BaseModal";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import moment from "moment";
import GetEmployee from "../../Query/hrm/GetEmployee";
import GetAllWeekday from "../../Query/hrm/GetAllWeekday";
import GetAllShift from "../../Query/hrm/GetAllShift";
import GetAllShiftSchedule from "../../Query/hrm/GetAllShiftSchedule";

const EmployeeShiftForm = ({dataModal, dataToggle, refetch}) => {
    const [employee, setEmployee] = useState([]);
    const [shiftSchedule, setShiftSchedule] = useState([]);
    const [shift, setShift] = useState([]);
    const {register, handleSubmit, formState: {errors},} = useForm();
    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = GetEmployee();
    const [allShiftStatus, allShiftReFetch, allShift, allShiftError] = GetAllShift();
    const [allShiftScheduleStatus, allShiftScheduleReFetch, allShiftSchedule, allShiftScheduleError] = GetAllShiftSchedule();

    // console.log(allShiftSchedule);
    useEffect( () => {
        setEmployee([])
        allEmployee?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setEmployee(prevEmployee => [...prevEmployee, set_data]);
        })
    }, [allEmployee])

    useEffect( () => {
        setShiftSchedule([])
        allShiftSchedule?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.id
            }
            setShiftSchedule(prevShiftSchedule => [...prevShiftSchedule, set_data]);
        })
    }, [allShiftSchedule])

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

    const onSubmit = (data) => {
        axios.post('/hrm-system/employee-shift/', data)
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
                    dataToggle(false);
                    refetch();
                }

            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    };


    return (
        <>
            <BaseModal title={"Employee Shift"} dataModal={dataModal} dataToggle={dataToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Select
                                labelName={"Employee Name"}
                                placeholder={"Select an option"}
                                options={employee}
                                validation={{...register("employee_id", {required: true})}}
                                error={errors?.employee_id}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Shift"}
                                placeholder={"Select an option"}
                                options={shift}
                                validation={{...register("shift_id", {required: true})}}
                                error={errors?.shift_id}
                            />
                        </div>
                    </div>

                    <div>
                        <Select
                            labelName={"Shift Schedule"}
                            placeholder={"Select an option"}
                            options={shiftSchedule}
                            validation={{...register("shift_schedule_id", {required: true})}}
                            error={errors?.day_type}
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
                        <Button color="danger" onClick={dataToggle} className="me-2">
                            Cancel
                        </Button>
                        <Button color="primary" type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </BaseModal>
        </>
    );
};

export default EmployeeShiftForm;