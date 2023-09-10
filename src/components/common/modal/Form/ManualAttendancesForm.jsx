import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Input from "../Input";
import Select from "../Select";
import BaseModal from "../BaseModal";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import moment from "moment";

const ManualAttendancesForm = ({dataModal, dataToggle}) => {
    const [employee, setEmployee] = useState([]);
    const [weekday, setWeekday] = useState([]);
    const [shift, setShift] = useState([]);
    const {register, handleSubmit, formState: {errors},} = useForm();

    useEffect(() => {
        axios.get('https://dashboard-hrm-system-backend.vercel.app/hrm-system/employee/')
            .then(info => {
                info?.data?.body?.data?.map(item => {
                    const set_data = {
                        id: item.id,
                        value: item.name
                    }
                    setEmployee(prevEmployee => [...prevEmployee, set_data]);
                })
            })
            .catch(e => {
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

        axios.get('https://dashboard-hrm-system-backend.vercel.app/hrm-system/weekday/')
            .then(info => {
                info?.data?.body?.data?.map(item => {
                    const set_data = {
                        id: item.id,
                        value: item.name
                    }
                    setWeekday(prevWeekday => [...prevWeekday, set_data]);
                })
            })
            .catch(e => {
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

        axios.get('https://dashboard-hrm-system-backend.vercel.app/hrm-system/shift')
            .then(info => {
                info?.data?.body?.data?.map(item => {
                    const set_data = {
                        id: item.id,
                        value: item.name
                    }
                    setShift(prevShift => [...prevShift, set_data]);
                })
            })
            .catch(e => {
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

    const formattedTime = time => moment(time, "HH:mm").format("HH:mm:ss");

    const onSubmit = (data) => {
        const in_time = formattedTime(data.in_time);
        data.in_time = in_time;
        const out_time = formattedTime(data.out_time);
        data.out_time = out_time;
        console.log(data);

        axios.post('https://dashboard-hrm-system-backend.vercel.app/hrm-system/manual-attendance', data)
            .then(info => {
                // console.log(info);
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
                }

            })
            .catch(e => {
                console.log(e);
                // Swal.fire({
                //     title: 'Something is wrong.',
                //     width: 600,
                //     padding: '3em',
                //     color: '#716add',
                //     background: '#fff url(/images/trees.png)',
                //     backdrop: `
                //         rgba(0,0,123,0.4)
                //         url("/images/nyan-cat.gif")
                //         left top
                //         no-repeat
                //       `
                // })
            })
    };


    return (
        <>
            <BaseModal title={"Manual Attendance"} dataModal={dataModal} dataToggle={dataToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Select
                                name={"employee"}
                                labelName={"Employee Name"}
                                placeholder={"Select an option"}
                                options={employee}
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
                                validation={{...register("day_type", {required: true})}}
                                error={errors?.day_type}
                            />
                        </div>
                        {/*<div>*/}
                        {/*    <Input*/}
                        {/*        labelName={"Employee Name"}*/}
                        {/*        inputName={"name"}*/}
                        {/*        inputType={"text"}*/}
                        {/*        placeholder={"Enter Employee name"}*/}
                        {/*        validation={{*/}
                        {/*            ...register("name", { required: true }),*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</div>*/}

                    </div>


                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Clock In"}
                                inputName={"inTime"}
                                inputType={"time"}
                                validation={{...register("in_time", {required: true})}}
                                error={errors?.in_time}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Clock Out"}
                                inputName={"outTime"}
                                inputType={"time"}
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

export default ManualAttendancesForm;