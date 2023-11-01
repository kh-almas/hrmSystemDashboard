import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import moment from "moment";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import getAllOrganization from "../../Query/hrm/GetAllOrganization";
import getAllBranch from "../../Query/hrm/GetAllBranch";

const AddShiftSceduleModal = ({modal, toggle, reFetch, shift}) => {
    const {register, reset, handleSubmit, formState: { errors },} = useForm();
    const [status, setStatus] = useState('Active');
    const [shiftForm, setShiftFrom] = useState('');
    const [shiftTo, setShiftTo] = useState('');
    const [activeOn, setActiveOn] = useState('');


    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };

    const handleChangeForUpdateShiftForm = (selected) => {
        setShiftFrom(selected);
    };

    const handleChangeForUpdateShiftTo = (selected) => {
        setShiftTo(selected);
    };

    const handleChangeForUpdateActiveOn = (selected) => {
        setActiveOn(selected);
    };

    const onSubmit = (data) => {
        data.shift_from = shiftForm?.value;
        data.shift_to = shiftTo?.value;
        data.active_on = activeOn?.value;
        data.status = status?.value;
        console.log(data);
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
                    toggle();
                    reFetch();
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

    return (
        <>
            <BaseModal title={"Add Shift Schedule"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Date From"}
                                inputName={"datefrom"}
                                inputType={"date"}
                                validation={{ ...register("date_from", { required: true }) }}
                                error={errors?.date_from}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Date To"}
                                inputName={"dateto"}
                                inputType={"date"}
                                validation={{ ...register("date_to", { required: true }) }}
                                error={errors?.date_to}
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
                                // validation={{...register("shift_from", {required: true})}}
                                // error={errors?.shift_from}
                                cngFn={handleChangeForUpdateShiftForm}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Shift To"}
                                placeholder={"Select an option"}
                                options={shift}
                                // validation={{...register("shift_to", {required: true})}}
                                // error={errors?.shift_to}
                                setValue={setShiftTo}
                                cngFn={handleChangeForUpdateShiftTo}
                            />
                        </div>
                    </div>
                    <div>
                        <Select
                            labelName={"Active On"}
                            placeholder={"Select an option"}
                            options={[
                                {value: "Sunday", label: "Sunday"},
                                {value: "Monday", label: "Monday"},
                                {value: "Tuesday", label: "Tuesday"},
                                {value: "Wednesday", label: "Wednesday"},
                                {value: "Thursday", label: "Thursday"},
                                {value: "Friday", label: "Friday"},
                                {value: "Saturday", label: "Saturday"},
                            ]}
                            // validation={{...register("active_on", {required: true})}}
                            // error={errors?.active_on}
                            setValue={setActiveOn}
                            cngFn={handleChangeForUpdateActiveOn}
                        />
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={[{value: "Active", label: "Active"}, {value: "Inactive", label: "Inactive"}]}
                            setValue={setStatus}
                            cngFn={handleChangeForUpdateStatus}
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
            </BaseModal>
        </>
    );
};

export default AddShiftSceduleModal;