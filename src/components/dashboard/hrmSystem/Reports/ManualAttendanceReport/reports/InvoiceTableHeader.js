import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
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

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.name}>Employee Name</Text>
        <Text style={styles.date}>Date</Text>
        <Text style={styles.status}>Status</Text>
        <Text style={styles.in}>Clock In</Text>
        <Text style={styles.out}>Clock Out</Text>
        <Text style={styles.late}>Late In</Text>
        <Text style={styles.early}>Early Leaving</Text>
        <Text style={styles.overtime}>Overtime</Text>
    </View>
  );
  
  export default InvoiceTableHeader