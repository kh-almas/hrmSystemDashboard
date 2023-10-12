import React from 'react';
import {View, StyleSheet, Text} from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';

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
        marginBottom: '10px',
        marginTop: '20px'
    },
    branch: {
        marginBottom: '8px',
        marginTop: '15px'
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
    console.log(data);

        // console.log(company.company_name)
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
                                    {
                                        branch?.branch?.attendance?.map((attendance, index) =>
                                        <View style={HeaderStyles.container}>
                                            <Text style={HeaderStyles.date}>{attendance?.date ? attendance?.date : 'N/A'}</Text>
                                            <Text style={HeaderStyles.code}>{attendance?.c_no ? attendance?.c_no : 'N/A'}</Text>
                                            <Text style={HeaderStyles.name}>{attendance?.employee_name ? attendance?.employee_name : 'N/A'}</Text>
                                            <Text style={HeaderStyles.designation}>Designation</Text>
                                            <Text style={HeaderStyles.InTime}>{attendance?.in_time ? attendance?.in_time : 'N/A'}</Text>
                                            <Text style={HeaderStyles.OutTime}>{attendance?.out_time ? attendance?.out_time : 'N/A'}</Text>
                                            <Text style={HeaderStyles.LateIn}>{attendance?.late ? attendance?.late : 'N/A'}</Text>
                                            <Text style={HeaderStyles.EarlyOut}>{attendance?.early_out ? attendance?.early_out : 'N/A'}</Text>
                                            <Text style={HeaderStyles.status}>{attendance?.status ? attendance?.status : 'N/A'}</Text>
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