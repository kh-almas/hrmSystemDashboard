import React from 'react';
import {View, StyleSheet, Text} from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import moment from "moment";

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
        marginTop: 12,
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
        width: '14.28%',
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
        width: '14.28%',
    },
});


  const InvoiceItemsTable = ({data}) => {
      const totalMinutes = time => Math.round(moment.duration(time).asMinutes());
      const formattedTime = time => moment(time, "YYYY-MM-DD HH:mm:ss").format("h:mm A");
      return (
          <>
              {
                  data?.map((item, index) =>
                      <View key={index}>
                          <View  style={emp_styles.headerContainer}>
                              <Text>Department: {item?.department_name}</Text>
                          </View>
                          <View style={styles.tableContainer}>
                              <View style={header_styles.container}>
                                  <Text style={header_styles.width}>Name</Text>
                                  <Text style={header_styles.width}>Designation</Text>
                                  <Text style={header_styles.width}>Present (D)</Text>
                                  <Text style={header_styles.width}>Absent (D)</Text>
                                  <Text style={header_styles.width}>Late (D)</Text>
                                  <Text style={header_styles.width}>Early Out (D)</Text>
                                  <Text style={header_styles.width}>Over Time (H)</Text>
                              </View>
                              {
                                  item?.employees?.map((emp, index) =>
                                      <View key={index} style={body_styles.row}>
                                          <Text style={body_styles.width}>{emp?.emp_name}</Text>
                                          <Text style={body_styles.width}>{emp?.emp_designation}</Text>
                                          <Text style={body_styles.width}>{emp?.totalPresent}</Text>
                                          <Text style={body_styles.width}>{emp?.totalAbsent}</Text>
                                          <Text style={body_styles.width}>{emp?.totalLate}</Text>
                                          <Text style={body_styles.width}>{emp?.totalEarlyOut}</Text>
                                          <Text style={body_styles.width}>{`${totalMinutes(emp?.totalOverTime)}m`}</Text>
                                      </View>
                                  )
                              }
                          </View>
                      </View>
                  )
              }
          </>
      );
  };
  
  export default InvoiceItemsTable