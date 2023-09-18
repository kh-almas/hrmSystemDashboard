import React, {useEffect} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const LeaveTypeUpdateModal = ({allLeaveApplicationReFetch, leaveType, oldData, dataUpdateModal, dataUpdateToggle}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();


    useEffect(() => {
        reset();
    },[oldData])

    const onSubmit = (data) => {
        const updatedData = {
            'leave_type_id':data.leave_type_id ? data.leave_type_id : oldData.leave_type_id,
            'date_from':data.date_from ? data.date_from : oldData.date_from,
            'date_to':data.date_to ? data.date_to : oldData.date_to,
            'status':data.status ? data.status : oldData.status,
        }

        axios.put(`/hrm-system/leave-application/${oldData.id}`, updatedData)
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
                    allLeaveApplicationReFetch();
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
            <BaseModal title={"Update Application"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form className="m-t-15" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Select
                            labelName={"Leave Type"}
                            placeholder={"Select an option"}
                            options={leaveType}
                            previous={oldData?.leave_type_id}
                            validation={{...register("leave_type_id", {required: true})}}
                            error={errors?.leave_type_id}
                        />
                    </div>
                    <div className="row m-t-15">
                        <div className="col">
                            <Input
                                labelName={"Date From"}
                                inputName={"type"}
                                inputType={"date"}
                                placeholder={"Enter Leave Type"}
                                defaultValue={oldData?.date_from}
                                validation={{...register("date_from", { required: true }),}}
                            />
                        </div>
                        <div className="col">
                            <Input
                                labelName={"Date To"}
                                inputName={"type"}
                                inputType={"date"}
                                placeholder={"Enter Leave Type"}
                                defaultValue={oldData?.date_to}
                                validation={{...register("date_to", { required: true }),}}
                            />
                        </div>
                    </div>
                    <div className={"m-t-15"}>
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
                            Update
                        </Button>
                    </div>
                </form>
            </BaseModal>
        </>
    );
};

export default LeaveTypeUpdateModal;