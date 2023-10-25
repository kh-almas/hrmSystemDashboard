import React, {useEffect, useState} from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import Invoice from "./reports/Invoice";
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import getEmployeeSummeryReportsAPI from "../../../../common/Query/hrm/forSort/getEmployeeSummeryReportsAPI";
import getEmployeeMovementReportsAPI from "../../../../common/Query/hrm/forSort/getEmployeeMovementReportsAPI";

const EmployMovementReportPDf = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const [data, setData] = useState([]);

    const dateFrom = queryParams.dateFrom;
    const dateTo = queryParams.dateTo;
    const selectedEmployee = queryParams.selectedEmployee;

    // console.log(dateFrom, dateTo, selectedEmployee);
    useEffect(() => {
        const employeeWiseMovementReport = async () => {
            const getData = await getEmployeeMovementReportsAPI(selectedEmployee, dateFrom, dateTo);
            setData(getData?.data?.body?.data);
        }
        employeeWiseMovementReport();

    }, [selectedEmployee, dateFrom, dateTo])
    return (
        <>
            <PDFViewer style={{width: "100%", height: "100vh"}} className="app" >
                <Invoice data={data}> </Invoice>
            </PDFViewer>
        </>
    );
};

export default EmployMovementReportPDf;