import React, {useEffect, useState} from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import Invoice from "./reports/Invoice";
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import getEmployeeWiseAttendanceReportsAPI
    from "../../../../common/Query/hrm/forSort/getEmployeeWiseAttendanceReportsAPI";
import getEmployeeSummeryReportsAPI from "../../../../common/Query/hrm/forSort/getEmployeeSummeryReportsAPI";

const DailyAttendanceReportPDf = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const [data, setData] = useState([]);

    const dateFrom = queryParams.dateFrom;
    const dateTo = queryParams.dateTo;
    const selectedEmployee = queryParams.selectedEmployee;

    // console.log(dateFrom, dateTo, selectedEmployee);
    useEffect(() => {
        const employeeWiseAttendanceReport = async () => {
            const getData = await getEmployeeSummeryReportsAPI(selectedEmployee, dateFrom, dateTo);
            setData(getData?.data?.body?.data);
        }
        employeeWiseAttendanceReport();

    }, [selectedEmployee, dateFrom, dateTo])
    return (
        <>
            <PDFViewer style={{width: '100%', height: "100vh"}} className="app" >
                <Invoice data={data}></Invoice>
            </PDFViewer>
        </>
    );
};

export default DailyAttendanceReportPDf;