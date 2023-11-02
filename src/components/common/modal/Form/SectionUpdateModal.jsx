import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import GetAllDepartment from "../../Query/hrm/GetAllDepartment";
import GetAllCompany from "../../Query/hrm/GetAllCompany";

const SectionUpdateModal = ({allSectionReFetch, oldData, dataUpdateModal, dataUpdateToggle}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [company, setCompany] = useState([]);
    const [department, setDepartment] = useState([]);
    const [allDepartmentStatus, allDepartmentReFetch, allDepartment, allDepartmentError] = GetAllDepartment();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();

    const [selectedDepartment, setSelectedDepartment] = useState(localStorage.getItem("dept_id"));
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

    useEffect(() => {
        setDepartment([])
        if (selectedCompany !== ""){
            const sortedData = allDepartment?.data?.body?.data?.data?.filter((data) => parseInt(data.company_id) === parseInt(selectedCompany))
            // console.log("sortedData",sortedData)
            sortedData?.map(item => {
                const set_data = {
                    id: item.id,
                    value: item.name
                }
                setDepartment(prevDepartment => [...prevDepartment, set_data]);
            })
        }
    }, [allCompany, selectedCompany])

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

    const onSubmit = (data) => {
        const updatedData = {
            'name': data.name ? data.name : oldData.name,
            'company_id': selectedCompany ? selectedCompany : oldData.company_id,
            'department_id':data.department_id ? data.department_id : oldData.department_id,
            'status': status?.value ? status?.value : oldData.status
        }
        axios.put(`/hrm-system/section/${oldData.id}`, updatedData)
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
                    allSectionReFetch();
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
            <BaseModal title={"Update Section"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/*<div>*/}
                    {/*    <Select*/}
                    {/*        labelName={"Company"}*/}
                    {/*        placeholder={"Select an option"}*/}
                    {/*        options={company}*/}
                    {/*        previous={oldData?.company_id}*/}
                    {/*        setValue={setSelectedCompany}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <Select*/}
                    {/*        labelName={"Department"}*/}
                    {/*        placeholder={"Select an option"}*/}
                    {/*        options={department}*/}
                    {/*        previous={oldData?.department_id}*/}
                    {/*        setValue={setSelectedDepartment}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <Input
                            labelName={"Section Name"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter company name"}
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

export default SectionUpdateModal;