import React, {useState, useEffect} from 'react';
import Input from "../../../common/modal/Input";
import {useForm} from "react-hook-form";
import GetAllBranch from "../../../common/Query/hrm/GetAllBranch";
import GetAllDesignation from "../../../common/Query/hrm/GetAllDesignation";
import GetAllDepartment from "../../../common/Query/hrm/GetAllDepartment";
import Select from "../../../common/modal/Select";
import UnitModal from "../../../common/AddProduct/Modal/UnitModal";
import AddBranchModal from "../../../common/modal/Form/AddBranchModal";
import GetAllOrganization from "../../../common/Query/hrm/GetAllOrganization";
import AddOrganizationModal from "../../../common/modal/Form/AddOrganizationModal";
import GetAllSection from "../../../common/Query/hrm/GetAllSection";
import AddSectionModal from "../../../common/modal/Form/AddSectionModal";
import GetAllCompany from "../../../common/Query/hrm/GetAllCompany";
import AddCompanyModal from "../../../common/modal/Form/AddCompanyModal";
import AddDepartmentModal from "../../../common/modal/Form/AddDepartmentModal";

const EmployeeCompanyInformation = () => {
    const [branch, setBranch] = useState([]);
    const [branchModal, setBranchModal] = useState(false);
    const [organization, setOrganization] = useState([]);
    const [organizationModal, setOrganizationModal] = useState(false);
    const [section, setSection] = useState([]);
    const [sectionModal, setSectionModal] = useState(false);
    const [company, setCompany] = useState([]);
    const [companyModal, setCompanyModal] = useState(false);
    const [department, setDepartment] = useState([]);
    const [departmentModal, setDepartmentModal] = useState(false);
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = GetAllBranch();
    const [allOrganizationStatus, allOrganizationReFetch, allOrganization, allOrganizationError] = GetAllOrganization();
    const [allSectionStatus, allSectionReFetch, allSection, allSectionError] = GetAllSection();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allDepartmentStatus, allDepartmentReFetch, allDepartment, allDepartmentError] = GetAllDepartment();

    const branchToggle = () => {
        setBranchModal(!branchModal);
    };
    const organizationToggle = () => {
        setOrganizationModal(!organizationModal);
    };
    const sectionToggle = () => {
        setSectionModal(!sectionModal);
    }
    const CompanyToggle = () => {
        setCompanyModal(!companyModal);
    };
    const departmentToggle = () => {
        setDepartmentModal(!departmentModal);
    };

    useEffect(() => {
        setDepartment([]);
        allDepartment?.data?.body?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setDepartment(prevDepartment => [...prevDepartment, set_data]);
        })
    }, [allDepartment])

    useEffect(() => {
        setCompany([]);
        allCompany?.data?.body?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setCompany(prevCompany => [...prevCompany, set_data]);
        })
    }, [allCompany])

    useEffect(() => {
        setBranch([]);
        allBranch?.data?.body?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setBranch(prevBranch => [...prevBranch, set_data]);
        })
    }, [allBranch])

    useEffect(() => {
        setOrganization([]);
        allOrganization?.data?.body?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setOrganization(prevOrganization => [...prevOrganization, set_data]);
        })
    }, [allOrganization])

    useEffect(() => {
        setSection([]);
        allSection?.data?.body?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setSection(prevDepartment => [...prevDepartment, set_data]);
        })
    }, [allSection])

    const EmployeeCompanyInformation = data => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(EmployeeCompanyInformation)} className="mt-3">
            <div className="row">
                <div className="col">
                    <div style={{ position: "relative" }}>
                        <p onClick={organizationToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">
                            New Organization
                            <span><i className="icofont icofont-plus-circle"></i></span>
                            <AddOrganizationModal reFetch={allOrganizationReFetch} modal={organizationModal} toggle={organizationToggle} />
                        </p>

                        <div>
                            <Select
                                labelName={"Organization"}
                                placeholder={"Select an option"}
                                options={organization}
                                validation={{...register("organization")}}
                                error={errors.branch}
                            />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div style={{ position: "relative" }}>
                        <p onClick={CompanyToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">
                            New Company
                            <span><i className="icofont icofont-plus-circle"></i></span>
                            <AddCompanyModal organization={organization} reFetch={allCompanyReFetch} modal={companyModal} toggle={CompanyToggle} />
                        </p>

                        <div>
                            <Select
                                labelName={"Company"}
                                placeholder={"Select an option"}
                                options={company}
                                validation={{...register("company")}}
                                error={errors.company}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div style={{ position: "relative" }}>
                        <p onClick={branchToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">
                            New Branch
                            <span><i className="icofont icofont-plus-circle"></i></span>
                            <AddBranchModal reFetch={allBranchReFetch} modal={branchModal} toggle={branchToggle} />
                        </p>

                        <div>
                            <Select
                                labelName={"Branch"}
                                placeholder={"Select an option"}
                                options={branch}
                                validation={{...register("branch")}}
                                error={errors.branch}
                            />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div style={{ position: "relative" }}>
                        <p onClick={departmentToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">
                            New Department
                            <span><i className="icofont icofont-plus-circle"></i></span>
                            <AddDepartmentModal reFetch={allDepartmentReFetch} modal={departmentModal} toggle={departmentToggle} />
                        </p>

                        <div>
                            <Select
                                labelName={"Department"}
                                placeholder={"Select an option"}
                                options={department}
                                validation={{...register("department")}}
                                error={errors.department}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div style={{ position: "relative" }}>
                        <p onClick={sectionToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">
                            New Section
                            <span><i className="icofont icofont-plus-circle"></i></span>
                            <AddSectionModal reFetch={allSectionReFetch} modal={sectionModal} toggle={sectionToggle} />
                        </p>

                        <div>
                            <Select
                                labelName={"Section"}
                                placeholder={"Select an option"}
                                options={section}
                                validation={{...register("section")}}
                                error={errors.section}
                            />
                        </div>
                    </div>
                </div>
                <div className="col">

                </div>
            </div>
        </form>
    );
};

export default EmployeeCompanyInformation;