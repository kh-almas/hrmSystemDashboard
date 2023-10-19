import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const ProjectUpdateModal = ({company, allProjectReFetch, oldData, dataUpdateModal, dataUpdateToggle}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();

    const [status, setStatus] = useState('');
    const [singleCompany, setSingleCompany] = useState('');

    useEffect(() => {
        reset();
    },[oldData])

    const onSubmit = (data) => {
        const updatedData = {
            'name': data.name ? data.name : oldData.name,
            'description':data.description ? data.description : oldData.description,
            'start_date':data.start_date ? data.start_date : oldData.start_date,
            'end_date':data.end_date ? data.end_date : oldData.end_date,
            'total_employees':data.total_employees ? data.total_employees : oldData.total_employees,
            'company_id':singleCompany ? singleCompany : oldData.company_id,
            'status':status ? status : oldData.status
        }

        axios.put(`/hrm-system/project/${oldData.id}`, updatedData)
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
                    allProjectReFetch();
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
            <BaseModal title={"Update Project"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Project Name"}
                                inputName={"name"}
                                inputType={"text"}
                                placeholder={"Enter project name"}
                                defaultValue={oldData?.name}
                                validation={{
                                    ...register("name"),
                                }}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Company"}
                                placeholder={"Select an option"}
                                options={company}
                                setValue={setSingleCompany}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleFormControlTextarea4">
                            Description*
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea4"
                            rows="3"
                            defaultValue={oldData?.description}
                            {...register("description")}
                        ></textarea>
                        {errors.description && <span>This field is required</span>}
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Start Date"}
                                inputName={"name"}
                                inputType={"date"}
                                defaultValue={oldData?.start_date}
                                placeholder={"Enter Start Date"}
                                validation={{
                                    ...register("start_date"),
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"End Date"}
                                inputName={"name"}
                                inputType={"date"}
                                placeholder={"Enter End Date"}
                                defaultValue={oldData?.end_date}
                                validation={{
                                    ...register("end_date"),
                                }}
                            />
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Total Employee"}
                                inputName={"name"}
                                inputType={"text"}
                                placeholder={"Enter Total Employee"}
                                defaultValue={oldData?.total_employees}
                                validation={{
                                    ...register("total_employees"),
                                }}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Status"}
                                placeholder={"Select an option"}
                                options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                                setValue={setStatus}
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

export default ProjectUpdateModal;