import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
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

  const InvoiceTableHeader = () => (
    <View style={HeaderStyles.container}>
        <Text style={HeaderStyles.date}>Date</Text>
        <Text style={HeaderStyles.code}>Code</Text>
        <Text style={HeaderStyles.name}>Name</Text>
        <Text style={HeaderStyles.designation}>Designation</Text>
        <Text style={HeaderStyles.InTime}>In Time</Text>
        <Text style={HeaderStyles.OutTime}>Out Time</Text>
        <Text style={HeaderStyles.LateIn}>Late In</Text>
        <Text style={HeaderStyles.EarlyOut}>Early Out</Text>
        <Text style={HeaderStyles.status}>Status</Text>
    </View>
  );
  
  export default InvoiceTableHeader