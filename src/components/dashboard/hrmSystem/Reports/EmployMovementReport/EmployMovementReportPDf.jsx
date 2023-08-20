import React from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import Invoice from "./reports/Invoice";

const EmployMovementReportPDf = () => {
    return (
        <>
            <PDFViewer width="1000" height="600" className="app" >
                <Invoice/>
            </PDFViewer>
        </>
    );
};

export default EmployMovementReportPDf;