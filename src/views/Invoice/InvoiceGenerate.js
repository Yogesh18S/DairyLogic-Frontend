import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CFormSelect,
  CButton,
} from '@coreui/react'

import invoiceService from '../../services/invoiceService'

const InvoiceGenerate = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const years = [2025, 2026, 2027, 2028, 2029, 2030]
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ]

  const handleGenerate = async () => {
    setLoading(true)
    setMessage('')
    try {
      const response = await invoiceService.generateInvoices(month, year)

      if (response.data?.isSuccess) {
        setMessage('Invoices generated successfully!')
      } else {
        setMessage('Failed to generate invoices.')
      }
    } catch (error) {
      console.error(error)
      setMessage('Error while generating invoices.')
    }
    setLoading(false)
  }

  return (
    <CCard>
      <CCardHeader>Generate Monthly Invoices</CCardHeader>
      <CCardBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel>Select Year</CFormLabel>
            <CFormSelect value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </CFormSelect>
          </div>

          <div className="mb-3">
            <CFormLabel>Select Month</CFormLabel>
            <CFormSelect value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </CFormSelect>
          </div>

          <CButton color="primary" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Invoice'}
          </CButton>

          {message && <p className="mt-3">{message}</p>}
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default InvoiceGenerate
