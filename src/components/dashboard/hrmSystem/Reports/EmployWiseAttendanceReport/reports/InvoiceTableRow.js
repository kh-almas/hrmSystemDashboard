import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

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
    width: {
        width: '14.28%',
    },
  });


const InvoiceTableRow = () => {
    // const rows = items.map( item =>
    const rows =
        <>
            {/*<View style={styles.row} key={item.sno.toString()}>*/}
            <View style={styles.row}>
                <Text style={styles.width}>19</Text>
                <Text style={styles.width}>09:00</Text>
                <Text style={styles.width}>06:00</Text>
                <Text style={styles.width}>15</Text>
                <Text style={styles.width}>00</Text>
                <Text style={styles.width}>60</Text>
                <Text style={styles.width}>Present</Text>
            </View>
        </>
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow