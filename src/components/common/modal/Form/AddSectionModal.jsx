import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import GetAllDepartment from "../../Query/hrm/GetAllDepartment";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const AddSectionModal = ({modal, toggle, reFetch}) => {

    const [company, setCompany] = useState([]);
    const [department, setDepartment] = useState([]);
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [allDepartmentStatus, allDepartmentReFetch, allDepartment, allDepartmentError] = GetAllDepartment();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();

    const [selectedDepartment, setSelectedDepartment] = useState(localStorage.getItem("dept_id"));
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [status, setStatus] = useState('Active');

    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };


    // console.log(allDepartment);

    // useEffect(() => {
    //     setDepartment([])
    //     if (selectedCompany !== ""){
    //         const sortedData = allDepartment?.data?.body?.data?.data?.filter((data) => parseInt(data.company_id) === parseInt(selectedCompany))
    //         console.log("sortedData",sortedData)
    //         sortedData?.map(item => {
    //             const set_data = {
    //                 id: item.id,
    //                 value: item.name
    //             }
    //             setDepartment(prevDepartment => [...prevDepartment, set_data]);
    //         })
    //     }
    // }, [allCompany, selectedCompany])

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
        data.department_id = selectedDepartment;
        data.company_id = selectedCompany;
        data.status = status?.value;
        axios.post('/hrm-system/section', data)
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
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    }
    return (
        <>
            <BaseModal title={"Add Section"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/*<div>*/}
                    {/*    <Select*/}
                    {/*        labelName={"Company"}*/}
                    {/*        placeholder={"Select an option"}*/}
                    {/*        options={company}*/}
                    {/*        setValue={setSelectedCompany}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <Select*/}
                    {/*        labelName={"Department"}*/}
                    {/*        placeholder={"Select an option"}*/}
                    {/*        options={department}*/}
                    {/*        setValue={setSelectedDepartment}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <Input
                            labelName={"Section Name"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter company name"}
                            validation={{
                                ...register("name", { required: true }),
                            }}
                        />
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={[{value: "Active", label: "Active"}, {value: "Inactive", label: "Inactive"}]}
                            setValue={setStatus}
                            cngFn={handleChangeForUpdateStatus}
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

export default AddSectionModal;