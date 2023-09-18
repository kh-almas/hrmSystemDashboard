import React, {useEffect} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const LeaveApprovalUpdateModal = ({allApprovalReFetch, leaveApplication, oldData, dataUpdateModal, dataUpdateToggle}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();

    console.log(oldData);


    useEffect(() => {
        reset();
    },[oldData])

    const onSubmit = (data) => {
        // data.carry_forward === '1' ? data.carry_forward= true : data.carry_forward= false;
        // oldData.carry_forward === '1' ? oldData.carry_forward= true : oldData.carry_forward= false;
        const updatedData = {
            'leave_application_id':data.leave_application_id ? data.leave_application_id : oldData.leave_application_id,
            'status':data.status ? data.status : oldData.status,
        }

        axios.put(`/hrm-system/leave-approval/${oldData.id}`, updatedData)
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
                    allApprovalReFetch();
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
            <BaseModal title={"Update Leave Approval"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form className="m-t-15" onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <div>
                            <Select
                                labelName={"Leave Application"}
                                placeholder={"Select an option"}
                                options={leaveApplication}
                                previous={oldData?.leave_application_id}
                                validation={{...register("leave_application_id")}}
                                error={errors?.leave_application_id}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Status"}
                                placeholder={"Select an option"}
                                options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                                validation={{...register("status")}}
                                previous={oldData?.status}
                                error={errors?.status}
                            />
                        </div>
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

export default LeaveApprovalUpdateModal;