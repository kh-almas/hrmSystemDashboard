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
    name: {
        width: '20%',
    },
    date: {
        width: '11.42%',
    },
    status: {
        width: '11.42%',
    },
    in: {
        width: '10.42%',
    },
    out: {
        width: '10.42%',
    },
    late: {
        width: '11.42%',
    },
    early: {
        width: '13.42%',
    },
    overtime: {
        width: '11.42%',
    },
});


const InvoiceTableRow = () => {
    // const rows = items.map( item =>
    const rows =
        <>
            {/*<View style={styles.row} key={item.sno.toString()}>*/}
            <View style={styles.row}>
                <Text style={styles.name}>John</Text>
                <Text style={styles.date}>19</Text>
                <Text style={styles.status}>Present</Text>
                <Text style={styles.in}>09:00</Text>
                <Text style={styles.out}>06:00</Text>
                <Text style={styles.late}>15</Text>
                <Text style={styles.early}>N/A</Text>
                <Text style={styles.overtime}>60</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.name}>Smith</Text>
                <Text style={styles.date}>20</Text>
                <Text style={styles.status}>Present</Text>
                <Text style={styles.in}>09:30</Text>
                <Text style={styles.out}>06:15</Text>
                <Text style={styles.late}>30</Text>
                <Text style={styles.early}>N/A</Text>
                <Text style={styles.overtime}>45</Text>
            </View>
        </>
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow