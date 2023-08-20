import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 12,
        fontSize: '10px'
    },
  });


  const BillTo = () => (
    <View style={styles.headerContainer}>
        <Text>Employee Name: ABC</Text>
        <Text>Employee Code: #abc</Text>
        <Text>Department: IT</Text>
        <Text>Branch: Maintenance</Text>
    </View>
  );
  
  export default BillTo;