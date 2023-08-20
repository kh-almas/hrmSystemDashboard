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

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.date}>Date</Text>
        <Text style={styles.InTime}>In Time</Text>
        <Text style={styles.OutTime}>Out Time</Text>
    </View>
  );
  
  export default InvoiceTableHeader