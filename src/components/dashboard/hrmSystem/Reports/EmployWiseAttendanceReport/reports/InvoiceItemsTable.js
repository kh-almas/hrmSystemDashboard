import React from 'react';
import {View, StyleSheet, Text} from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

const emp_styles = StyleSheet.create({
    headerContainer: {
        marginTop: 24,
        fontSize: '10px'
    },
});

const header_styles = StyleSheet.create({
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
        width: '16.66%',
    },
});

const body_styles = StyleSheet.create({
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
    width: {
        width: '16.66%',
    },
});

  const InvoiceItemsTable = ({data}) => {
      return (
          <>
              {
                  data?.map((item, index) =>
                      <View key={index}>
                          <View  style={emp_styles.headerContainer}>
                              <Text>Employee Name: {item?.emp_name}</Text>
                              <Text>Employee Code: {item?.card_no}</Text>
                              <Text>Types of Employment: {item?.dept_name}</Text>
                          </View>
                          <View style={styles.tableContainer}>
                              <View style={header_styles.container}>
                                  <Text style={header_styles.width}>Date</Text>
                                  <Text style={header_styles.width}>In Time</Text>
                                  <Text style={header_styles.width}>Out Time</Text>
                                  <Text style={header_styles.width}>Late In</Text>
                                  <Text style={header_styles.width}>Early Out</Text>
                                  <Text style={header_styles.width}>Over Time</Text>
                              </View>
                              {
                                  item?.data?.map((singleItem, index) =>
                                      <View key={index} style={body_styles.row}>
                                          <Text style={body_styles.width}>{singleItem?.date ? singleItem?.date : "N/A"}</Text>
                                          <Text style={body_styles.width}>{singleItem?.in_time ? singleItem?.in_time : "N/A"}</Text>
                                          <Text style={body_styles.width}>{singleItem?.out_time ? singleItem?.out_time : "N/A"}</Text>
                                          <Text style={body_styles.width}>{singleItem?.late ? singleItem?.late : "N/A"}</Text>
                                          <Text style={body_styles.width}>{singleItem?.early_out ? singleItem?.early_out : "N/A"}</Text>
                                          <Text style={body_styles.width}>{singleItem?.over_time ? singleItem?.over_time : "N/A"}</Text>
                                      </View>
                                  )
                              }
                          </View>
                      </View>
                  )
              }
          </>
      );
  }
  
  export default InvoiceItemsTable