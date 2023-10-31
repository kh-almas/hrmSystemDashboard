import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Input from "../Input";
import Select from "../Select";
import BaseModal from "../BaseModal";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import moment from "moment";
import GetEmployee from "../../Query/hrm/GetEmployee";
import GetAllWeekday from "../../Query/hrm/GetAllWeekday";
import GetAllShift from "../../Query/hrm/GetAllShift";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import getAllBranch from "../../Query/hrm/GetAllBranch";
import getAllShift from "../../Query/hrm/GetAllShift";

const ManualAttendancesForm = ({dataModal, dataToggle, refetch}) => {
    const [employee, setEmployee] = useState([]);
    const [company, setCompany] = useState([]);
    const [branch, setBranch] = useState([]);
    const [shift, setShift] = useState([]);


    const [selectedOrganization, setSelectedOrganization] = useState(localStorage.getItem("org_id"));
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("branch_id"));
    const [selectedShift, setSelectedShift] = useState("");
    const [employeeId, setEmployeeId] = useState('');
    const [status, setStatus] = useState('Active');
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = GetEmployee();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();
    const [allShiftStatus, allShiftReFetch, allShift, allShiftError] = getAllShift();

    // console.log(employeeId)
    useEffect( () => {
        setEmployee([])
        if(selectedShift !== "")
        {
            const sortData = allEmployee?.data?.body?.data?.data?.filter(data => parseInt(data.shift_id) === parseInt(selectedShift))
            // console.log("sortData",sortData);
            sortData?.map(item => {
                const set_data = {
                    id: item.id,
                    value: item?.full_name
                }
                setEmployee(prevEmployee => [...prevEmployee, set_data]);
            })
        }
    }, [allEmployee, selectedShift])

    useEffect(() => {
        setCompany([])
        if (selectedOrganization !== ""){
            const sortedData = allCompany?.data?.body?.data?.data?.filter((data) => parseInt(data.organization_id) === parseInt(selectedOrganization))
            sortedData?.map(item => {
                const set_data = {
                    id: item?.id,
                    value: item?.name
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
                    id: item?.id,
                    value: item?.name
                }
                setBranch(prevBranch => [...prevBranch, set_data]);
            })
        }
    }, [allBranch, selectedCompany])

    useEffect(() => {
        setShift([])
        if (selectedCompany !== ""){
            const sortedData = allShift?.data?.body?.data?.data?.filter((data) => parseInt(data.branch_id) === parseInt(selectedBranch))
            sortedData?.map(item => {
                const set_data = {
                    id: item?.id,
                    value: item?.name
                }
                setShift(prevShift => [...prevShift, set_data]);
            })
        }
    }, [allShift, selectedBranch])

    const formattedTime = time => moment(time, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss");

    const onSubmit = (data) => {
        const in_time = formattedTime(data.in_time);
        data.in_time = in_time;
        const out_time = formattedTime(data.out_time);
        data.out_time = out_time;
        data.organization_id = selectedOrganization;
        data.company_id = selectedCompany;
        data.branch_id = selectedBranch;
        data.shift_id = selectedShift;
        data.device_id = "";
        data.employee_id= employeeId;
        data.attendance_type= '2';
        data.status= status;
        // console.log(data)

        axios.post('/hrm-system/manual-attendance', data)
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
                    dataToggle(false);
                    reset();
                    refetch();
                    setSelectedCompany('');
                    setSelectedBranch('');
                    setEmployeeId('');
                    setSelectedShift('');
                    setStatus('Active');
                }

            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    };


    return (
        <>
            <BaseModal title={"Manual Attendance"} dataModal={dataModal} dataToggle={dataToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        {/*<div>*/}
                        {/*    <Select*/}
                        {/*        labelName={"Company:"}*/}
                        {/*        placeholder={"Select an option"}*/}
                        {/*        options={company}*/}
                        {/*        setValue={setSelectedCompany}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <Select*/}
                        {/*        labelName={"Branch:"}*/}
                        {/*        placeholder={"Select an option"}*/}
                        {/*        options={branch}*/}
                        {/*        setValue={setSelectedBranch}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div>
                            <Select
                                labelName={"Shift:"}
                                placeholder={"Select an option"}
                                options={shift}
                                setValue={setSelectedShift}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Employee Name"}
                                placeholder={"Select an option"}
                                options={employee}
                                setValue={setEmployeeId}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Date"}
                                inputName={"date"}
                                inputType={"date"}
                                validation={{...register("date", {required: true})}}
                                error={errors?.date}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Clock In"}
                                inputName={"inTime"}
                                inputType={"datetime-local"}
                                validation={{...register("in_time", {required: true})}}
                                error={errors?.in_time}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Clock Out"}
                                inputName={"outTime"}
                                inputType={"datetime-local"}
                                validation={{...register("out_time", {required: true})}}
                                error={errors?.out_time}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Status"}
                                placeholder={"Select an option"}
                                options={[
                                    {id: "Present", value: "Present"},
                                    {id: "Absent", value: "Absent"},
                                    {id: "On Leave", value: "On Leave"},
                                    {id: "Sick Leave", value: "Sick Leave"},
                                    {id: "Vacation", value: "Vacation"},
                                ]}
                                error={errors?.status}
                                setValue={setStatus}
                            />
                        </div>
                    </div>


                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={dataToggle} className="me-2">
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

export default ManualAttendancesForm;