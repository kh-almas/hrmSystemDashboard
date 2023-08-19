import React, {useState} from 'react';
import logo from '../../../../assets/images/logo/companyLogo.jpg';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';
import robotoRegular from '../../../../assets/fonts/googleFont/Roboto/Roboto-Regular.ttf';
import robotoLightItalic from '../../../../assets/fonts/googleFont/Roboto/Roboto-LightItalic.ttf';
import robotoBold from '../../../../assets/fonts/googleFont/Roboto/Roboto-Bold.ttf';
import robotoBlack from '../../../../assets/fonts/googleFont/Roboto/Roboto-Black.ttf';


// Font.register({
//     family: 'Roboto',
//     src: '../../../../assets/fonts/googleFont/Roboto/Roboto-Regular.ttf',
//     // fontStyle: 'normal',
//     // fontWeight: 'normal',
//     // fonts: [
//     //     { src: "../../../../assets/fonts/googleFont/Roboto/Roboto-Regular.ttf" },
//     //     { src: "../../../../assets/fonts/googleFont/Roboto/Roboto-LightItalic.ttf", fontStyle: 'italic' },
//     //     { src: "../../../../assets/fonts/googleFont/Roboto/Roboto-Bold.ttf", fontWeight: 'bold' },
//     //     { src: "../../../../assets/fonts/googleFont/Roboto/Roboto-Black.ttf", fontWeight: 'heavy' }
//     // ]
// })

const MyDocument = () => (
    <Document>
        {/*// style={styles.page style={{ width: '600px'}}}*/}
        <Page size="A4" style={{margin: '10px', padding: '0 20px 0 0', marginRight: '20px'}}>
            <View style={{margin: '10px', padding: '10px',}}>
                <View style={{fontSize: '11px', flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                    <View style={{fontSize: '11px',}}>
                        <Image src={logo} style={{width: "50px",}}/>
                        <View style={{marginTop: "8px"}}>
                            <Text>7/1 (7th Floor), Kabbokash</Text>
                            <Text>Kawran Bazar Rd, Dhaka 1215</Text>
                        </View>
                    </View>
                    <View style={{fontSize: '11px',}}>
                        <Text>Report Date</Text>
                        <Text>17.08.2023</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: "15px"}}>
                    <Text style={{fontSize: '16px',}}>Daily Attendance Report</Text>
                </View>
                <View>
                    <View>
                        <Text style={{fontSize: '13px',  margin: "10px 0 13px 0", }}>Branch: Developer</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: '12px', fontWeight: "bold", margin: "0 0 7px 0"}}>Department: Dept1</Text>
                        <View>
                            <View style={{paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                                <Text>Date</Text>
                                <Text>Employee Code</Text>
                                <Text>Employee Name</Text>
                                <Text>Designation</Text>
                                <Text>In Time</Text>
                                <Text>Out Time</Text>
                                <Text>Late In</Text>
                                <Text>Early Out</Text>
                                <Text>Status</Text>
                            </View>
                            <View style={{paddingTop: '5px', paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                                <Text>2023-08-01</Text>
                                <Text>EMP001</Text>
                                <Text>John Smith</Text>
                                <Text>Manager</Text>
                                <Text>09:00</Text>
                                <Text>18:00</Text>
                                <Text>00:15</Text>
                                <Text>00:00</Text>
                                <Text>Present</Text>
                            </View>
                            <View style={{paddingTop: '5px', paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                                <Text>2023-08-01</Text>
                                <Text>EMP002</Text>
                                <Text>Jane Doe</Text>
                                <Text>Analyst</Text>
                                <Text>09:15</Text>
                                <Text>17:30</Text>
                                <Text>00:30</Text>
                                <Text>00:30</Text>
                                <Text>Partial</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: "5px"}}>
                                {/*<Text style={{fontSize: '10px', }}>No entries found</Text>*/}
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: "15px"}}>
                        <Text style={{fontSize: '12px', fontWeight: "bold", margin: "0 0 7px 0"}}>Department: Dept2</Text>
                        <View>
                            <View style={{paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', justifyContent: 'space-around'}}>
                                <Text>Date</Text>
                                <Text>Employee Code</Text>
                                <Text>Employee Name</Text>
                                <Text>Designation</Text>
                                <Text>In Time</Text>
                                <Text>Out Time</Text>
                                <Text>Late In</Text>
                                <Text>Early Out</Text>
                                <Text>Status</Text>
                            </View>
                            <View style={{paddingTop: '5px', paddingTop: '5px', paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                                <Text>2023-08-01</Text>
                                <Text>EMP001</Text>
                                <Text>John Smith</Text>
                                <Text>Manager</Text>
                                <Text>09:00</Text>
                                <Text>18:00</Text>
                                <Text>00:15</Text>
                                <Text>00:00</Text>
                                <Text>Present</Text>
                            </View>
                            <View style={{paddingTop: '5px', paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                                <Text>2023-08-01</Text>
                                <Text>EMP002</Text>
                                <Text>Jane Doe</Text>
                                <Text>Analyst</Text>
                                <Text>09:15</Text>
                                <Text>17:30</Text>
                                <Text>00:30</Text>
                                <Text>00:30</Text>
                                <Text>Partial</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: "5px"}}>
                                {/*<Text style={{fontSize: '10px', }}>No entries found</Text>*/}
                            </View>
                        </View>
                    </View>
                </View>


                <View style={{marginTop: '15px'}}>
                    <View>
                        <Text style={{fontSize: '13px',  margin: "10px 0 13px 0", }}>Branch: Security</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: '12px', fontWeight: "bold", margin: "0 0 7px 0"}}>Department: Dept1</Text>
                        <View>
                            <View style={{paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                                <Text>Date</Text>
                                <Text>Employee Code</Text>
                                <Text>Employee Name</Text>
                                <Text>Designation</Text>
                                <Text>In Time</Text>
                                <Text>Out Time</Text>
                                <Text>Late In</Text>
                                <Text>Early Out</Text>
                                <Text>Status</Text>
                            </View>
                            <View style={{paddingTop: '5px', paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                                <Text>2023-08-01</Text>
                                <Text>EMP001</Text>
                                <Text>John Smith</Text>
                                <Text>Manager</Text>
                                <Text>09:00</Text>
                                <Text>18:00</Text>
                                <Text>00:15</Text>
                                <Text>00:00</Text>
                                <Text>Present</Text>
                            </View>
                            <View style={{paddingTop: '5px', paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                                <Text>2023-08-01</Text>
                                <Text>EMP002</Text>
                                <Text>Jane Doe</Text>
                                <Text>Analyst</Text>
                                <Text>09:15</Text>
                                <Text>17:30</Text>
                                <Text>00:30</Text>
                                <Text>00:30</Text>
                                <Text>Partial</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: "5px"}}>
                                {/*<Text style={{fontSize: '10px', }}>No entries found</Text>*/}
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: "15px"}}>
                        <Text style={{fontSize: '12px', fontWeight: "bold", margin: "0 0 7px 0"}}>Department: Dept2</Text>
                        <View>
                            <View style={{paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', justifyContent: 'space-around',}}>
                                <Text>Date</Text>
                                <Text>Employee Code</Text>
                                <Text>Employee Name</Text>
                                <Text>Designation</Text>
                                <Text>In Time</Text>
                                <Text>Out Time</Text>
                                <Text>Late In</Text>
                                <Text>Early Out</Text>
                                <Text>Status</Text>
                            </View>
                            <View style={{paddingTop: '5px', paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                                <Text>2023-08-01</Text>
                                <Text>EMP001</Text>
                                <Text>John Smith</Text>
                                <Text>Manager</Text>
                                <Text>09:00</Text>
                                <Text>18:00</Text>
                                <Text>00:15</Text>
                                <Text>00:00</Text>
                                <Text>Present</Text>
                            </View>
                            <View style={{paddingTop: '5px', paddingBottom: "5px", borderBottom: "1px dashed gray", flexDirection: 'row', fontSize: '11px', fontWeight: '100', justifyContent: 'space-around'}}>
                                <Text>2023-08-01</Text>
                                <Text>EMP002</Text>
                                <Text>Jane Doe</Text>
                                <Text>Analyst</Text>
                                <Text>09:15</Text>
                                <Text>17:30</Text>
                                <Text>00:30</Text>
                                <Text>00:30</Text>
                                <Text>Partial</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: "5px"}}>
                                {/*<Text style={{fontSize: '10px', }}>No entries found</Text>*/}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

const DailyAttendance = () => {
    return (
        <>

            <div className="pt-4 mb-3">
                <div className="d-flex flex-rows justify-content-center">
                    <div>
                        <h3 className="fw-bold">Daily Attendance Report</h3>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <PDFDownloadLink document={<MyDocument />} fileName="DailyAttendanceReport.pdf" className={"btn btn-primary"}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download now!'
                        }
                    </PDFDownloadLink>
                </div>
            </div>
            <div className="card" style={{padding: "20px"}}>
                <div>
                    <h6 className="fw-bold">Branch: Developer</h6>
                </div>
                <hr />
                <div className="mb-3">
                    <h6 style={{fontSize: "13px"}} className="fw-bold mb-3">Department: Dept1</h6>
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
                                <th scope="col">{"Status"}</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2023-08-01</td>
                                    <td>EMP001</td>
                                    <td>John Smith</td>
                                    <td>Manager</td>
                                    <td>09:00</td>
                                    <td>18:00</td>
                                    <td>00:15</td>
                                    <td>00:00</td>
                                    <td>Present</td>
                                </tr>
                                <tr>
                                    <td>2023-08-01</td>
                                    <td>EMP002</td>
                                    <td>Jane Doe</td>
                                    <td>Analyst</td>
                                    <td>09:15</td>
                                    <td>17:30</td>
                                    <td>00:30</td>
                                    <td>00:30</td>
                                    <td>Partial</td>
                                </tr>
                                <tr>
                                    <td>2023-08-01</td>
                                    <td>EMP003</td>
                                    <td>Michael Brown</td>
                                    <td>Clerk</td>
                                    <td>09:30</td>
                                    <td>18:15</td>
                                    <td>01:00</td>
                                    <td>00:15</td>
                                    <td>Present</td>
                                </tr>
                            </tbody>
                        </table>
                        {/*<p className="text-center p-t-10">No entries found</p>*/}
                    </div>
                </div>

                <div className="mb-3">
                    <h6 className="fw-bold mb-3">Department: Dept2</h6>
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
                                <th scope="col">{"Status"}</th>
                                <th scope="col">{"Action"}</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2023-08-01</td>
                                    <td>EMP001</td>
                                    <td>John Smith</td>
                                    <td>Manager</td>
                                    <td>09:00</td>
                                    <td>18:00</td>
                                    <td>00:15</td>
                                    <td>00:00</td>
                                    <td>Present</td>
                                </tr>
                                <tr>
                                    <td>2023-08-01</td>
                                    <td>EMP002</td>
                                    <td>Jane Doe</td>
                                    <td>Analyst</td>
                                    <td>09:15</td>
                                    <td>17:30</td>
                                    <td>00:30</td>
                                    <td>00:30</td>
                                    <td>Partial</td>
                                </tr>
                                <tr>
                                    <td>2023-08-01</td>
                                    <td>EMP003</td>
                                    <td>Michael Brown</td>
                                    <td>Clerk</td>
                                    <td>09:30</td>
                                    <td>18:15</td>
                                    <td>01:00</td>
                                    <td>00:15</td>
                                    <td>Present</td>
                                </tr>
                            </tbody>
                        </table>
                        {/*<p className="text-center p-t-10">No entries found</p>*/}
                    </div>
                </div>
            </div>
            <div className="card" style={{padding: "20px"}}>
                <div>
                    <h5 className="fw-bold">Branch: Security</h5>
                </div>
                <hr />
                <div className="mb-3">
                    <h6 className="fw-bold mb-3">Department: Dept1</h6>
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
                                <th scope="col">{"Status"}</th>
                                <th scope="col">{"Action"}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>2023-08-01</td>
                                <td>EMP001</td>
                                <td>John Smith</td>
                                <td>Manager</td>
                                <td>09:00</td>
                                <td>18:00</td>
                                <td>00:15</td>
                                <td>00:00</td>
                                <td>Present</td>
                            </tr>
                            <tr>
                                <td>2023-08-01</td>
                                <td>EMP002</td>
                                <td>Jane Doe</td>
                                <td>Analyst</td>
                                <td>09:15</td>
                                <td>17:30</td>
                                <td>00:30</td>
                                <td>00:30</td>
                                <td>Partial</td>
                            </tr>
                            <tr>
                                <td>2023-08-01</td>
                                <td>EMP003</td>
                                <td>Michael Brown</td>
                                <td>Clerk</td>
                                <td>09:30</td>
                                <td>18:15</td>
                                <td>01:00</td>
                                <td>00:15</td>
                                <td>Present</td>
                            </tr>
                            </tbody>
                        </table>
                        {/*<p className="text-center p-t-10">No entries found</p>*/}
                    </div>
                </div>

                <div className="mb-3">
                    <h6 className="fw-bold mb-3">Department: Dept2</h6>
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
                                <th scope="col">{"Status"}</th>
                                <th scope="col">{"Action"}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>2023-08-01</td>
                                <td>EMP001</td>
                                <td>John Smith</td>
                                <td>Manager</td>
                                <td>09:00</td>
                                <td>18:00</td>
                                <td>00:15</td>
                                <td>00:00</td>
                                <td>Present</td>
                            </tr>
                            <tr>
                                <td>2023-08-01</td>
                                <td>EMP002</td>
                                <td>Jane Doe</td>
                                <td>Analyst</td>
                                <td>09:15</td>
                                <td>17:30</td>
                                <td>00:30</td>
                                <td>00:30</td>
                                <td>Partial</td>
                            </tr>
                            <tr>
                                <td>2023-08-01</td>
                                <td>EMP003</td>
                                <td>Michael Brown</td>
                                <td>Clerk</td>
                                <td>09:30</td>
                                <td>18:15</td>
                                <td>01:00</td>
                                <td>00:15</td>
                                <td>Present</td>
                            </tr>
                            </tbody>
                        </table>
                        {/*<p className="text-center p-t-10">No entries found</p>*/}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DailyAttendance;