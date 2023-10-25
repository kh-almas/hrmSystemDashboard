import React from 'react';
import {View, StyleSheet, Text} from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import moment from "moment/moment";

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
    company: {
        marginBottom: '3px',
        marginTop: '15px'
    },
    branch: {
        marginBottom: '8px',
        marginTop: '5px'
    }
});

const HeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        fontSize: '10px'
    },
    date: {
        width: '11.111%',
    },
    code: {
        width: '11.111%',
    },
    name: {
        width: '11.111%',
    },
    designation: {
        width: '14.111%',
    },
    InTime: {
        width: '10.111%',
    },
    OutTime: {
        width: '10.111%',
    },
    LateIn: {
        width: '10.111%',
    },
    EarlyOut: {
        width: '10.111%',
    },
    status: {
        width: '11.111%',
    },
});

const rowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        textAlign: 'center',
        fontSize: '8px',
    },
    date: {
        width: '11.111%',
    },
    code: {
        width: '11.111%',
    },
    name: {
        width: '11.111%',
    },
    designation: {
        width: '14.111%',
    },
    InTime: {
        width: '10.111%',
    },
    OutTime: {
        width: '10.111%',
    },
    LateIn: {
        width: '10.111%',
    },
    EarlyOut: {
        width: '10.111%',
    },
    status: {
        width: '11.111%',
    },
});

const InvoiceItemsTable = ({data}) => {
    const allItems = [];
    const totalMinutes = time => Math.round(moment.duration(time).asMinutes());
    const formattedTime = time => moment(time, "YYYY-MM-DD HH:mm:ss").format("h:mm A");
    return (
        <>
            {data?.map(com => <View>
                <View style={styles.company}>
                    {/*{console.log('com', com)}*/}
                    <Text>company: {com.company_name}</Text>
                </View>
                {
                    com?.branch?.map(branch =>
                            <View>
                                <View style={styles.branch}>
                                    <Text>branchs: {branch?.branch?.name}</Text>
                                </View>
                                <View style={styles.tableContainer}>
                                    <View style={HeaderStyles.container}>
                                        <Text style={HeaderStyles.date}>Date</Text>
                                        <Text style={HeaderStyles.code}>Code</Text>
                                        <Text style={HeaderStyles.name}>Name</Text>
                                        <Text style={HeaderStyles.designation}>Designation</Text>
                                        <Text style={HeaderStyles.InTime}>In Time</Text>
                                        <Text style={HeaderStyles.OutTime}>Out Time</Text>
                                        <Text style={HeaderStyles.LateIn}>Late In</Text>
                                        <Text style={HeaderStyles.EarlyOut}>Early Out</Text>
                                        <Text style={HeaderStyles.status}>Overtime</Text>
                                    </View>
                                    {
                                        branch?.branch?.attendance?.map((attendance, index) =>
                                        <View style={rowStyles.row}>
                                            <Text style={rowStyles.date}>{attendance?.date ? attendance?.date : 'N/A'}</Text>
                                            <Text style={rowStyles.code}>{attendance?.c_no ? attendance?.c_no : 'N/A'}</Text>
                                            <Text style={rowStyles.name}>{attendance?.employee_name ? attendance?.employee_name : 'N/A'}</Text>
                                            <Text style={rowStyles.designation}>{attendance?.desig_name ? attendance?.desig_name : 'N/A'}</Text>
                                            <Text style={rowStyles.InTime}>{attendance?.in_time ? formattedTime(attendance?.in_time) : 'N/A'}</Text>
                                            <Text style={rowStyles.OutTime}>{attendance?.out_time ? formattedTime(attendance?.out_time) : 'N/A'}</Text>
                                            <Text style={rowStyles.LateIn}>{attendance?.late ? `${totalMinutes(attendance?.late)}m` : 'N/A'}</Text>
                                            <Text style={rowStyles.EarlyOut}>{attendance?.early_out ? `${totalMinutes(attendance?.early_out)}m` : 'N/A'}</Text>
                                            <Text style={rowStyles.status}>{attendance?.Overtime ? `${attendance?.Overtime}m` : 'N/A'}</Text>
                                        </View>
                                        )
                                    }
                                </View>
                            </View>
                        )

                }
            </View>)}

        </>
    );

};

export default InvoiceItemsTable