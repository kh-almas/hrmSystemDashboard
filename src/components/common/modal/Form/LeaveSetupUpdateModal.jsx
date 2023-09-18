import React, {useEffect} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const LeaveSetupUpdateModal = ({allLeaveSetupReFetch, leaveType, oldData, dataUpdateModal, dataUpdateToggle}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();


    useEffect(() => {
        reset();
    },[oldData])

    const onSubmit = (data) => {
        data.carry_forward === '1' ? data.carry_forward= true : data.carry_forward= false;
        oldData.carry_forward === '1' ? oldData.carry_forward= true : oldData.carry_forward= false;
        const updatedData = {
            'leave_type_id':data.leave_type_id ? data.leave_type_id : oldData.leave_type_id,
            'total_days':data.total_days ? data.total_days : oldData.total_days,
            'year':data.year ? data.year : oldData.year,
            'carry_forward':data.carry_forward ? data.carry_forward : oldData.carry_forward,
            'status':data.status ? data.status : oldData.status,
        }

        axios.put(`/hrm-system/leave-setup/${oldData.id}`, updatedData)
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
                    allLeaveSetupReFetch();
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
            <BaseModal title={"Update Leave Setup"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form className="m-t-15" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-md-2">
                        <div>
                            <Select
                                labelName={"Leave Type"}
                                placeholder={"Select an option"}
                                options={leaveType}
                                validation={{...register("leave_type_id")}}
                                error={errors?.leave_type_id}
                                previous={oldData?.leave_type_id}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Total Leave Days"}
                                inputName={"TotalDays"}
                                inputType={"number"}
                                placeholder={"Enter Total Leave Days"}
                                defaultValue={oldData?.total_days}
                                validation={{...register("total_days"),}}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Select Year"}
                                inputName={"year"}
                                inputType={"text"}
                                placeholder={"Enter year"}
                                defaultValue={oldData?.year}
                                validation={{
                                    ...register("year"),
                                }}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Carry Foreword"}
                                placeholder={"Select an option"}
                                options={[{id: "1", value: "Yes"}, {id: "0", value: "No"}]}
                                validation={{...register("carry_forward")}}
                                previous={oldData?.carry_forward}
                                error={errors?.status}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Status"}
                                placeholder={"Select an option"}
                                options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                                validation={{...register("status")}}
                                error={errors?.status}
                                previous={oldData?.status}
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

export default LeaveSetupUpdateModal;