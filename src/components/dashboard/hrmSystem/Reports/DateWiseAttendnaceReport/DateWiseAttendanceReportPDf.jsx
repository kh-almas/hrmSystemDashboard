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

    async function loadData() {
        const headers = new Headers();
        const dataRequest = new Request(
            `https://hrm-system-backend.vercel.app/hrm-system/reports/check?date='${convertedDate}'`,
            {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access-token"),
                },
            }
        );

        const response = await fetch(dataRequest);
        const data = await response.json();
        return data;
    }

    async function loadReport() {
        // load report definition from the file
        const reportResponse = await fetch(
            "/reports/final.rdlx-json"
        );
        const report = await reportResponse.json();
        return report;
    }

    const viewerRef = React.useRef();
    React.useEffect(() => {
        async function openReport() {
            const data = await loadData();
            const report = await loadReport();
            report.DataSources[0].ConnectionProperties.ConnectString =
                "jsondata=" + JSON.stringify(data);
            viewerRef.current.Viewer.open(report);
        }
        openReport();
    }, []);

    return (
        <div>
            <div id="viewer-host" style={{width: '100%', height: '100vh'}}>
                <Viewer ref={viewerRef} />
            </div>
        </div>
    );
};

export default DateWiseAttendanceReportPDf;