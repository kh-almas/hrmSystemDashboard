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
    casual: {
        width: '17.75%',
    },
    sick: {
        width: '17.75%',
    },
    absent: {
        width: '17.75%',
    },
    compensatory: {
        width: '17.75%',
    },
    total: {
        width: '9%',
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.name}>Employee Name</Text>
        <Text style={styles.casual}>Casual Leave </Text>
        <Text style={styles.sick}>Sick Leave </Text>
        <Text style={styles.absent}>Absent</Text>
        <Text style={styles.compensatory}>Compensatory off</Text>
        <Text style={styles.total}>Total</Text>
    </View>
  );
  
  export default InvoiceTableHeader