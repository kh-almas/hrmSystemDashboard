import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {
    Document,
    Image,
    Page,
    PDFDownloadLink,
    Text,
    View,
} from "@react-pdf/renderer";
import {Link} from "react-router-dom";
import Select from "../../../common/modal/Select";
import {Download} from "react-feather";
import getEmployee from "../../../common/Query/hrm/GetEmployee";
import getEmployeeSummeryReportsAPI from "../../../common/Query/hrm/forSort/getEmployeeSummeryReportsAPI";
import getEmployeeMovementReportsAPI from "../../../common/Query/hrm/forSort/getEmployeeMovementReportsAPI";
import moment from "moment";
import Invoice from "./EmployMovementReport/reports/Invoice";


const formattedTime = time => moment(time, "YYYY-MM-DD HH:mm:ss").format("h:mm A");
const formattedDate = time => moment(time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");

const EmployeeMovement = () => {
    const [dateFrom, setDateForm] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [data, setData] = useState([]);
    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = getEmployee();

    console.log(dateTo);
    const formattedDateTime = time => moment(time, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss");
    const formattedDateTimeForInput = time => moment(time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");

    useEffect(() => {
        const employeeWiseMovementReport = async () => {
            const getData = await getEmployeeMovementReportsAPI(selectedEmployee, dateFrom, dateTo);
            setData(getData?.data?.body?.data);
            console.log(getData?.data?.body?.data);
        }
        employeeWiseMovementReport();
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

    const removeSearch = () => {
        setSelectedEmployee('');
        setDateForm('');
        setDateTo('');
    }

    const datetoFn = e => {
        setDateTo(formattedDateTime(e.target.value));
    }
    const dateformFn = e => {
        setDateForm(formattedDateTime(e.target.value));
    }

    return (
        <>
            <div className="pt-4 mb-3">
                <div className="d-flex flex-rows justify-content-center">
                    <div>
                        <h3 className="fw-bold">Employee Movement Reports</h3>
                    </div>
                </div>
            </div>

            <div className="card" style={{padding: "20px"}}>
                <div className="row">

                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Date From</label>
                        <input onChange={dateformFn} value={formattedDateTimeForInput(dateFrom)} className="form-control" required={true} type="date"/>
                    </div>

                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Date To</label>
                        <input onChange={datetoFn} value={formattedDateTimeForInput(dateTo)} className="form-control" required={true} type="date"/>
                    </div>

                    <div className="col">
                        <Select
                            labelName={"Employee"}
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
                            <Link to={`/dashboard/hrm/employee/movements/pdf?startdate=${dateFrom}&enddate=${dateTo}&selectedEmployee=${selectedEmployee}`} target={"_blank"} className="btn btn-danger btn-lg " style={{padding: "0 10px 3px 10px", borderRadius: "5px", marginRight : '3px'}}>
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

            {
                data?.map((info,index) =>
                    <div className="card" style={{padding: "20px"}} key={index}>
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
                                        <th scope="col">{"Machine ID"}</th>
                                        <th scope="col">{"Punch Time"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        info?.data?.map((movement, index) =>
                                            <tr key={index}>
                                                <td>{formattedDate(movement?.PunchTime)}</td>
                                                <td>{movement?.M_No}</td>
                                                <td>{formattedTime(movement?.PunchTime)}</td>
                                            </tr>
                                        )
                                    }
                                    {/* Add more rows as needed */}
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

export default EmployeeMovement;
