import React from 'react';
import {Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../../../../../assets/images/logo/companyLogo.jpg';

const styles = StyleSheet.create({
   
    titleContainer:{
        fontSize: "10px",
    },
    reportTitle:{
        marginTop: "5px",
        textAlign: 'center',
    },
    logo: {
        width: 100,
    }
  });


  const CompanyInfo = () => (
    <View style={styles.titleContainer}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.reportTitle}>{"7/1 (7th Floor), Kabbokash"}</Text>
        <Text>{"Kawran Bazar Rd, Dhaka 1215"}</Text>
    </View>
  );
  
  export default CompanyInfo