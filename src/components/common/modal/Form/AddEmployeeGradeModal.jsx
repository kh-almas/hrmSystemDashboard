import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import GetAllOrganization from "../../Query/hrm/GetAllOrganization";

const AddEmployeeGradeModal = ({modal, toggle, reFetch}) => {
    const [company, setCompany] = useState([]);
    const [organization, setOrganization] = useState([]);
    const {register, handleSubmit, formState: { errors },} = useForm();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allOrganizationStatus, allOrganizationReFetch, allOrganization, allOrganizationError] = GetAllOrganization();

    useEffect(() => {
        setCompany([])
        allCompany?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setCompany(prevShift => [...prevShift, set_data]);
        })
    }, [allCompany])

    useEffect(() => {
        setOrganization([]);
        allOrganization?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setOrganization(prevOrganization => [...prevOrganization, set_data]);
        })
    }, [allOrganization])

    const onSubmit = (data) => {
        axios.post('/hrm-system/employee-grade', data)
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
                })
            })
    }

    return (
        <>
            <BaseModal title={"Add Employee Grade"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Select
                            labelName={"Organization"}
                            placeholder={"Select an option"}
                            options={organization}
                            validation={{...register("organization_id", {required: true})}}
                            error={errors?.organization_id}
                        />
                    </div>
                    <div>
                        <Select
                            labelName={"Company"}
                            placeholder={"Select an option"}
                            options={company}
                            validation={{...register("company_id", {required: true})}}
                            error={errors?.company_id}
                        />
                    </div>
                    <div>
                        <Input
                            labelName={"Grade Name"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter grade name"}
                            validation={{
                                ...register("grade_name", { required: true }),
                            }}
                            error={errors?.grade_name}
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

export default AddEmployeeGradeModal;