import React, {useEffect} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const LeaveTypeUpdateModal = ({allLeaveTypeReFetch, oldData, dataUpdateModal, dataUpdateToggle}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();


    useEffect(() => {
        reset();
    },[oldData])

    const onSubmit = (data) => {
        const updatedData = {
            'type':data.type ? data.type : oldData.type,
            'status':data.status ? data.status : oldData.status
        }

        axios.put(`/hrm-system/leave-type/${oldData.id}`, updatedData)
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
                    allLeaveTypeReFetch();
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
            <BaseModal title={"Update Leave Type"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form className="m-t-15" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            labelName={"On Leave Type"}
                            inputName={"type"}
                            inputType={"text"}
                            placeholder={"Enter Leave Type"}
                            defaultValue={oldData?.type}
                            validation={{
                                ...register("type"),
                            }}
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