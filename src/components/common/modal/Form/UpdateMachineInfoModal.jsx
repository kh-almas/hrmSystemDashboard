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

    const [selectedOrganization, setSelectedOrganization] = useState("11");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    console.log("company",allCompany);

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
            // console.log("sortedData",sortedData)
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
        setSelectedOrganization(oldData?.organization_id);
        setSelectedCompany(oldData?.company_id)
        reset();
    },[oldData])

    const formattedTimeForUpdate = time => moment(time, "HH:mm").format("HH:mm:ss");

    const onSubmit = (data) => {
        // data.OrgId = selectedOrganization;
        // data.CompanyId = selectedCompany;
        // data.BranchId = selectedBranch;
        // data.Status = selectedStatus;
        const updatedData = {
            'OrgId':selectedOrganization ? selectedOrganization : oldData.organization_id,
            'CompanyId':selectedCompany ? selectedCompany : oldData.company_id,
            'BranchId':selectedBranch ? selectedBranch : oldData.branch_id,
            'MachineNo': data.MachineNo ? data.MachineNo : oldData.MachineNo,
            'MachineIP': data.MachineIP ? data.MachineIP : oldData.MachineIP,
            'MachinePort':data.MachinePort ? data.MachinePort : oldData.MachinePort,
            'commKey':data.commKey ? data.commKey : oldData.commKey,
            'Location':data.Location ? data.Location : oldData.Location,
            'Status':selectedStatus ? selectedStatus : oldData.status
        }

        // console.log(updatedData);
        axios.put(`/hrm-system/shift/${oldData.id}`, updatedData)
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
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    }

    return (
        <>
            <BaseModal title={"Update Shift Entry"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Select
                                labelName={"Company"}
                                placeholder={"Select an option"}
                                options={company}
                                setValue={setSelectedCompany}
                                previous={oldData?.OrgId}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Branch"}
                                placeholder={"Select an option"}
                                options={branch}
                                setValue={oldData?.BranchId}
                            />
                        </div>
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
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                            setValue={setSelectedStatus}
                            previous={oldData?.Status}
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={dataUpdateToggle} className="me-2">
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

export default UpdateMachineInfoModal;