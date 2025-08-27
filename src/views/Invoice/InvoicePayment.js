import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import invoiceTransactionService from '../../services/invoiceTransactionService'
const InvoicePayment = ({ visible, onClose, invoice, onSubmit }) => {
  const [payAmount, setPayAmount] = useState('')
  const [billNumber, setBillNumber] = useState('')
  const [remarks, setRemarks] = useState('')
  const [paymentType, setPaymentType] = useState('Cash')

  useEffect(() => {
    if (invoice) {
      const remaining = invoice.totalAmount - invoice.paidAmount
      setPayAmount(remaining > 0 ? remaining : 0)
    }
  }, [invoice])

  if (!invoice) return null

  const handleSubmit = async () => {
    const payload = {
      invoiceId: invoice?.id ?? null,
      customerId: invoice?.customerId ?? null,
      amountPaid: parseFloat(payAmount) || 0, // avoid NaN
      billNumber: billNumber?.trim() || '',
      remarks: remarks?.trim() || '',
      paymentType: paymentType || 'Cash',
      paymentDate: new Date().toISOString().split('T')[0], // today's date
    }

    console.log(payload)

    try {
      await invoiceTransactionService.invoicePayment(payload)
      onSubmit(payload)

      // reset fields
      setPayAmount('')
      setBillNumber('')
      setRemarks('')
      setPaymentType('Cash')
      onClose()
    } catch (error) {
      console.error('Error saving payment:', error)
    }
  }

  const remainingAmount = invoice.totalAmount - invoice.paidAmount

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Payment Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          <strong>Customer:</strong> {invoice.customerName}
        </p>
        <p>
          <strong>Invoice No:</strong> {invoice.invoiceNumber}
        </p>
        <p>
          <strong>Total:</strong> {invoice.totalAmount}
        </p>
        <p>
          <strong>Already Paid:</strong> {invoice.paidAmount}
        </p>
        <p>
          <strong>Remaining:</strong> {remainingAmount}
        </p>

        <CFormInput
          type="number"
          label="Enter Amount"
          value={payAmount}
          onChange={(e) => setPayAmount(e.target.value)}
          className="mb-2"
        />
        <CFormInput
          type="text"
          label="Bill Number"
          value={billNumber}
          onChange={(e) => setBillNumber(e.target.value)}
          className="mb-2"
        />
        <CFormInput
          type="text"
          label="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="mb-2"
        />
        <CFormSelect
          label="Payment Type"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="mb-2"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
          <option value="Cheque">Cheque</option>
        </CFormSelect>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Proceed Payment
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default InvoicePayment
