import React, {useEffect} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const ShiftUpdateModal = ({dataUpdateModal, dataUpdateToggle, oldData, allShiftReFetch}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();

    console.log(oldData);

    useEffect(() => {
        reset();
    },[oldData])

    const formattedTimeForUpdate = time => moment(time, "HH:mm").format("HH:mm:ss");

    const onSubmit = (data) => {
        const start_time = formattedTimeForUpdate(data.start_time);
        data.start_time = start_time;
        const end_time = formattedTimeForUpdate(data.end_time);
        data.end_time = end_time;
        const updatedData = {
            'name':data.name ? data.name : oldData.name,
            'start_time': data.start_time ? data.start_time : oldData.start_time,
            'end_time':data.end_time ? data.end_time : oldData.end_time,
            'weekends':data.weekends ? data.weekends : oldData.weekends,
            'status':data.status ? data.status : oldData.status
        }


        axios.put(`/hrm-system/shift/${oldData.id}`, updatedData)
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
                    allShiftReFetch();
                }
            })
            .catch(e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    }

    return (
        <>
            <BaseModal title={"Update Shift Entry"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            labelName={"Shift Name"}
                            inputName={"name"}
                            inputType={"text"}
                            defaultValue={oldData?.name}
                            placeholder={"Enter shift name"}
                            validation={{
                                ...register("name"),
                            }}
                        />
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Start Time"}
                                inputName={"start_time"}
                                inputType={"time"}
                                defaultValue={oldData?.start_time}
                                validation={{ ...register("start_time") }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"End Time"}
                                inputName={"end_time"}
                                inputType={"time"}
                                defaultValue={oldData?.end_time}
                                validation={{ ...register("end_time") }}
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
                            previous={oldData?.weekends}
                            validation={{...register("weekends")}}
                            error={errors?.status}
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

export default ShiftUpdateModal;