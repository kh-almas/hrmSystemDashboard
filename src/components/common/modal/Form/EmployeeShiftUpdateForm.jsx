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

const EmployeeShiftUpdateForm = ({dataUpdateModal, dataUpdateToggle, oldData, refetch}) => {
    const [employee, setEmployee] = useState([]);
    const [shiftSchedule, setShiftSchedule] = useState([]);
    const [shift, setShift] = useState([]);
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = GetEmployee();
    const [allShiftScheduleStatus, allShiftScheduleReFetch, allShiftSchedule, allShiftScheduleError] = GetAllShiftSchedule();
    const [allShiftStatus, allShiftReFetch, allShift, allShiftError] = GetAllShift();


    useEffect(() => {
        reset();
    }, [oldData])

    useEffect( () => {
        setEmployee([]);
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
        setShift([]);
        allShift?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setShift(prevShift => [...prevShift, set_data]);
        })
    }, [allShift])


    const onSubmit = (data) => {
        const updatedData = {
            'employee_id':data.employee_id ? data.employee_id : oldData.employee_id,
            'shift_id': data.shift_id ? data.shift_id : oldData.shift_id,
            'shift_schedule_id':data.shift_schedule_id ? data.shift_schedule_id : oldData.shift_schedule_id,
            'status':data.status ? data.status : oldData.status
        }


        axios.put(`/hrm-system/employee-shift/${oldData.id}`, updatedData)
            .then(info => {
                console.log(info)
                if(info?.status == 200)
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dataUpdateToggle(false);
                    refetch();
                }
            })
            .catch(e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    };


    return (
        <>
            <BaseModal title={"Update Employee Shift"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Select
                                labelName={"Employee Name"}
                                placeholder={"Select an option"}
                                options={employee}
                                previous={oldData?.employee_id}
                                validation={{...register("employee_id")}}
                                error={errors?.employee_id}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Shift"}
                                placeholder={"Select an option"}
                                options={shift}
                                previous={oldData?.shift_id}
                                validation={{...register("shift_id")}}
                                error={errors?.shift_id}
                            />
                        </div>
                    </div>

                    <div>
                        <Select
                            labelName={"Shift Schedule"}
                            placeholder={"Select an option"}
                            options={shiftSchedule}
                            previous={oldData?.shift_schedule_id}
                            validation={{...register("shift_schedule_id")}}
                            error={errors?.day_type}
                        />
                    </div>

                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            previous={oldData?.status}
                            options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                            validation={{...register("status")}}
                            error={errors?.status}
                        />
                    </div>


                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={dataUpdateToggle} className="me-2">
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

export default EmployeeShiftUpdateForm;