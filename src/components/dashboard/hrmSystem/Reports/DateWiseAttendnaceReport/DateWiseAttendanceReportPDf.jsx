import React from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import Invoice from "./reports/Invoice";
import {useLocation} from "react-router-dom";
import queryString from 'query-string';

const DateWiseAttendanceReportPDf = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    // console.log("queryParams", queryParams);
    return (
        <>
            <PDFViewer style={{width: '100%', height: '100vh'}} className="app" >
                <Invoice queryParams={queryParams}/>
            </PDFViewer>
        </>
    );
};

export default DateWiseAttendanceReportPDf;