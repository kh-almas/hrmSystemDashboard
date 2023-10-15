import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Link} from "react-router-dom";
import getEmployee from "../../../common/Query/hrm/GetEmployee";
import Select from "../../../common/modal/Select";
import getDailyAttendanceReportsAPI from "../../../common/Query/hrm/forSort/getDailyAttendanceReportsAPI";
import getEmployeeWiseAttendanceReportsAPI from "../../../common/Query/hrm/forSort/getEmployeeWiseAttendanceReportsAPI";
import {Download} from "react-feather";
import {PDFDownloadLink} from "@react-pdf/renderer";
import Invoice from "./EmployWiseAttendanceReport/reports/Invoice";

const EmployeeWiseAttendanceReport = () => {
    const [data, setData] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [dateFrom, setDateForm] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = getEmployee();

    const removeSearch = () => {
        setSelectedEmployee('');
        setDateForm('');
        setDateTo('');
    }

    useEffect(() => {
        const employeeWiseAttendanceReport = async () => {

            // console.log("selectedCompany2", selectedCompany)
            const getData = await getEmployeeWiseAttendanceReportsAPI(selectedEmployee, dateFrom, dateTo);
            setData(getData?.data?.body?.data);
            // console.log(getData?.data?.body?.data);
        }
        employeeWiseAttendanceReport();

    }, [selectedEmployee, dateFrom, dateTo])


    useEffect(() => {
        setEmployee([])
        allEmployee?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.full_name
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
                        <h3 className="fw-bold">Employee Wise Attendance Reports</h3>
                    </div>
                </div>
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
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={employee}
                            setValue={setSelectedEmployee}
                        />
                    </div>


                    <div className="col-1">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "25px",}}>
                            <button className="btn btn-danger btn-lg " style={{padding: "0 10px 3px 10px", borderRadius: "5px", marginRight : '3px'}} onClick={() => removeSearch()}>
                                <i style={{fontSize: '8px'}} className= "icon-close"></i>
                            </button>
                            <Link to={`/dashboard/hrm/attendance/single/pdf?startdate=${dateFrom}&enddate=${dateTo}&selectedEmployee=${selectedEmployee}`} target={"_blank"} className="btn btn-danger btn-lg " style={{padding: "0 10px 3px 10px", borderRadius: "5px", marginRight : '3px'}}>
                                <i style={{fontSize: '8px'}} className= "icon-eye"></i>
                            </Link>
                            {/*<button  onClick={() => removeSearch()}>*/}
                            {/*    /!*<i style={{fontSize: '8px'}} data-feather="download"></i>*!/*/}
                            {/*    */}

                            <PDFDownloadLink
                                className="btn btn-danger btn-lg" style={{padding: "0 10px 3px 10px", borderRadius: "5px"}}
                                document={<Invoice data={data}></Invoice>} fileName="somename.pdf">
                                    <Download size={'12px'}></Download>
                                </PDFDownloadLink>
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
            </div>
            {
                data?.map((info, index) =>
                    <div className="card mt-2" style={{padding: "20px"}} key={index}>
                        <div>
                            <h6 className="fw-bold">Employee Name: {info?.emp_name}</h6>
                            <p className="fw-bold mb-1">Employee Code: {info?.card_no}</p>
                            <p className="fw-bold mb-1">Department: {info?.dept_name}</p>
                        </div>
                        <hr/>
                        <div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="table-border">
                                    <tr>
                                        <th scope="col">{"Date"}</th>
                                        <th scope="col">{"In Time"}</th>
                                        <th scope="col">{"Out Time"}</th>
                                        <th scope="col">{"Late In"}</th>
                                        <th scope="col">{"Early Out"}</th>
                                        <th scope="col">{"Over Time"}</th>
                                        {/*<th scope="col">{"Status"}</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        info?.data?.map((singleItem, index)=>
                                            <tr key={index}>
                                                <td>{singleItem?.date ? singleItem?.date : "N/A"}</td>
                                                <td>{singleItem?.in_time ? singleItem?.in_time : "N/A"}</td>
                                                <td>{singleItem?.out_time ? singleItem?.out_time : "N/A"}</td>
                                                <td>{singleItem?.late ? singleItem?.late : "N/A"}</td>
                                                <td>{singleItem?.early_out ? singleItem?.early_out : "N/A"}</td>
                                                <td>{singleItem?.over_time ? singleItem?.over_time : "N/A"}</td>
                                                {/*<td>{singleItem?.status ? singleItem?.status : "N/A"}</td>*/}
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default EmployeeWiseAttendanceReport;
