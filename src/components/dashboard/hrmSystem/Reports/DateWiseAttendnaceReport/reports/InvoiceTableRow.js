import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
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


const InvoiceTableRow = () => {
    // const rows = items.map( item =>
    const rows =
        <>
            {/*<View style={styles.row} key={item.sno.toString()}>*/}
            <View style={rowStyles.row}>
                <Text style={rowStyles.date}>2023-08-01</Text>
                <Text style={rowStyles.code}>EMP001</Text>
                <Text style={rowStyles.name}>John Smith</Text>
                <Text style={rowStyles.designation}>Manager</Text>
                <Text style={rowStyles.InTime}>09:00</Text>
                <Text style={rowStyles.OutTime}>18:00</Text>
                <Text style={rowStyles.LateIn}>00:15</Text>
                <Text style={rowStyles.EarlyOut}>00:00</Text>
                <Text style={rowStyles.status}>Present</Text>
            </View>
            <View style={rowStyles.row}>
                <Text style={rowStyles.date}>2023-08-01</Text>
                <Text style={rowStyles.code}>EMP002</Text>
                <Text style={rowStyles.name}>Jane Doe</Text>
                <Text style={rowStyles.designation}>Analyst</Text>
                <Text style={rowStyles.InTime}>09:15</Text>
                <Text style={rowStyles.OutTime}>17:30</Text>
                <Text style={rowStyles.LateIn}>00:30</Text>
                <Text style={rowStyles.EarlyOut}>00:30</Text>
                <Text style={rowStyles.status}>Partial</Text>
            </View>
        </>
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow