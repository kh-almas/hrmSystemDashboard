import React, {useState, useEffect} from 'react';
import Input from "../../../../common/modal/Input";
import {useForm} from "react-hook-form";
import GetAllBranch from "../../../../common/Query/hrm/GetAllBranch";
import GetAllDesignation from "../../../../common/Query/hrm/GetAllDesignation";
import GetAllDepartment from "../../../../common/Query/hrm/GetAllDepartment";
import Select from "../../../../common/modal/Select";
import AddBranchModal from "../../../../common/modal/Form/AddBranchModal";
import GetAllOrganization from "../../../../common/Query/hrm/GetAllOrganization";
import AddOrganizationModal from "../../../../common/modal/Form/AddOrganizationModal";
import GetAllSection from "../../../../common/Query/hrm/GetAllSection";
import AddSectionModal from "../../../../common/modal/Form/AddSectionModal";
import GetAllCompany from "../../../../common/Query/hrm/GetAllCompany";
import AddCompanyModal from "../../../../common/modal/Form/AddCompanyModal";
import AddDepartmentModal from "../../../../common/modal/Form/AddDepartmentModal";
import GetAllEmployeeGrade from "../../../../common/Query/hrm/GetAllEmployeeGrade";
import AddEmployeeGradeModal from "../../../../common/modal/Form/AddEmployeeGradeModal";
import GetAllSalaryGrade from "../../../../common/Query/hrm/GetAllSalaryGrade";
import AddSalaryGradeModal from "../../../../common/modal/Form/AddSalaryGradeModal";
import GetAllEmployeeShift from "../../../../common/Query/hrm/GetAllEmployeeShift";
import getAllShift from "../../../../common/Query/hrm/GetAllShift";
import AddShiftModal from "../../../../common/modal/Form/AddShiftModal";

const EmployeeCompanyInformation = ({setProcessData, setIconWithTab, processData, employeeData}) => {

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
    const [employeeGrade, setEmployeeGrade] = useState([]);
    const [employeeGradeModal, setEmployeeGradeModal] = useState(false);
    const [salaryGrade, setSalaryGrade] = useState([]);
    const [salaryGradeModal, setSalaryGradeModal] = useState(false);

    const [shift, setShift] = useState([]);
    const [shiftModal, setShiftModal] = useState(false);

    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = GetAllBranch();
    const [allOrganizationStatus, allOrganizationReFetch, allOrganization, allOrganizationError] = GetAllOrganization();
    const [allSectionStatus, allSectionReFetch, allSection, allSectionError] = GetAllSection();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allDepartmentStatus, allDepartmentReFetch, allDepartment, allDepartmentError] = GetAllDepartment();
    const [allEmployeeGradeStatus, allEmployeeGradeReFetch, allEmployeeGrade, allEmployeeGradeError] = GetAllEmployeeGrade();
    const [allSalaryGradeStatus, allSalaryGradeReFetch, allSalaryGrade, allSalaryGradeError] = GetAllSalaryGrade();
    const [allShiftStatus, allShiftReFetch, allShift, allShiftError] = getAllShift();

    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedEmployeeGrade, setSelectedEmployeeGrade] = useState('');
    const [selectedSalaryGrade, setSelectedSalaryGrade] = useState('');
    const [selectedShift, setSelectedShift] = useState('');

    const [allData, setAllData] = useState({});

    useEffect(() => {
        const filterOrganization = organization?.find(data => data.value == employeeData?.organization_id)
        setSelectedOrganization(filterOrganization);
        // console.log(filterOrganization, 'filterOrganization')

        const filterCompany = company?.find(data => data.value == employeeData?.company_id)
        setSelectedCompany(filterCompany);
        // console.log(filterOrganization, 'filterOrganization')

        const filterBranch = branch?.find(data => data.value == employeeData?.branch_id)
        setSelectedBranch(filterBranch);
        // console.log(filterOrganization, 'filterOrganization')

        const filterDepartment = department?.find(data => data.value == employeeData?.department_id)
        setSelectedDepartment(filterDepartment);
        // console.log(filterOrganization, 'filterOrganization')

        const filterSection = section?.find(data => data.value == employeeData?.section_id)
        setSelectedSection(filterSection);
        // console.log(filterOrganization, 'filterOrganization')

        const filterEmployeeGrade = employeeGrade?.find(data => data.value == employeeData?.employee_grade_id)
        setSelectedEmployeeGrade(filterEmployeeGrade);
        // console.log(filterOrganization, 'filterOrganization')

        const filterSalaryGrade = salaryGrade?.find(data => data.value == employeeData?.salary_grade_id)
        setSelectedSalaryGrade(filterSalaryGrade);
        // console.log(filterOrganization, 'filterOrganization')

        const filterShift = shift?.find(data => data.value == employeeData?.shift_id)
        setSelectedShift(filterShift);
        // console.log(filterOrganization, 'filterOrganization')
    }, [employeeData])

    const handleChangeForOrg = (selected) => {
        setSelectedOrganization(selected);
    };

    const handleChangeForCompany = (selected) => {
        setSelectedCompany(selected);
    };

    const handleChangeForBranch = (selected) => {
        setSelectedBranch(selected);
    };

    const handleChangeForDept = (selected) => {
        setSelectedDepartment(selected);
    };

    const handleChangeForSection = (selected) => {
        setSelectedSection(selected);
    };

    const handleChangeForEmployeeGrade = (selected) => {
        setSelectedEmployeeGrade(selected);
    };

    const handleChangeForSalaryGrade = (selected) => {
        setSelectedSalaryGrade(selected);
    };

    const handleChangeForShift = (selected) => {
        setSelectedShift(selected);
    };

    const EmployeeCompanyInformation = data => {
        setAllData(data);
        data.organization_id = selectedOrganization?.value;
        data.company_id = selectedCompany?.value;
        data.branch_id = selectedBranch?.value;
        data.department_id = selectedDepartment?.value;
        data.section_id = selectedSection?.value;
        data.employee_grade_id = selectedEmployeeGrade?.value;
        data.salary_grade_id = selectedSalaryGrade?.value;
        data.shift_id = selectedShift?.value;
        const abs = {...processData, ...data}
        setProcessData({ ...abs });
    }

    useEffect(() => {
        EmployeeCompanyInformation(allData);
    }, [selectedOrganization, selectedCompany, selectedBranch, selectedDepartment, selectedSection, selectedEmployeeGrade, selectedSalaryGrade, selectedShift])



    // console.log(allSalaryGrade?.data?.body?.data);
    const shiftToggle = () => {
        setShiftModal(!shiftModal);
    }
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
    const employeeGradeToggle = () => {
        setEmployeeGradeModal(!employeeGradeModal);
    };
    const salaryGradeToggle = () => {
        setSalaryGradeModal(!salaryGradeModal);
    };

    useEffect(() => {
        setShift([]);
        allShift?.data?.body?.data?.data?.map(item => {
            const set_data = {
                value: item?.id,
                label: item?.name
            }
            setShift(prevEmployeeGrade => [...prevEmployeeGrade, set_data]);
        })
    }, [allShift])

    useEffect(() => {
        setEmployeeGrade([]);
        allEmployeeGrade?.data?.body?.data?.map(item => {
            const set_data = {
                value: item?.id,
                label: item?.grade_name
            }
            setEmployeeGrade(prevEmployeeGrade => [...prevEmployeeGrade, set_data]);
        })
    }, [allEmployeeGrade])

    useEffect(() => {
        setDepartment([]);
        allDepartment?.data?.body?.data?.data?.map(item => {
            const set_data = {
                value: item?.id,
                label: item?.name
            }
            setDepartment(prevDepartment => [...prevDepartment, set_data]);
        })
    }, [allDepartment])

    useEffect(() => {
        setCompany([]);
        allCompany?.data?.body?.data?.data?.map(item => {
            const set_data = {
                value: item?.id,
                label: item?.name
            }
            setCompany(prevCompany => [...prevCompany, set_data]);
        })
    }, [allCompany])

    useEffect(() => {
        setBranch([]);
        allBranch?.data?.body?.data?.data?.map(item => {
            const set_data = {
                value: item?.id,
                label: item?.name
            }
            setBranch(prevBranch => [...prevBranch, set_data]);
        })
    }, [allBranch])

    useEffect(() => {
        setOrganization([]);
        allOrganization?.data?.body?.data?.data?.map(item => {
            const set_data = {
                value: item?.id,
                label: item?.name
            }
            setOrganization(prevOrganization => [...prevOrganization, set_data]);
        })
    }, [allOrganization])

    useEffect(() => {
        setSection([]);
        allSection?.data?.body?.data?.map(item => {
            const set_data = {
                value: item?.id,
                label: item?.name
            }
            setSection(prevDepartment => [...prevDepartment, set_data]);
        })
    }, [allSection])

    useEffect(() => {
        setSalaryGrade([]);
        allSalaryGrade?.data?.body?.data?.map(item => {
            const set_data = {
                value: item?.id,
                label: item?.salary_grade_name
            }
            setSalaryGrade(prevSalaryGrade => [...prevSalaryGrade, set_data]);
        })
    }, [allSalaryGrade])
    return (
        <form onChange={handleSubmit(EmployeeCompanyInformation)} className="mt-3">
            <div className="row row-cols-1 row-cols-md-2">
                <div className="col">
                    <div style={{ position: "relative" }}>
                        {/*<p onClick={organizationToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">*/}
                        {/*    New Organization*/}
                        {/*    <span><i className="icofont icofont-plus-circle"></i></span>*/}
                        {/*    <AddOrganizationModal reFetch={allOrganizationReFetch} modal={organizationModal} toggle={organizationToggle} />*/}
                        {/*</p>*/}

                        <div>
                            <Select
                                labelName={"Organization"}
                                placeholder={"Select an option"}
                                options={organization}
                                previous={selectedOrganization}
                                setValue={setSelectedOrganization}
                                cngFn={handleChangeForOrg}
                            />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div style={{ position: "relative" }}>
                        {/*<p onClick={CompanyToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">*/}
                        {/*    New Company*/}
                        {/*    <span><i className="icofont icofont-plus-circle"></i></span>*/}
                        {/*    <AddCompanyModal organization={organization} reFetch={allCompanyReFetch} modal={companyModal} toggle={CompanyToggle} />*/}
                        {/*</p>*/}

                        <div>
                            <Select
                                labelName={"Company"}
                                placeholder={"Select an option"}
                                options={company}
                                setValue={setSelectedCompany}
                                previous={selectedCompany}
                                cngFn={handleChangeForCompany}
                            />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div style={{ position: "relative" }}>
                        {/*<p onClick={branchToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">*/}
                        {/*    New Branch*/}
                        {/*    <span><i className="icofont icofont-plus-circle"></i></span>*/}
                        {/*    <AddBranchModal reFetch={allBranchReFetch} modal={branchModal} toggle={branchToggle} />*/}
                        {/*</p>*/}

                        <div>
                            <Select
                                labelName={"Branch"}
                                placeholder={"Select an option"}
                                options={branch}
                                setValue={setSelectedBranch}
                                previous={selectedBranch}
                                cngFn={handleChangeForBranch}
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
                                setValue={setSelectedDepartment}
                                previous={selectedDepartment}
                                cngFn={handleChangeForDept}
                            />
                        </div>
                    </div>
                </div>
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
                                setValue={setSelectedSection}
                                previous={selectedSection}
                                cngFn={handleChangeForSection}
                            />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div style={{ position: "relative" }}>
                        <p onClick={employeeGradeToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">
                            New Employee Grade
                            <span><i className="icofont icofont-plus-circle"></i></span>
                            <AddEmployeeGradeModal reFetch={allEmployeeGradeReFetch} modal={employeeGradeModal} toggle={employeeGradeToggle} />
                        </p>

                        <div>
                            <Select
                                labelName={"Employee Grade"}
                                placeholder={"Select an option"}
                                options={employeeGrade}
                                setValue={setSelectedEmployeeGrade}
                                previous={selectedEmployeeGrade}
                                cngFn={handleChangeForEmployeeGrade}
                            />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div style={{ position: "relative" }}>
                        <p onClick={salaryGradeToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">
                            New salary Grade
                            <span><i className="icofont icofont-plus-circle"></i></span>
                            <AddSalaryGradeModal reFetch={allSalaryGradeReFetch} modal={salaryGradeModal} toggle={salaryGradeToggle} />
                        </p>

                        <div>
                            <Select
                                labelName={"Salary Grade"}
                                placeholder={"Select an option"}
                                options={salaryGrade}
                                setValue={setSelectedSalaryGrade}
                                previous={selectedSalaryGrade}
                                cngFn={handleChangeForSalaryGrade}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div style={{ position: "relative" }}>
                        {/*<p onClick={shiftToggle} style={{position: "absolute", right: "14px", cursor: "pointer",}} className="text-primary">*/}
                        {/*    New shift*/}
                        {/*    <span><i className="icofont icofont-plus-circle"></i></span>*/}
                        {/*    <AddShiftModal reFetch={allShiftReFetch} modal={shiftModal} toggle={shiftToggle} />*/}
                        {/*</p>*/}

                        <div>
                            <Select
                                labelName={"Shift"}
                                placeholder={"Select an option"}
                                options={shift}
                                setValue={setSelectedShift}
                                previous={selectedShift}
                                cngFn={handleChangeForShift}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="d-flex justify-content-end">*/}
            {/*    <button className="btn btn-primary mt-2"*/}
            {/*            style={{width: "max-content", marginLeft: "auto", marginBottom: "30px"}}*/}
            {/*            type="submit">*/}
            {/*        Next*/}
            {/*    </button>*/}
            {/*</div>*/}
        </form>
    );
};

export default EmployeeCompanyInformation;