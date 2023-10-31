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

const ManualAttendancesForm = ({dataUpdateModal, dataUpdateToggle, oldData, refetch}) => {
    const [employee, setEmployee] = useState([]);
    const [company, setCompany] = useState([]);
    const [branch, setBranch] = useState([]);
    const [shift, setShift] = useState([]);


    const [selectedOrganization, setSelectedOrganization] = useState(localStorage.getItem("org_id"));
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("branch_id"));
    const [selectedShift, setSelectedShift] = useState("");
    const [employeeId, setEmployeeId] = useState('');
    const [attendanceType, setAttendanceType] = useState('');
    const [status, setStatus] = useState('Active');
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = GetEmployee();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();
    const [allShiftStatus, allShiftReFetch, allShift, allShiftError] = getAllShift();


    const formattedTime = time => moment(time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm");
    const formattedTimeForUpdate = time => moment(time, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss");

    // console.log(selectedShift);
    useEffect(() => {
        setSelectedShift(oldData?.shift_id);
        setEmployeeId(oldData.employee_id);
    }, [oldData])

    useEffect( () => {
        setEmployee([])
        if(selectedShift !== "")
        {
            const sortData = allEmployee?.data?.body?.data?.data?.filter(data => parseInt(data.shift_id) === parseInt(selectedShift))
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


    const onSubmit = (data) => {
        console.log(data);
        const in_time = formattedTimeForUpdate(data.in_time);
        data.in_time = in_time;
        const out_time = formattedTimeForUpdate(data.out_time);
        data.out_time = out_time;
        data.organization_id = selectedOrganization;
        data.company_id = selectedCompany;
        data.branch_id = selectedBranch;
        data.shift_id = selectedShift;
        data.employee_id= employeeId;
        data.attendance_type = '2';
        data.status = status;
        const updatedData = {
            'organization_id':selectedOrganization ? selectedOrganization : oldData.organization_id,
            'company_id': selectedCompany ? selectedCompany : oldData.company_id,
            'branch_id': selectedBranch ? selectedBranch : oldData.branch_id,
            'attendance_type': data.attendance_type ? data.attendance_type : oldData.attendance_type,
            'date':data.date ? data.date : oldData.date,
            'employee_id': employeeId ? employeeId : oldData.employee_id,
            'in_time':data.in_time ? data.in_time : oldData.in_time,
            'out_time':data.out_time ? data.out_time : oldData.out_time,
            'shift_id':data.shift_id ? data.shift_id : oldData.shift_id,
            'status':data.status ? data.status : oldData.status
        }


        axios.put(`/hrm-system/manual-attendance/${oldData.id}`, updatedData)
            .then(info => {
                // console.log(info)
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
                    refetch();
                }
            })
            .catch(e => {
                if(e?.response?.data?.body?.errno == 409){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Can not duplicate attendance`
                    })
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${e?.response?.data?.body?.message?.details[0].message}`
                    })
                }
            })
    };


    return (
        <>
            <BaseModal title={"Update Manual Attendance"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        {/*<div>*/}
                        {/*    <Select*/}
                        {/*        labelName={"Company:"}*/}
                        {/*        placeholder={"Select an option"}*/}
                        {/*        options={company}*/}
                        {/*        previous={oldData?.company_id}*/}
                        {/*        setValue={setSelectedCompany}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <Select*/}
                        {/*        labelName={"Branch:"}*/}
                        {/*        placeholder={"Select an option"}*/}
                        {/*        options={branch}*/}
                        {/*        previous={oldData?.branch_id}*/}
                        {/*        setValue={setSelectedBranch}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div>
                            <Select
                                labelName={"Shift:"}
                                placeholder={"Select an option"}
                                options={shift}
                                previous={oldData?.shift_id}
                                setValue={setSelectedShift}
                            />
                        </div>
                        <div>

                            <Select
                                labelName={"Employee Name"}
                                placeholder={"Select an option"}
                                options={employee}
                                previous={employeeId}
                                // error={errors?.employee_id}
                                setValue={setEmployeeId}
                            />

                        </div>
                        <div>
                            <Input
                                labelName={"Date"}
                                inputName={"date"}
                                inputType={"date"}
                                defaultValue={oldData?.date}
                                validation={{...register("date", {required: true})}}
                                error={errors?.date}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Clock In"}
                                inputName={"inTime"}
                                inputType={"datetime-local"}
                                defaultValue={formattedTime(oldData?.in_time)}
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
                                defaultValue={formattedTime(oldData?.out_time)}
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
                                previous={oldData.status}
                                setValue={setStatus}
                            />
                            {
                                // console.log('status',oldData.status)
                            }
                        </div>
                    </div>


                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={() =>dataUpdateToggle('')} className="me-2">
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

export default ManualAttendancesForm;