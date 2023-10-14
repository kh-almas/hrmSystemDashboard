import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Link} from "react-router-dom";
import getEmployee from "../../../common/Query/hrm/GetEmployee";
import Select from "../../../common/modal/Select";
import getDailyAttendanceReportsAPI from "../../../common/Query/hrm/forSort/getDailyAttendanceReportsAPI";
import getEmployeeWiseAttendanceReportsAPI from "../../../common/Query/hrm/forSort/getEmployeeWiseAttendanceReportsAPI";

const EmployeeWiseAttendanceReport = () => {
    const [modal, setModal] = useState();
    const [data, setData] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [dateFrom, setDateForm] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = getEmployee();

    // console.log(dateFrom, dateTo)

    useEffect(() => {
        const employeeWiseAttendanceReport = async () => {

            // console.log("selectedCompany2", selectedCompany)
            const getData = await getEmployeeWiseAttendanceReportsAPI(selectedEmployee, dateFrom, dateTo);
            setData(getData?.data?.body?.data);
            console.log(getData?.data?.body?.data);
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


    const dateto = e => {
        setDateTo(e.target.value);
    }
    const dateform = e => {
        setDateForm(e.target.value)
    }


    const toggle = () => {
        setModal(!modal);
    };
    return (
        <>
            <div className="pt-4 mb-3">
                <div className="d-flex flex-rows justify-content-center">
                    <div>
                        <h3 className="fw-bold">Employee Wise Attendance Reports</h3>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to={"/dashboard/hrm/attendance/single/pdf"} target="_blank" className="ms-3 btn btn-primary">
                        View PDF
                    </Link>
                </div>
            </div>

            <div className="card" style={{padding: "20px"}}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Date From</label>
                        <input onChange={dateform} className="form-control" required={true} type="date"/>
                    </div>
                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Date To</label>
                        <input onChange={dateto} className="form-control" required={true} type="date"/>
                    </div>


                    <div className="col">
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={employee}
                            setValue={setSelectedEmployee}
                        />
                    </div>


                    <div className="col">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "20px",
                                marginTop: "20px",
                            }}
                        >
                            <button
                                className="btn btn-primary btn-lg"
                                style={{padding: "5px 15px"}}
                            >
                                <i className="fa fa-search"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-lg"
                                style={{padding: "5px 15px", borderRadius: "5px"}}
                            >
                                <i className="fa fa-trash-o"></i>
                            </button>
                            <button
                                onClick={toggle}
                                className="btn btn-primary btn-lg"
                                style={{padding: "5px 15px"}}
                            >
                                <i className="fa fa-paste"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Import employee CSV file</ModalHeader>
                <ModalBody>
                    <form className="m-t-15 m-b-15">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "20px",
                            }}
                        >
                            <h6 className="m-0">Download sample employee CSV file</h6>
                            <button className="btn btn-primary btn-lg">
                                {" "}
                                <i className="fa fa-upload"></i> Download
                            </button>
                        </div>
                        <label htmlFor="exampleFormControlInput1">Select CSV File</label>{" "}
                        <br/>
                        <input type="file"/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">
                        Upload
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>


            {console?.log("data", data)}
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
                                        <th scope="col">{"Status"}</th>
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
                                                <td>{singleItem?.status ? singleItem?.status : "N/A"}</td>
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
