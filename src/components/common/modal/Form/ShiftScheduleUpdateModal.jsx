import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Input from "../Input";
import Select from "../Select";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import GetAllShift from "../../Query/hrm/GetAllShift";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const ShiftScheduleUpdateModal = ({allShiftScheduleReFetch, oldData, dataUpdateModal, dataUpdateToggle, shift}) => {
    const [shiftForm, setShiftFrom] = useState('');
    const [shiftTo, setShiftTo] = useState('');
    const [activeOn, setActiveOn] = useState('');
    const [status, setStatus] = useState('');
    const {register, reset, handleSubmit, formState: {errors},} = useForm();


    const onSubmit = (data) => {
        const updatedData = {
            'date_from':data.date_from ? data.date_from : oldData.date_from,
            'date_to': data.date_to ? data.date_to : oldData.date_to,
            'shift_from':shiftForm ? shiftForm : oldData.shift_from,
            'shift_to':shiftTo ? shiftTo : oldData.shift_to,
            'active_on':activeOn ? activeOn : oldData.active_on,
            'status':status ? status : oldData.status
        }

        axios.put(`/hrm-system/shift-schedule/${oldData.id}`, updatedData)
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
                    allShiftScheduleReFetch();
                    reset();
                }
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    }
    return (
        <>
            <BaseModal title={"Update Shift Schedule"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Date From"}
                                inputName={"datefrom"}
                                inputType={"date"}
                                defaultValue={oldData?.date_from}
                                validation={{ ...register("date_from", { required: true }) }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Date To"}
                                inputName={"dateto"}
                                inputType={"date"}
                                defaultValue={oldData?.date_to}
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
                                setValue={setShiftFrom}
                                previous={oldData?.shift_from}
                                // validation={{...register("shift_from")}}
                                // error={errors?.shift_from}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Shift To"}
                                placeholder={"Select an option"}
                                options={shift}
                                setValue={setShiftTo}
                                previous={oldData?.shift_to}
                                // validation={{...register("shift_to")}}
                                // error={errors?.shift_to}
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
                            setValue={setActiveOn}
                            previous={oldData?.active_on}
                            // validation={{...register("active_on")}}
                            // error={errors?.active_on}
                        />
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                            previous={oldData?.status}
                            setValue={setStatus}
                            // validation={{...register("status")}}
                            // error={errors?.status}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={dataUpdateToggle} className="me-2">
                            Cancel
                        </Button>
                        <Button color="primary" type="submit">
                            Update
                        </Button>
                    </div>
                </form>
            </BaseModal>
        </>
    );
};

export default ShiftScheduleUpdateModal;