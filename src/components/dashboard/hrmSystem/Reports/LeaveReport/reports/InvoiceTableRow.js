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
    name: {
        width: '20%',
    },
    casual: {
        width: '17.75%',
    },
    sick: {
        width: '17.75%',
    },
    absent: {
        width: '17.75%',
    },
    compensatory: {
        width: '17.75%',
    },
    total: {
        width: '9%',
    },
  });


const InvoiceTableRow = () => {
    // const rows = items.map( item =>
    const rows =
        <>
            {/*<View style={styles.row} key={item.sno.toString()}>*/}
            <View style={styles.row}>
                <Text style={styles.name}>Jhon</Text>
                <Text style={styles.casual}>5</Text>
                <Text style={styles.sick}>10</Text>
                <Text style={styles.absent}>2</Text>
                <Text style={styles.compensatory}>13</Text>
                <Text style={styles.total}>30</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.name}>Jhon</Text>
                <Text style={styles.casual}>5</Text>
                <Text style={styles.sick}>10</Text>
                <Text style={styles.absent}>2</Text>
                <Text style={styles.compensatory}>13</Text>
                <Text style={styles.total}>30</Text>
            </View>
        </>
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow