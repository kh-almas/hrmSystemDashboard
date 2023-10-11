import React, {useEffect, useState} from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import Invoice from "./reports/Invoice";
import getManualAttendanceAPI from "../../../../common/Query/hrm/forSort/getManualAttendanceAPI";
import getManualAttendanceReportsAPI from "../../../../common/Query/hrm/forSort/getManualAttendanceReportsAPI";

const ManualAttendanceReportPDf = () => {
    const [data, setData] = useState([]);
    useEffect( () => {
        const getManualAttendance= async () => {
            const getData = await getManualAttendanceReportsAPI();
            setData(getData?.data?.body?.data?.data);

        }
        getManualAttendance();


    }, [])

    console.log(data);
    return (
        <>
            <PDFViewer style={{width: '100%', height: '100vh'}} className="app" >
                <Invoice data={data}></Invoice>
            </PDFViewer>
        </>
    );
};

export default ManualAttendanceReportPDf;