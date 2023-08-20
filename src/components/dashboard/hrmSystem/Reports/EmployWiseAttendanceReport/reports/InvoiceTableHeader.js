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
    width: {
        width: '14.28%',
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.width}>Date</Text>
        <Text style={styles.width}>In Time</Text>
        <Text style={styles.width}>Out Time</Text>
        <Text style={styles.width}>Late In</Text>
        <Text style={styles.width}>Early Out</Text>
        <Text style={styles.width}>Over Time</Text>
        <Text style={styles.width}>Status</Text>
    </View>
  );
  
  export default InvoiceTableHeader