import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  // Define more styles as needed for your invoice layout
});

// Create InvoiceDocument component
export const InvoiceDocument = ({ paymentInvoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Invoice Details:</Text>
        <Text>Invoice No: {paymentInvoice.PaymentId}</Text>
        <Text>Invoice Date: {paymentInvoice.PaymentDate}</Text>
        <Text>Customer Name: {paymentInvoice.customerName}</Text>
        </View>
    </Page>
  </Document>
);