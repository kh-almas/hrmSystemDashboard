import React, {useEffect} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const WeekdayUpdateModal = ({allWeekdayReFetch, oldData, dataUpdateModal, dataUpdateToggle}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();


    useEffect(() => {
        reset();
    },[oldData])

    const onSubmit = (data) => {
        const updatedData = {
            'name':data.name ? data.name : oldData.name,
            'status':data.status ? data.status : oldData.status
        }

        axios.put(`/hrm-system/weekday/${oldData.id}`, updatedData)
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
                    allWeekdayReFetch();
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
            <BaseModal title={"Update Weekday"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            labelName={"Weekday"}
                            inputName={"name"}
                            inputType={"text"}
                            defaultValue={oldData?.name}
                            validation={{
                                ...register("name", { required: true }),
                            }}
                        />
                    </div>
                    <div>
                        <Select
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
                            update
                        </Button>
                    </div>
                </form>
            </BaseModal>
        </>
    );
};

export default WeekdayUpdateModal;