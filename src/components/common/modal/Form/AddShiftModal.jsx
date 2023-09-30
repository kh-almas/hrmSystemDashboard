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

const AddShiftModal = ({modal, toggle, reFetch}) => {
    const [company, setCompany] = useState([]);
    const {register, handleSubmit, formState: { errors },} = useForm();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();

    useEffect(() => {
        setCompany([])
        allCompany?.data?.body?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setCompany(prevShift => [...prevShift, set_data]);
        })
    }, [allCompany])

    const formattedTime = time => moment(time, "HH:mm").format("HH:mm:ss");

    const onSubmit = (data) => {
        const start_time = formattedTime(data.start_time);
        data.start_time = start_time;
        const end_time = formattedTime(data.end_time);
        data.end_time = end_time;

        axios.post('/hrm-system/shift', data)
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
                }
                reFetch();
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    }

    return (
        <>
            <BaseModal title={"Add Shift"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            labelName={"Shift Name"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter shift name"}
                            validation={{
                                ...register("name", { required: true }),
                            }}
                        />
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Start Time"}
                                inputName={"start_time"}
                                inputType={"time"}
                                validation={{ ...register("start_time", { required: true }) }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"End Time"}
                                inputName={"end_time"}
                                inputType={"time"}
                                validation={{ ...register("end_time", { required: true }) }}
                            />
                        </div>
                    </div>
                    {/*<div className="mb-3">*/}
                    {/*    <label htmlFor="weekdays">Weekend</label>*/}
                    {/*    <DropdownMultiselect*/}
                    {/*        options={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}*/}
                    {/*        name="weekdays"*/}
                    {/*        validation={{ ...register("weekdays", { required: true }) }}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <Select
                            labelName={"Weekend"}
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
                            validation={{...register("weekends", {required: true})}}
                            error={errors?.status}
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
            </BaseModal>
        </>
    );
};

export default AddShiftModal;