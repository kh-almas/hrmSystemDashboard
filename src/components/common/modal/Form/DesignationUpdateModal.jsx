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
import GetAllOrganization from "../../Query/hrm/GetAllOrganization";

const DesignationUpdateModal = ({allDesignationReFetch, oldData, dataUpdateModal, dataUpdateToggle}) => {
    const [company, setCompany] = useState([]);
    const [organization, setOrganization] = useState([]);
    const {register, reset, handleSubmit, formState: { errors },} = useForm();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allOrganizationStatus, allOrganizationReFetch, allOrganization, allOrganizationError] = GetAllOrganization();


    const [selectedOrganization, setSelectedOrganization] = useState(localStorage.getItem("org_id"));
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
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

    // useEffect(() => {
    //     setCompany([])
    //     allCompany?.data?.body?.data?.data?.map(item => {
    //         const set_data = {
    //             id: item.id,
    //             value: item.name
    //         }
    //         setCompany(prevShift => [...prevShift, set_data]);
    //     })
    // }, [allCompany])

    // useEffect(() => {
    //     setOrganization([]);
    //     allOrganization?.data?.body?.data?.data?.map(item => {
    //         const set_data = {
    //             id: item?.id,
    //             value: item?.name
    //         }
    //         setOrganization(prevOrganization => [...prevOrganization, set_data]);
    //     })
    // }, [allOrganization])

    const onSubmit = (data) => {
        const updatedData = {
            'organization_id':selectedOrganization ? selectedOrganization : oldData.organization_id,
            'company_id':selectedCompany ? selectedCompany : oldData.company_id,
            'name':data.name ? data.name : oldData.name,
            'details':data.details ? data.details : oldData.details,
            'status': status?.value ? status?.value : oldData.status
        }

        axios.put(`/hrm-system/designation/${oldData.id}`, updatedData)
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
                    allDesignationReFetch();
                }
            })
            .catch(e => {
                if(e?.response?.data?.body?.message?.errno == 1062){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Can not duplicate designation name`
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
            <BaseModal title={"Update Designation"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/*<div>*/}
                    {/*    <Select*/}
                    {/*        labelName={"Organization"}*/}
                    {/*        placeholder={"Select an option"}*/}
                    {/*        options={organization}*/}
                    {/*        previous={oldData.organization_id}*/}
                    {/*        setValue={setSelectedOrganization}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <Select*/}
                    {/*        labelName={"Company"}*/}
                    {/*        placeholder={"Select an option"}*/}
                    {/*        options={company}*/}
                    {/*        previous={oldData.company_id}*/}
                    {/*        setValue={setSelectedCompany}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <Input
                            labelName={"Designation Name"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter designation name"}
                            defaultValue={oldData?.name}
                            validation={{
                                ...register("name", { required: true }),
                            }}
                        />
                    </div>
                    <div className="form-group mb-0">
                        <label htmlFor="exampleFormControlTextarea4">
                            Details
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea4"
                            rows="5"
                            {...register("details")}
                            defaultValue={oldData?.details}
                        ></textarea>
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

export default DesignationUpdateModal;