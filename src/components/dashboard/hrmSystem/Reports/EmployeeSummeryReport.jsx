import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import getManualAttendanceReportsAPI from "../../../common/Query/hrm/forSort/getManualAttendanceReportsAPI";
import getEmployee from "../../../common/Query/hrm/GetEmployee";
import getEmployeeWiseAttendanceReportsAPI from "../../../common/Query/hrm/forSort/getEmployeeWiseAttendanceReportsAPI";
import getEmployeeSummeryReportsAPI from "../../../common/Query/hrm/forSort/getEmployeeSummeryReportsAPI";
import Select from "../../../common/modal/Select";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {Download} from "react-feather";
import Invoice from "./DailyAttendnaceReport/reports/Invoice";
import moment from "moment/moment";


const EmployeeSummeryReport = () => {
    const [data, setData] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState({});
    const [dateFrom, setDateForm] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = getEmployee();

    const totalMinutes = time => Math.round(moment.duration(time).asMinutes());
    // const formattedTime = time => moment(time, "YYYY-MM-DD HH:mm:ss").format("h:mm A");

    const handleChangeForUpdateEmployee = (selected) => {
        setSelectedEmployee(selected?.value);
        setSelectedEmployeeInfo(selected);
    };

    // console.log(data)
    const removeSearch = () => {
        setSelectedEmployee('');
        setDateForm('');
        setDateTo('');
    }

    useEffect(() => {
        const employeeWiseAttendanceReport = async () => {
            const getData = await getEmployeeSummeryReportsAPI(selectedEmployee, dateFrom, dateTo);
            setData(getData?.data?.body?.data);
            // console.log(getData?.data?.body?.data);
        }
        employeeWiseAttendanceReport();
    }, [selectedEmployee, dateFrom, dateTo])

    useEffect(() => {
        setEmployee([])
        allEmployee?.data?.body?.data?.data?.map(item => {
            const set_data = {
                value: item.id,
                label: item.full_name
            }
            setEmployee(prevEmployee => [...prevEmployee, set_data]);
        })
    }, [allEmployee])


    const datetoFn = e => {
        setDateTo(e.target.value);
    }

    const dateformFn = e => {
        setDateForm(e.target.value)
    }

    return (
        <>
            <div className="pt-4 mb-3">
                <div className="d-flex flex-rows justify-content-center">
                    <div>
                        <h3 className="fw-bold">Employee Summery Report</h3>
                    </div>
                </div>
                {/*<div className="d-flex justify-content-center">*/}
                {/*    <div>*/}
                {/*        <Link to={"/dashboard/hrm/attendance/daily/pdf"} target="_blank" className="ms-3 btn btn-primary" >View PDF</Link>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            <div className="card" style={{padding: "20px"}}>
                <div className="row">

                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Date From</label>
                        <input onChange={dateformFn} value={dateFrom} className="form-control" required={true} type="date"/>
                    </div>

                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Date To</label>
                        <input onChange={datetoFn} value={dateTo} className="form-control" required={true} type="date"/>
                    </div>

                    <div className="col">
                        <Select
                            labelName={"Employee"}
                            placeholder={"Select an option"}
                            options={employee}
                            setValue={setSelectedEmployee}
                            cngFn={handleChangeForUpdateEmployee}
                        />
                    </div>


                    <div className="col-1">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "25px",}}>
                            <button className="btn btn-danger btn-lg " style={{padding: "0 10px 3px 10px", borderRadius: "5px", marginRight : '3px'}} onClick={() => removeSearch()}>
                                <i style={{fontSize: '8px'}} className= "icon-close"></i>
                            </button>
                            <Link to={`/dashboard/hrm/summary/report/pdf?startdate=${dateFrom}&enddate=${dateTo}&selectedEmployee=${selectedEmployee}`} target={"_blank"} className="btn btn-danger btn-lg " style={{padding: "0 10px 3px 10px", borderRadius: "5px", marginRight : '3px'}}>
                                <i style={{fontSize: '8px'}} className= "icon-eye"></i>
                            </Link>
                            <PDFDownloadLink
                                className="btn btn-danger btn-lg" style={{padding: "0 10px 3px 10px", borderRadius: "5px"}}
                                document={<Invoice data={data}></Invoice>} fileName="employee_summery.pdf">
                                <Download size={'12px'}></Download>
                            </PDFDownloadLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" style={{padding: "20px"}}>
                {
                    data?.map((item, index) =>
                        <div className="mb-3" key={index}>
                            <h6 style={{fontSize: "13px"}} className="fw-bold mb-3">Department: {item?.department_name}</h6>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className=" table-border">
                                    <tr>
                                        <th scope="col">{"Employee Name"}</th>
                                        <th scope="col">{"Designation"}</th>
                                        <th scope="col">{"Present (Days)"}</th>
                                        <th scope="col">{"Absent (Days)"}</th>
                                        <th scope="col">{"Late (Days)"}</th>
                                        <th scope="col">{"Early Out (Days)"}</th>
                                        <th scope="col">{"Over Time (Hours)"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        item?.employees?.map((emp, index) =>
                                            <tr key={index}>
                                                <td>{emp?.emp_name ? emp?.emp_name : 'N/A'}</td>
                                                <td>{emp?.emp_designation ? emp?.emp_designation : 'N/A'}</td>
                                                <td>{emp?.totalPresent ? emp?.totalPresent : 'N/A'}</td>
                                                <td>{emp?.totalAbsent ? emp?.totalAbsent : 'N/A'}</td>
                                                <td>{emp?.totalLate ? emp?.totalLate : 'N/A'}</td>
                                                <td>{emp?.totalEarlyOut ? emp?.totalEarlyOut : 'N/A'}</td>
                                                <td>{emp?.totalOverTime && totalMinutes(emp?.totalOverTime) != '0' ? <span className="badge text-bg-success">{totalMinutes(emp?.totalOverTime)}m</span> : 'N/A'}</td>
                                            </tr>
                                        )
                                    }

                                    </tbody>
                                </table>
                                {/*<p className="text-center p-t-10">No entries found</p>*/}
                            </div>
                        </div>
                    )
                }

            </div>
        </>
    );
};

export default EmployeeSummeryReport;