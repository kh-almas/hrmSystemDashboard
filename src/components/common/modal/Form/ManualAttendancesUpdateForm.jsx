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

const ManualAttendancesForm = ({dataUpdateModal, dataUpdateToggle, oldData, setIsChanged, isChanged}) => {
    // console.log(oldData)
    const [employee, setEmployee] = useState([]);
    const [weekday, setWeekday] = useState([]);
    const [shift, setShift] = useState([]);
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = GetEmployee();
    const [allWeekdayStatus, allWeekdayReFetch, allWeekday, allWeekdayError] = GetAllWeekday();
    const [allShiftStatus, allShiftReFetch, allShift, allShiftError] = GetAllShift();
    console.log(weekday);


    useEffect(() => {
        reset();
        const formattedTime = time => moment(time, "HH:mm:ss").format("HH:mm");
        const in_time = formattedTime(oldData.in_time);
        oldData.in_time = in_time;
        const late = formattedTime(oldData.late);
        oldData.late = late;
        const out_time = formattedTime(oldData.out_time);
        oldData.out_time = out_time;
        const over_time = formattedTime(oldData.over_time);
        oldData.over_time = over_time;
    }, [oldData])

    useEffect( () => {
        setEmployee([]);
        allEmployee?.data?.body?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setEmployee(prevEmployee => [...prevEmployee, set_data]);
        })
    }, [allEmployee])

    useEffect( () => {
        setWeekday([]);
        allWeekday?.data?.body?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setWeekday(prevWeekday => [...prevWeekday, set_data]);
        })
    }, [allWeekday])

    useEffect(() => {
        setShift([]);
        allShift?.data?.body?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setShift(prevShift => [...prevShift, set_data]);
        })
    }, [shift])

    const formattedTime = time => moment(time, "HH:mm").format("HH:mm:ss");

    const onSubmit = (data) => {
        const in_time = formattedTime(data.in_time);
        data.in_time = in_time;
        const out_time = formattedTime(data.out_time);
        data.out_time = out_time;

        axios.put(`/hrm-system/manual-attendance/${oldData.id}`, data)
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
                    dataUpdateToggle(false);
                    setIsChanged(!isChanged);
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
            <BaseModal title={"Update Manual Attendance"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Select
                                name={"employee"}
                                labelName={"Employee Name"}
                                placeholder={"Select an option"}
                                options={employee}
                                previous={oldData?.employee_id}
                                validation={{...register("employee_id", {required: true})}}
                                error={errors?.employee_id}
                            />
                            {/*<span className="text-danger">*/}
                            {/*    {errors?.employee_id && `Employee is required`}*/}
                            {/*</span>*/}
                        </div>
                        <div>
                            <Input
                                labelName={"Date"}
                                inputName={"date"}
                                inputType={"date"}
                                defaultValue={oldData?.date}
                                validation={{...register("date", {required: true})}}
                                error={errors?.date}
                            />
                            {/*<span className="text-danger">*/}
                            {/*    {errors?.date && `Date is required`}*/}
                            {/*</span>*/}
                        </div>
                        <div>
                            <Select
                                name={"shift"}
                                labelName={"Shift"}
                                placeholder={"Select an option"}
                                previous={oldData?.shift_id}
                                options={shift}
                                validation={{...register("shift_id", {required: true})}}
                                error={errors?.shift_id}
                            />
                        </div>
                        <div>
                            <Select
                                name={"day_type"}
                                labelName={"Weekday"}
                                placeholder={"Select an option"}
                                options={weekday}
                                previous={oldData?.day_type}
                                validation={{...register("day_type", {required: true})}}
                                error={errors?.day_type}
                            />
                        </div>

                    </div>


                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Clock In"}
                                inputName={"inTime"}
                                inputType={"time"}
                                defaultValue={oldData?.in_time}
                                validation={{...register("in_time", {required: true})}}
                                error={errors?.in_time}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Clock Out"}
                                inputName={"outTime"}
                                inputType={"time"}
                                defaultValue={oldData?.out_time}
                                validation={{...register("out_time", {required: true})}}
                                error={errors?.out_time}
                            />
                        </div>
                    </div>

                    <div>
                        <Select
                            name={"status"}
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            previous={oldData?.status}
                            options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                            validation={{...register("status", {required: true})}}
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

export default ManualAttendancesForm;