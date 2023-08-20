import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
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
        width: '33.33%',
    },
    InTime: {
        width: '33.33%',
    },
    OutTime: {
        width: '33.33%',
    },
  });


const InvoiceTableRow = () => {
    // const rows = items.map( item =>
    const rows =
        <>
            {/*<View style={styles.row} key={item.sno.toString()}>*/}
            <View style={styles.row}>
                <Text style={styles.date}>2023-08-01</Text>
                <Text style={styles.InTime}>09:00</Text>
                <Text style={styles.OutTime}>18:00</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.date}>2023-08-01</Text>
                <Text style={styles.InTime}>09:15</Text>
                <Text style={styles.OutTime}>17:30</Text>
            </View>
        </>
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow