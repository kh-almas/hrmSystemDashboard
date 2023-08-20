import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 15,
    },
    reportTitle:{
        color: '#61dafb',
        letterSpacing: 2,
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });


  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Leave Reports Reports</Text>
    </View>
  );
  
  export default InvoiceTitle