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
    const [status, setStatus] = useState('Active');
    const {register, reset, handleSubmit, formState: {errors},} = useForm();

    const [statusOptions, setStatusOptions] = useState([
        {value: "Active", label: "Active"},
        {value: "Inactive", label: "Inactive"}
    ])

    const [activeONData, setActiveOnData] = useState([
        {value: "Sunday", label: "Sunday"},
        {value: "Monday", label: "Monday"},
        {value: "Tuesday", label: "Tuesday"},
        {value: "Wednesday", label: "Wednesday"},
        {value: "Thursday", label: "Thursday"},
        {value: "Friday", label: "Friday"},
        {value: "Saturday", label: "Saturday"},
    ])

    useEffect(() => {
        const filterStatus = statusOptions?.find(data => data.value == oldData?.status)
        setStatus(filterStatus);

        const filterActiveON = activeONData?.find(data => data.value == oldData?.active_on)
        setActiveOn(filterActiveON);

        const filterShiftForm = shift?.find(data => data.value == oldData?.shift_from)
        setShiftFrom(filterShiftForm);

        const filterShiftTo= shift?.find(data => data.value == oldData?.shift_to)
        setShiftTo(filterShiftTo);
    }, [oldData])

    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };

    const handleChangeForUpdateActiveOn = (selected) => {
        setActiveOn(selected);
    };

    const handleChangeForUpdateShiftForm = (selected) => {
        setShiftFrom(selected);
    };

    const handleChangeForUpdateShiftTo = (selected) => {
        setShiftTo(selected);
    };

    const onSubmit = (data) => {
        const updatedData = {
            'date_from':data.date_from ? data.date_from : oldData.date_from,
            'date_to': data.date_to ? data.date_to : oldData.date_to,
            'shift_from':shiftForm?.value ? shiftForm?.value : oldData.shift_from,
            'shift_to':shiftTo?.value ? shiftTo?.value : oldData.shift_to,
            'active_on': activeOn?.value ? activeOn?.value : oldData.active_on,
            'status': status?.value ? status?.value : oldData.status
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
                                previous={shiftForm}
                                cngFn={handleChangeForUpdateShiftForm}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Shift To"}
                                placeholder={"Select an option"}
                                options={shift}
                                setValue={setShiftTo}
                                previous={shiftTo}
                                cngFn={handleChangeForUpdateShiftTo}
                            />
                        </div>
                    </div>
                    <div>
                        <Select
                            labelName={"Active On"}
                            placeholder={"Select an option"}
                            options={activeONData}
                            setValue={setActiveOn}
                            previous={activeOn}
                            cngFn={handleChangeForUpdateActiveOn}
                        />
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={statusOptions}
                            previous={status}
                            setValue={setStatus}
                            cngFn={handleChangeForUpdateStatus}
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