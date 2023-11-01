import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import moment from "moment";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import getAllOrganization from "../../Query/hrm/GetAllOrganization";
import getAllBranch from "../../Query/hrm/GetAllBranch";

const AddShiftModal = ({modal, toggle, reFetch}) => {
    const [organization, setOrganization] = useState([]);
    const [company, setCompany] = useState([]);
    const [branch, setBranch] = useState([]);
    const {register, reset, handleSubmit, formState: { errors },} = useForm();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allOrganizationStatus, allOrganizationReFetch, allOrganization, allOrganizationError] = getAllOrganization();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();

    const [selectedOrganization, setSelectedOrganization] = useState(localStorage.getItem("org_id"));
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("branch_id"));
    const [status, setStatus] = useState('0');

    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };

    // const [weekdays, setWeekdays] = useState('');
    // console.log("company",company);

    // useEffect(() => {
    //     setOrganization([])
    //     allOrganization?.data?.body?.data?.data?.map(item => {
    //         const set_data = {
    //             id: item.id,
    //             value: item.name
    //         }
    //         setOrganization(prevOrganization => [...prevOrganization, set_data]);
    //     })
    // }, [allOrganization])

    // useEffect(() => {
    //     setCompany([])
    //     if (selectedOrganization !== ""){
    //         const sortedData = allCompany?.data?.body?.data?.data?.filter((data) => parseInt(data.organization_id) === parseInt(selectedOrganization))
    //         // console.log("sortedData",sortedData)
    //         sortedData?.map(item => {
    //             const set_data = {
    //                 id: item.id,
    //                 value: item.name
    //             }
    //             setCompany(prevCompany => [...prevCompany, set_data]);
    //         })
    //     }
    // }, [allCompany, selectedOrganization])

    // useEffect(() => {
    //     setBranch([])
    //     if (selectedCompany !== ""){
    //         const sortedData = allBranch?.data?.body?.data?.data?.filter((data) => parseInt(data.company_id) === parseInt(selectedCompany))
    //         sortedData?.map(item => {
    //             const set_data = {
    //                 id: item.id,
    //                 value: item.name
    //             }
    //             setBranch(prevBranch => [...prevBranch, set_data]);
    //         })
    //     }
    // }, [allBranch, selectedCompany])


    const onSubmit = (data) => {
        data.OrgId = selectedOrganization;
        data.CompanyId = selectedCompany;
        data.BranchId = selectedBranch;
        data.isInActive = status?.value;
        console.log(data);

        axios.post('/hrm-system/machine/info', data)
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
                // console.log(e)
                if(e?.response?.data?.body?.message?.errno == 1062){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Can not duplicate machine ip`
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
            <BaseModal title={"Add Machine Information"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
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
                        {/*        labelName={"Branch"}*/}
                        {/*        placeholder={"Select an option"}*/}
                        {/*        options={branch}*/}
                        {/*        setValue={setSelectedBranch}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div>
                            <Input
                                labelName={"Machine Number"}
                                inputName={"machine_no"}
                                placeholder={"Enter your machine number"}
                                inputType={"text"}
                                validation={{ ...register("MachineNo", { required: true }) }}
                                error={errors?.MachineNo}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Machine IP"}
                                inputName={"machine_ip"}
                                placeholder={"Enter your machine IP"}
                                inputType={"text"}
                                validation={{ ...register("MachineIP", { required: true }) }}
                                error={errors?.MachineIP}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Machine port"}
                                inputName={"machine_port"}
                                placeholder={"Enter your machine port"}
                                inputType={"text"}
                                validation={{ ...register("MachinePort", { required: true }) }}
                                error={errors?.MachinePort}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Common key"}
                                inputName={"common_key"}
                                placeholder={"Enter your machine port"}
                                inputType={"text"}
                                validation={{ ...register("commKey", { required: true }) }}
                                error={errors?.commKey}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Location"}
                                inputName={"location"}
                                placeholder={"Enter your machine location"}
                                inputType={"text"}
                                validation={{ ...register("Location", { required: true }) }}
                                error={errors?.Location}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Status"}
                                placeholder={"Select an option"}
                                options={[{value: "0", label: "Active"}, {value: "1", label: "Inactive"}]}
                                setValue={setStatus}
                                cngFn={handleChangeForUpdateStatus}
                            />
                        </div>
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

export default AddShiftModal;