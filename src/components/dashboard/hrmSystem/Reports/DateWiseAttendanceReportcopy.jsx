import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import GetAllCompany from "../../../common/Query/hrm/GetAllCompany";
import getAllBranch from "../../../common/Query/hrm/GetAllBranch";
import Select from "../../../common/modal/Select";
import getDailyAttendanceReportsAPI from "../../../common/Query/hrm/forSort/getDailyAttendanceReportsAPI";
import {PDFDownloadLink} from "@react-pdf/renderer";
import Invoice from "./DateWiseAttendnaceReport/reports/Invoice";
import {Download} from "react-feather";
import moment from "moment";
import getAllDepartment from "../../../common/Query/hrm/GetAllDepartment";


const DateWiseAttendanceReport = () => {
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();
    const [allDepartmentStatus, allDepartmentReFetch, allDepartment, allDepartmentError] = getAllDepartment();
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");

    const [selectedCompanyInfo, setSelectedCompanyInfo] = useState({});
    const [selectedBranchInfo, setSelectedBranchInfo] = useState({});

    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [dateFrom, setDateForm] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [company, setCompany] = useState([]);
    const [branch, setBranch] = useState([]);
    const [department, setDepartment] = useState([]);
    const [data, setData] = useState([]);

    console.log(branch)

    const totalMinutes = time => Math.round(moment.duration(time).asMinutes());
    const formattedTime = time => moment(time, "YYYY-MM-DD HH:mm:ss").format("h:mm A");

    const handleChangeForUpdateCompany = (selected) => {
        setSelectedCompany(selected?.value);
        setSelectedCompanyInfo(selected);
    };

    const handleChangeForUpdateBranch = (selected) => {
        setSelectedBranch(selected?.value);
        setSelectedBranchInfo(selected);
    };

    const removeSearch = () => {
        setSelectedCompany('');
        setSelectedBranch('');
        setDateForm('');
        setDateTo('');
    }
    useEffect(() => {
        // console.log('selectedCompany', selectedCompany, 'selectedBranch', selectedBranch, 'dateFrom', dateFrom, 'dateTo', dateTo, 'selectedDepartment', selectedDepartment)
        const getDailyAttendanceReport = async () => {
            const getData = await getDailyAttendanceReportsAPI(selectedCompany, selectedBranch, dateFrom, dateTo, selectedDepartment);
            setData(getData?.data?.body?.data?.data);
            // console.log(getData?.data?.body?.data?.data);
        }
        getDailyAttendanceReport();

    }, [selectedCompany, selectedBranch, dateFrom, dateTo])

    useEffect(() => {
        setCompany([])
            allCompany?.data?.body?.data?.data?.map(item => {
                const set_data = {
                    value: item.id,
                    label: item.name
                }
                setCompany(prevCompany => [...prevCompany, set_data]);
            })
    }, [allCompany])

    // useEffect(() => {
    //     setDepartment([])
    //         allDepartment?.data?.body?.data?.data?.map(item => {
    //             const set_data = {
    //                 id: item.id,
    //                 value: item.name
    //             }
    //             setDepartment(prevDepartment => [...prevDepartment, set_data]);
    //         })
    // }, [allDepartment, selectedDepartment])

    useEffect(() => {
        setBranch([])
        if (selectedCompany !== ""){
            const sortedData = allBranch?.data?.body?.data?.data?.filter((data) => parseInt(data.company_id) === parseInt(selectedCompany))
            sortedData?.map(item => {
                const set_data = {
                    value: item.id,
                    label: item.name
                }
                setBranch(prevBranch => [...prevBranch, set_data]);
            })
        }
    }, [allBranch, selectedCompany])

    const dateto = e => {
        setDateTo(e.target.value);
    }
    const dateform = e => {
        setDateForm(e.target.value)
    }

    const [modal, setModal] = useState();

    const toggle = () => {
        setModal(!modal);
    };
    return (
        <>
            <div className="pt-4 mb-3">
                <div className="d-flex flex-rows justify-content-center">
                    <div>
                        <h3 className="fw-bold">Date Wise Attendance Report</h3>
                    </div>
                </div>
                <div className="d-flex justify-content-center">

                    {/*<div>*/}
                    {/*    <Link to={`/dashboard/hrm/attendance/datewise/pdf?startdate=${dateFrom}&enddate=${dateTo}&setcompany=${selectedCompany}&setbranch=${selectedBranch}`} target="_blank" className="ms-3 btn btn-primary">View*/}
                    {/*        PDF</Link>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <PDFDownloadLink document={<Invoice />} fileName="somename.pdf">*/}
                    {/*        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}*/}
                    {/*    </PDFDownloadLink>*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className="card" style={{padding: "20px"}}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Date From</label>
                        <input onChange={dateform} value={dateFrom} className="form-control" required={true} type="date"/>
                    </div>
                    <div className="col">
                        <label htmlFor="exampleFormControlInput1">Date To</label>
                        <input onChange={dateto}  value={dateTo} className="form-control" required={true} type="date"/>
                    </div>
                    <div className="col">
                        <div>
                            <Select
                                labelName={"Company"}
                                placeholder={"Select an option"}
                                options={company}
                                setValue={setSelectedCompanyInfo}
                                cngFn={handleChangeForUpdateCompany}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <Select
                                labelName={"Branch"}
                                placeholder={"Select an option"}
                                options={branch}
                                setValue={setSelectedBranchInfo}
                                cngFn={handleChangeForUpdateBranch}
                            />
                        </div>
                    </div>
                    {/*<div className="col">*/}
                    {/*    <div>*/}
                    {/*        <Select*/}
                    {/*            labelName={"Department"}*/}
                    {/*            placeholder={"Select an option"}*/}
                    {/*            options={department}*/}
                    {/*            setValue={setSelectedDepartment}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="col-1">
                        {/*<div className="col-1">*/}
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "25px"}}>
                                <button className="btn btn-danger btn-lg " style={{padding: "0 10px 3px 10px", borderRadius: "5px", marginRight : '3px'}} onClick={() => removeSearch()}>
                                    <i style={{fontSize: '8px'}} className= "icon-close"></i>
                                </button>
                                <Link to={`/dashboard/hrm/attendance/datewise/pdf?dateFrom=${dateFrom}&dateTo=${dateTo}&selectedCompany=${selectedCompany}&selectedBranch=${selectedBranch}`} target={"_blank"} className="btn btn-danger btn-lg " style={{padding: "0 10px 3px 10px", borderRadius: "5px", marginRight : '3px'}}>
                                    <i style={{fontSize: '8px'}} className= "icon-eye"></i>
                                </Link>
                                {/*<button  onClick={() => removeSearch()}>*/}
                                {/*    /!*<i style={{fontSize: '8px'}} data-feather="download"></i>*!/*/}
                                {/*    */}

                                <PDFDownloadLink
                                    className="btn btn-danger btn-lg" style={{padding: "0 10px 3px 10px", borderRadius: "5px"}}
                                    document={<Invoice data={data}></Invoice>} fileName="datewise-attendance.pdf">
                                    <Download size={'12px'}></Download>
                                </PDFDownloadLink>
                                {/*</button>*/}
                            </div>
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            {
                data?.map((com, index) =>
                    <div className="card" style={{padding: "20px"}} key={index}>
                        <div>
                            <h6 className="fw-bold">Company: {com?.company_name}</h6>
                        </div>
                        <hr/>
                        {
                            com?.branch?.map((branch, index) =>
                                <div className="mb-3" key={index}>
                                    <h6 style={{fontSize: "13px"}}
                                        className="fw-bold mb-3">Branch: {branch?.branch?.name}</h6>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className=" table-border">
                                            <tr>
                                                <th scope="col">{"Date"}</th>
                                                <th scope="col">{"Employee Code"}</th>
                                                <th scope="col">{"Employee Name"}</th>
                                                <th scope="col">{"Designation"}</th>
                                                <th scope="col">{"In Time"}</th>
                                                <th scope="col">{"Out Time"}</th>
                                                <th scope="col">{"Late In"}</th>
                                                <th scope="col">{"Early Out"}</th>
                                                <th scope="col">{"Overtime"}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                branch?.branch?.attendance?.map((attendance, index) =>
                                                    <tr>
                                                        <td>{attendance?.date ? attendance?.date : 'N/A'}</td>
                                                        <td>{attendance?.c_no ? attendance?.c_no : 'N/A'}</td>
                                                        <td>{attendance?.employee_name ? attendance?.employee_name : 'N/A'}</td>
                                                        <td>{attendance?.desig_name ? attendance?.desig_name : 'N/A'}</td>
                                                        <td>{attendance?.in_time ? formattedTime(attendance?.in_time) : 'N/A'}</td>
                                                        <td>{attendance?.out_time ? formattedTime(attendance?.out_time) : 'N/A'}</td>
                                                        <td>{attendance?.late && totalMinutes(attendance?.late) != '0' ? <span class="badge text-bg-danger">{totalMinutes(attendance?.late)}m</span> : 'N/A'}</td>
                                                        <td>{attendance?.early_out && totalMinutes(attendance?.early_out) != '0' ? <span className="badge text-bg-danger">{totalMinutes(attendance?.early_out)}m</span> : 'N/A'}</td>
                                                        <td>{attendance?.over_time && totalMinutes(attendance?.over_time) != '0' ? <span className="badge text-bg-success">{totalMinutes(attendance?.over_time)}m</span> : 'N/A'}</td>
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
                )
            }
        </>
    );
};

export default DateWiseAttendanceReport;
