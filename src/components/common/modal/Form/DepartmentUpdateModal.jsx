import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import GetAllCompany from "../../Query/hrm/GetAllCompany";

const OrganizationUpdateModal = ({allDepartmentReFetch, oldData, dataUpdateModal, dataUpdateToggle}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [company, setCompany] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();

    const [status, setStatus] = useState('Active');

    const [statusOptions, setStatusOptions] = useState([
        {value: "Active", label: "Active"},
        {value: "Inactive", label: "Inactive"}
    ])

    useEffect(() => {
        const filterStatus = statusOptions?.find(data => data.value == oldData?.status)
        setStatus(filterStatus);
        reset();
    }, [oldData])

    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };

    useEffect(() => {
        setCompany([]);
        allCompany?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setCompany(prevCompany => [...prevCompany, set_data]);
        })
    }, [allCompany])
    // console.log(company)

    const onSubmit = (data) => {
        const updatedData = {
            'company_id':selectedCompany ? selectedCompany : oldData.company_id,
            'name':data.name ? data.name : oldData.name,
            'details': data.details ? data.details : oldData.details,
            'status': status?.value ? status?.value : oldData.status
        }

        axios.put(`/hrm-system/department/${oldData.id}`, updatedData)
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
                    allDepartmentReFetch();
                }
            })
            .catch(e => {
                if(e?.response?.data?.body?.message?.errno == 1062){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Can not duplicate department name`
                    })
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${e?.response?.data?.body?.message?.details[0].message}`
                    })
                }
            })
    }

    return (
        <>
            <BaseModal title={"Department"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/*<div>*/}
                    {/*    <Select*/}
                    {/*        labelName={"Company"}*/}
                    {/*        placeholder={"Select an option"}*/}
                    {/*        options={company}*/}
                    {/*        setValue={setSelectedCompany}*/}
                    {/*        previous={oldData?.company_id}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <Input
                            labelName={"Department"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter Department name"}
                            defaultValue={oldData?.name}
                            validation={{
                                ...register("name", { required: true }),
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            labelName={"Details"}
                            inputName={"details"}
                            placeholder={"Enter details"}
                            inputType={"text"}
                            defaultValue={oldData?.details}
                            validation={{ ...register("details", { required: true }) }}
                        />
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={statusOptions}
                            previous={status}
                            setValue={setStatus}
                            cngFn={handleChangeForUpdateStatus}
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

export default OrganizationUpdateModal;