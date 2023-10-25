import React from 'react';
import { Page, Document, Image, StyleSheet, Text, View, PDFDownloadLink, Font } from '@react-pdf/renderer';
import CompanyInfo from './CompanyInfo';
import InvoiceNo from './InvoiceNo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
  });
  
  const Invoice = ({data}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                        <CompanyInfo/>
                        {/*<InvoiceNo/>*/}
                    </View>
                    <InvoiceTitle />
                    {/*<BillTo/>*/}
                    <InvoiceItemsTable data={data}> </InvoiceItemsTable>
                    <InvoiceThankYouMsg />
                </Page>
            </Document>
        );
  
  export default Invoice