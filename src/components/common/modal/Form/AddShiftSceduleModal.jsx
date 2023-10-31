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
    const [shiftForm, setShiftFrom] = useState('');
    const [shiftTo, setShiftTo] = useState('');
    const [activeOn, setActiveOn] = useState('');
    const [status, setStatus] = useState('');
    const {register, reset, handleSubmit, formState: { errors },} = useForm();


    const onSubmit = (data) => {
        data.shift_from = shiftForm;
        data.shift_to = shiftTo;
        data.active_on = activeOn;
        data.status = status;
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
                            // validation={{...register("active_on", {required: true})}}
                            // error={errors?.active_on}
                            setValue={setActiveOn}
                        />
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                            // validation={{...register("status", {required: true})}}
                            // error={errors?.status}
                            setValue={setStatus}
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