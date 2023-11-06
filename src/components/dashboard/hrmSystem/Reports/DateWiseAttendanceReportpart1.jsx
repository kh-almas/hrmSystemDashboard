import React from 'react';
import { Viewer, Core, PdfExport } from '@grapecity/activereports-react';
import * as arjs from '@grapecity/activereports-react';
import "@grapecity/activereports/styles/light-blue-ui.css";
import "@grapecity/activereports/styles/light-blue-viewer.css";
// import './../../../../../public/report.rdlx-json';
import './DateWiseAttendnaceReport/style.css';
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/tabulardataexport";
// import "@grapecity/activereports-localization";

const DateWiseAttendanceReport = () => {

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
        <div>
            <div id="viewer-host" style={{width: '100%', height: '100vh'}}>
                <Viewer
                    report={{ Uri: '/reports/report_attan.rdlx-json' }}
                    exportsSettings={exportsSettings}
                    availableExports={availableExports}
                />
            </div>
        </div>
    );
};

export default DateWiseAttendanceReport;
