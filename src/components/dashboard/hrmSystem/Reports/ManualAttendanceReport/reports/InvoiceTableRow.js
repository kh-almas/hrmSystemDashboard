import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import {PaginationItem, PaginationLink} from "reactstrap";

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
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
    name: {
        width: '20%',
    },
    date: {
        width: '11.42%',
    },
    status: {
        width: '11.42%',
    },
    in: {
        width: '10.42%',
    },
    out: {
        width: '10.42%',
    },
    late: {
        width: '11.42%',
    },
    early: {
        width: '13.42%',
    },
    overtime: {
        width: '11.42%',
    },
});


const InvoiceTableRow = ({data}) => {
    console.log("data",data)

    const allItems = [];

    data.map(item =>
        allItems.push(
            <View style={styles.row}>
                <Text style={styles.name}>{item?.employee_name}</Text>
                <Text style={styles.date}>{item?.date ? item?.date : 'N/A'}</Text>
                <Text style={styles.status}>{item?.status ? item?.status : 'N/A'}</Text>
                <Text style={styles.in}>{item?.in_time ? item?.in_time : 'N/A'}</Text>
                <Text style={styles.out}>{item?.out_time ? item?.out_time : 'N/A'}</Text>
                <Text style={styles.late}>{item?.late ? item?.late: 'N/A'}</Text>
                <Text style={styles.early}>{item?.early_out ? item?.early_out : 'N/A'}</Text>
                <Text style={styles.overtime}>{item?.over_time ? item?.over_time : 'N/A'}</Text>
            </View>
        )
    )

    console.log("allItems",allItems);

    // const rows = items.map( item =>
    const rows =
        <>
            {allItems}
        </>
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow