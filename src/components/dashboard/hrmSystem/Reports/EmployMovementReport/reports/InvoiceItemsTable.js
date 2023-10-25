import React from 'react';
import {View, StyleSheet, Text} from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import moment from "moment/moment";

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

const headerStyles = StyleSheet.create({
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

const bodyStyles = StyleSheet.create({
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

const empStyles = StyleSheet.create({
    headerContainer: {
        marginTop: 12,
        fontSize: '10px'
    },
});

  const InvoiceItemsTable = ({data}) => {
      const formattedTime = time => moment(time, "YYYY-MM-DD HH:mm:ss").format("h:mm A");
      const formattedDate = time => moment(time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
      return (
          <>
              {
                  data?.map((info, index) =>
                      <View>
                          <View style={empStyles.headerContainer}>
                              <Text>Employee Name: {info?.emp_name}</Text>
                              <Text>Employee Code: {info?.card_no}</Text>
                              <Text>Department: {info?.dept_name}</Text>
                          </View>
                          <View style={styles.tableContainer}>
                              <View style={headerStyles.container}>
                                  <Text style={headerStyles.date}>Date</Text>
                                  <Text style={headerStyles.InTime}>In Time</Text>
                                  <Text style={headerStyles.OutTime}>Out Time</Text>
                              </View>
                              <View>
                                  {
                                      info?.data?.map((movement, index) =>
                                          <View style={bodyStyles.row}>
                                              <Text style={bodyStyles.date}>{formattedDate(movement?.PunchTime)}</Text>
                                              <Text style={bodyStyles.InTime}>{movement?.M_No}</Text>
                                              <Text
                                                  style={bodyStyles.OutTime}>{formattedTime(movement?.PunchTime)}</Text>
                                          </View>
                                      )
                                  }

                              </View>
                          </View>
                      </View>
                  )
              }
          </>

      );
  }
  
  export default InvoiceItemsTable