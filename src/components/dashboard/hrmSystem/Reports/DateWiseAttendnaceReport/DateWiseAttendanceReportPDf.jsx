import React, {useEffect, useState} from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import Invoice from "./reports/Invoice";
import {useLocation} from "react-router-dom";
import queryString from 'query-string';
import getDailyAttendanceReportsAPI from "../../../../common/Query/hrm/forSort/getDailyAttendanceReportsAPI";

const DateWiseAttendanceReportPDf = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    // console.log("queryParams", queryParams);

    const {dateFrom, dateTo, selectedCompany, selectedBranch} = queryParams;

    const [data, setData] = useState([]);
    useEffect(() => {
        const getManualAttendance= async () => {
            const getData = await getDailyAttendanceReportsAPI(selectedCompany, selectedBranch, dateFrom, dateTo);
            setData(getData?.data?.body?.data?.data);
        }
        getManualAttendance();
    }, [])
    return (
        <>
            <PDFViewer style={{width: '100%', height: '100vh'}} className="app" >
                <Invoice data={data}/>
            </PDFViewer>
        </>
    );
};

export default DateWiseAttendanceReportPDf;