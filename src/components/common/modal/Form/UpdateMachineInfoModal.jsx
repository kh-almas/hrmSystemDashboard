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
import getAllOrganization from "../../Query/hrm/GetAllOrganization";
import getAllBranch from "../../Query/hrm/GetAllBranch";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const UpdateMachineInfoModal = ({dataUpdateModal, dataUpdateToggle, oldData, allShiftReFetch}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [organization, setOrganization] = useState([]);
    const [company, setCompany] = useState([]);
    const [branch, setBranch] = useState([]);
    const [weekdays, setWeekdays] = useState([]);
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allOrganizationStatus, allOrganizationReFetch, allOrganization, allOrganizationError] = getAllOrganization();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();

    const [selectedOrganization, setSelectedOrganization] = useState(localStorage.getItem("org_id"));
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("branch_id"));
    const [status, setStatus] = useState('0');

    const [statusOptions, setStatusOptions] = useState([
        {value: "0", label: "Active"},
        {value: "1", label: "Inactive"}
    ])

    useEffect(() => {
        const filterStatus = statusOptions?.find(data => data.value == oldData?.isInActive)
        setStatus(filterStatus);
    }, [oldData])

    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };

    // console.log('oldData',oldData);

    // console.log('selectedCompany', selectedCompany)

    useEffect(() => {
        setOrganization([])
        allOrganization?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setOrganization(prevOrganization => [...prevOrganization, set_data]);
        })
    }, [allOrganization])

    useEffect(() => {
        setCompany([])
        if (selectedOrganization !== ""){
            const sortedData = allCompany?.data?.body?.data?.data?.filter((data) => parseInt(data.organization_id) === parseInt(selectedOrganization))
            sortedData?.map(item => {
                const set_data = {
                    id: item.id,
                    value: item.name
                }
                setCompany(prevCompany => [...prevCompany, set_data]);
            })
        }
    }, [allCompany, selectedOrganization])

    useEffect(() => {
        setBranch([])
        if (selectedCompany !== ""){
            const sortedData = allBranch?.data?.body?.data?.data?.filter((data) => parseInt(data.company_id) === parseInt(selectedCompany))
            sortedData?.map(item => {
                const set_data = {
                    id: item.id,
                    value: item.name
                }
                setBranch(prevBranch => [...prevBranch, set_data]);
            })
        }
    }, [allBranch, selectedCompany])


    useEffect(() => {
        setSelectedCompany(oldData?.CompanyId)
        // console.log(oldData);
        // reset();
    },[oldData])

    const formattedTimeForUpdate = time => moment(time, "HH:mm").format("HH:mm:ss");

    const onSubmit = (data) => {
        // data.OrgId = selectedOrganization;
        // data.CompanyId = selectedCompany;
        // data.BranchId = selectedBranch;
        // data.Status = selectedStatus;
        const updatedData = {
            'OrgId':selectedOrganization ? selectedOrganization : oldData.OrgId,
            'CompanyId':selectedCompany ? selectedCompany : oldData.CompanyId,
            'BranchId':selectedBranch ? selectedBranch : oldData.BranchId,
            'MachineNo': data.MachineNo ? data.MachineNo : oldData.MachineNo,
            'MachineIP': data.MachineIP ? data.MachineIP : oldData.MachineIP,
            'MachinePort':data.MachinePort ? data.MachinePort : oldData.MachinePort,
            'commKey':data.commKey ? data.commKey : oldData.commKey,
            'Location':data.Location ? data.Location : oldData.Location,
            'isInActive': status?.value ? status?.value : oldData.status
        }

        axios.put(`/hrm-system/machine/info/${oldData?.id}`, updatedData)
            .then(info => {
                // console.log("update",info)
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
                    allShiftReFetch();
                }
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
            <BaseModal title={"Update Machine Entry"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        {/*<div>*/}
                        {/*    <Select*/}
                        {/*        labelName={"Company"}*/}
                        {/*        placeholder={"Select an option"}*/}
                        {/*        options={company}*/}
                        {/*        setValue={setSelectedCompany}*/}
                        {/*        previous={oldData?.CompanyId}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <Select*/}
                        {/*        labelName={"Branch"}*/}
                        {/*        placeholder={"Select an option"}*/}
                        {/*        options={branch}*/}
                        {/*        setValue={setSelectedBranch}*/}
                        {/*        previous={oldData?.BranchId}*/}
                        {/*    />*/}

                        {/*    /!*{console.log(oldData?.BranchId)}*!/*/}
                        {/*</div>*/}
                        <div>
                            <Input
                                labelName={"Machine Number"}
                                inputName={"machine_no"}
                                placeholder={"Enter your machine number"}
                                inputType={"text"}
                                validation={{ ...register("MachineNo") }}
                                defaultValue={oldData?.MachineNo}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Machine IP"}
                                inputName={"machine_ip"}
                                placeholder={"Enter your machine IP"}
                                inputType={"text"}
                                validation={{ ...register("MachineIP") }}
                                defaultValue={oldData?.MachineIP}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Machine port"}
                                inputName={"machine_port"}
                                placeholder={"Enter your machine port"}
                                inputType={"text"}
                                validation={{ ...register("MachinePort") }}
                                defaultValue={oldData?.MachinePort}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Common key"}
                                inputName={"common_key"}
                                placeholder={"Enter your machine port"}
                                inputType={"text"}
                                validation={{ ...register("commKey") }}
                                defaultValue={oldData?.commKey}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Location"}
                                inputName={"location"}
                                placeholder={"Enter your machine location"}
                                inputType={"text"}
                                validation={{ ...register("Location", { required: true }) }}
                                defaultValue={oldData?.Location}
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

export default UpdateMachineInfoModal;