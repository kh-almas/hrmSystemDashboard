import React, {useState} from 'react';
import logo from '../../../../assets/images/logo/companyLogo.jpg';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
    page: {
        // flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        // marginRight: '320px',
    },
    section: {
        margin: '10px',
        padding: '10px',
        fontSize: '11px',
    },

    table: {
        flexDirection: 'row',
        margin: '10px',
        padding: '10px',
        fontSize: '11px',
        justifyContent: 'space-around',
    }
});


// Create Document Component
const MyDocument = () => (
    <Document style={{ width: '600px',}}>
        {/*// style={styles.page}*/}
        <Page size="A4" style={{margin: '10px', padding: '10px',}}>
            <View style={{fontSize: '11px', color: '#000000', flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={styles.section}>
                    <Image src={logo} style={{width: "150px",}}/>
                    <View style={{marginTop: "8px"}}>
                        <Text>7/1 (7th Floor), Kabbokash</Text>
                        <Text>Kawran Bazar Rd, Dhaka 1215</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text>Report Date</Text>
                    <Text>17.08.2023</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "center",}}>
                <Text style={{fontSize: '20px', fontWeight: "bold",}}>Daily Attendance Report</Text>
            </View>
            <View>
                <Text style={{fontSize: '16px', fontWeight: "bold", margin: "10px 0 13px 8px", }}>Branch: Developer</Text>
            </View>
            <View>
                <Text style={{fontSize: '13px', fontWeight: "bold", margin: "0 0 7px 8px"}}>Department: Dept1</Text>
                <View style={{paddingBottom: "5px", borderBottom: "1px solid #000000", flexDirection: 'row', fontSize: '11px', justifyContent: 'space-around',marginRight: '10px', paddingRight: '10px',}}>
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
            </View>
            <View style={{marginTop: "20px"}}>
                <Text style={{fontSize: '13px', fontWeight: "bold", margin: "0 0 7px 8px"}}>Department: Dept2</Text>
                <View style={{paddingBottom: "5px", borderBottom: "1px solid #000000", flexDirection: 'row', fontSize: '11px', justifyContent: 'space-around',marginRight: '10px', paddingRight: '10px',}}>
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
                    <div>
                        <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf" className={"btn btn-primary"}>
                            {({ blob, url, loading, error }) =>
                                loading ? 'Loading document...' : 'Download now!'
                            }
                        </PDFDownloadLink>
                    </div>
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
                                <th scope="col">{"Action"}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* <tr>
                    <th scope="row">{""}</th>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr> */}
                            </tbody>
                        </table>
                        <p className="text-center p-t-10">No entries found</p>
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
                            {/* <tr>
                    <th scope="row">{""}</th>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr> */}
                            </tbody>
                        </table>
                        <p className="text-center p-t-10">No entries found</p>
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
                            {/* <tr>
                    <th scope="row">{""}</th>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr> */}
                            </tbody>
                        </table>
                        <p className="text-center p-t-10">No entries found</p>
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
                            {/* <tr>
                    <th scope="row">{""}</th>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td>{""}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr> */}
                            </tbody>
                        </table>
                        <p className="text-center p-t-10">No entries found</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DailyAttendance;