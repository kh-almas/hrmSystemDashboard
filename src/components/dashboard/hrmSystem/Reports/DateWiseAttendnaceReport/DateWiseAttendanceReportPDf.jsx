import React, {useEffect, useState} from 'react';
import { Viewer, Core, PdfExport } from '@grapecity/activereports-react';
import "@grapecity/activereports/styles/light-blue-ui.css";
import "@grapecity/activereports/styles/light-blue-viewer.css";
import './style.css';
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/tabulardataexport";
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
import axios from "../../../../../axios";

const DateWiseAttendanceReportPDf = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const [data, setData] = useState();

    const dateFrom = queryParams.dateFrom;
    const dateTo = queryParams.dateTo;
    const selectedEmployee = queryParams.selectedEmployee;

    const convertedDate = moment(dateFrom).format('MM/DD/YYYY')

    console.log('data', data);
    useEffect(() => {
        // console.log(dateFrom);
        const convertedDate = moment(dateFrom).format('MM/DD/YYYY')

        // console.log(convertedDate)
        axios.get(`/hrm-system/reports/check?date='${convertedDate}'`)
            .then(data => {
                setData(data?.data?.body?.data?.data);
            })
            .then(e => console.log(e))
        // const employeeWiseMovementReport = async () => {
        //     const getData = await getEmployeeMovementReportsAPI(selectedEmployee, dateFrom, dateTo);
        //     setData(getData?.data?.body?.data);
        // }
        // employeeWiseMovementReport();

    }, [selectedEmployee, dateFrom, dateTo])

    const exportsSettings = {
        pdf: {
            title: "ActiveReportsJS Sample",
            author: "GrapeCity",
            subject: "Web Reporting",
            keywords: "reporting, sample",
            // userPassword: "pwd",
            // ownerPassword: "ownerPwd",
            printing: "true",
            copying: false,
            modifying: false,
            annotating: false,
            contentAccessibility: false,
            documentAssembly: false,
            pdfVersion: "1.7",
            autoPrint: false,
            filename: "ActiveReportsJS-Sample.pdf",
        },
        html: {
            title: "ActiveReportsJS Sample",
            filename: "ActiveReportsJS-Sample.html",
            autoPrint: true,
            multiPage: true,
            embedImages: "external",
            outputType: "html",
        }
    };

    const availableExports = ["pdf", "html", "tabular-data"];
    // const availableExports = ["pdf", "tabular-data"];

    return (
        <div id="viewer-host" style={{width: '100%', height: "100vh"}}>
            <Viewer
                report={{
                    Uri: "/reports/report.rdlx-json",
                }}
                exportsSettings={exportsSettings}
                availableExports={availableExports}
            />
        </div>
    );
};

export default DateWiseAttendanceReportPDf;