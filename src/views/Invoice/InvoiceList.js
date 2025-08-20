// // src/pages/Invoice/InvoiceList.js
// import React, { useEffect, useState } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CAlert,
//   CAlertHeading,
//   CForm,
//   CFormInput,
//   CFormSelect,
//   CButton,
//   CTable,
//   CTableBody,
//   CTableHead,
//   CTableRow,
//   CTableHeaderCell,
//   CTableDataCell,
//   CPagination,
//   CPaginationItem,
// } from '@coreui/react'
// import { useNavigate } from 'react-router-dom'
// import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
// import AppLoadingSpinner from '../../components/AppLoadingSpinner'
// import invoiceService from '../../services/invoiceService'

// const InvoiceList = () => {
//   const [data, setData] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalRecords, setTotalRecords] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [filters, setFilters] = useState({
//     customerName: '',
//     status: '',
//     fromDate: '',
//     toDate: '',
//   })

//   const navigate = useNavigate()

//   // 🔹 Fetch data from API
//   const fetchData = async () => {
//     setLoading(true)
//     try {
//       const response = await invoiceService.getInvoices(currentPage, ITEMS_PER_PAGE, {
//         customerName: filters.customerName,
//         status: filters.status,
//         fromDate: filters.fromDate,
//         toDate: filters.toDate,
//       })
//       console.log(response.data.result)
//       const result = response.data.result
//       setData(result || [])
//       setTotalRecords(result.totalRecords || 0)
//     } catch (error) {
//       console.error('API error:', error)
//       setError('Failed to fetch invoices. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 🔹 Filter change
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target
//     setFilters((prev) => ({ ...prev, [name]: value }))
//   }

//   // 🔹 Apply filters
//   const handleFilterSubmit = (e) => {
//     e.preventDefault()
//     setCurrentPage(1)
//     fetchData()
//   }

//   // 🔹 Navigate to generate invoice
//   const handleGenerate = () => {
//     navigate('/invoice/genrate-invoice')
//   }

//   useEffect(() => {
//     fetchData()
//   }, [currentPage])

//   if (loading) return <AppLoadingSpinner />

//   const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE)

//   return (
//     <CRow>
//       <CCol xs={12}>
//         {error && (
//           <CAlert color="danger" dismissible>
//             <CAlertHeading as="h4">Error</CAlertHeading>
//             <p>{error}</p>
//           </CAlert>
//         )}

//         <CCard className="mt-3">
//           <CCardHeader className="d-flex justify-content-between align-items-center">
//             <strong>Invoices List</strong>
//             <CButton color="primary" onClick={handleGenerate}>
//               Generate Invoice
//             </CButton>
//           </CCardHeader>

//           {/* 🔹 Filters */}
//           <CCardBody>
//             <CForm className="row g-3" onSubmit={handleFilterSubmit}>
//               <CCol md={3}>
//                 <CFormInput
//                   type="text"
//                   label="Customer Name"
//                   placeholder="Customer Name"
//                   name="customerName"
//                   value={filters.customerName}
//                   onChange={handleFilterChange}
//                 />
//               </CCol>
//               <CCol md={2}>
//                 <CFormSelect
//                   label="Status"
//                   name="status"
//                   value={filters.status}
//                   onChange={handleFilterChange}
//                 >
//                   <option value="">All</option>
//                   <option value="Paid">Paid</option>
//                   <option value="UnPaid">UnPaid</option>
//                   <option value="PartiallyPaid">Partially Paid</option>
//                 </CFormSelect>
//               </CCol>
//               <CCol md={2}>
//                 <CFormInput
//                   type="date"
//                   label="From Date"
//                   name="fromDate"
//                   value={filters.fromDate}
//                   onChange={handleFilterChange}
//                 />
//               </CCol>
//               <CCol md={2}>
//                 <CFormInput
//                   type="date"
//                   label="To Date"
//                   name="toDate"
//                   value={filters.toDate}
//                   onChange={handleFilterChange}
//                 />
//               </CCol>
//               <CCol md={2} className="d-flex align-items-end">
//                 <CButton type="submit" color="primary">
//                   Search
//                 </CButton>
//               </CCol>
//             </CForm>
//           </CCardBody>

//           {/* 🔹 Table */}
//           <CCardBody>
//             <CTable bordered hover responsive>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell>Invoice No</CTableHeaderCell>
//                   <CTableHeaderCell>Customer</CTableHeaderCell>
//                   <CTableHeaderCell>Total Amount</CTableHeaderCell>
//                   <CTableHeaderCell>Generated Date</CTableHeaderCell>
//                   <CTableHeaderCell>Status</CTableHeaderCell>
//                   <CTableHeaderCell>Actions</CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {data.length > 0 ? (
//                   data.map((row, idx) => (
//                     <CTableRow key={idx}>
//                       <CTableDataCell>{row.invoiceNumber}</CTableDataCell>
//                       <CTableDataCell>{row.customerName}</CTableDataCell>
//                       <CTableDataCell>{row.totalAmount}</CTableDataCell>
//                       <CTableDataCell>{row.generatedDate}</CTableDataCell>
//                       <CTableDataCell>{row.status}</CTableDataCell>
//                       <CTableDataCell>
//                         <CButton size="sm" color="primary">
//                           Pay
//                         </CButton>
//                       </CTableDataCell>
//                     </CTableRow>
//                   ))
//                 ) : (
//                   <CTableRow>
//                     <CTableDataCell colSpan={6} className="text-center">
//                       No invoices found
//                     </CTableDataCell>
//                   </CTableRow>
//                 )}
//               </CTableBody>
//             </CTable>

//             {/* 🔹 Pagination */}
//             {totalPages > 1 && (
//               <CPagination align="center" className="mt-3">
//                 <CPaginationItem
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage((p) => p - 1)}
//                 >
//                   Previous
//                 </CPaginationItem>
//                 {Array.from({ length: totalPages }).map((_, index) => (
//                   <CPaginationItem
//                     key={index}
//                     active={currentPage === index + 1}
//                     onClick={() => setCurrentPage(index + 1)}
//                   >
//                     {index + 1}
//                   </CPaginationItem>
//                 ))}
//                 <CPaginationItem
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage((p) => p + 1)}
//                 >
//                   Next
//                 </CPaginationItem>
//               </CPagination>
//             )}
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default InvoiceList
// src/pages/Invoice/InvoiceList.js
// src/pages/Invoice/InvoiceList.js
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAlert,
  CAlertHeading,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import AppLoadingSpinner from '../../components/AppLoadingSpinner'
import invoiceService from '../../services/invoiceService'
import InvoicePayment from './InvoicePayment'
import invoiceTransactionService from '../../services/invoiceTransactionService'

const InvoiceList = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    customerName: '',
    status: '',
    fromDate: '',
    toDate: '',
  })

  // 🔹 Modal states
  const [visible, setVisible] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [payAmount, setPayAmount] = useState('')

  const navigate = useNavigate()

  // 🔹 Fetch data from API
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await invoiceService.getInvoices(currentPage, ITEMS_PER_PAGE, {
        customerName: filters.customerName,
        status: filters.status,
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      })
      const result = response.data.result
      setData(result || []) // items = paginated list
      setTotalRecords(result?.totalRecords || 0)
    } catch (error) {
      console.error('API error:', error)
      setError('Failed to fetch invoices. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  // 🔹 Apply filters
  const handleFilterSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchData()
  }

  // 🔹 Navigate to generate invoice
  const handleGenerate = () => {
    navigate('/invoice/genrate-invoice')
  }

  // 🔹 Open modal with invoice details
  const handlePayClick = (invoice) => {
    setSelectedInvoice(invoice)
    setPayAmount(invoice.totalAmount - invoice.paidAmount) // default remaining
    setVisible(true)
  }

  // 🔹 Handle Payment Submit
  const handlePaySubmit = async () => {
    try {
      // API call for payment
      console.log(payAmount)
     // await invoiceTransactionService.invoicePayment(payAmount)
      fetchData()
      setVisible(false)
    } catch (err) {
      console.error('Payment error:', err)
      alert('Payment failed')
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)

  const openPaymentModal = (row) => {
    setSelectedInvoice(row)
    setPaymentModalVisible(true)
  }

  const handlePaymentSubmit = async (paymentData) => {
    console.log('Submit to API:', paymentData)
    // 🔹 Call API to save payment
    // await invoiceService.savePayment(paymentData)
    setPaymentModalVisible(false)
  }

  if (loading) return <AppLoadingSpinner />

  const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE)

  return (
    <CRow>
      <CCol xs={12}>
        {error && (
          <CAlert color="danger" dismissible>
            <CAlertHeading as="h4">Error</CAlertHeading>
            <p>{error}</p>
          </CAlert>
        )}

        <CCard className="mt-3">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Invoices List</strong>
            <CButton color="primary" onClick={handleGenerate}>
              Generate Invoice
            </CButton>
          </CCardHeader>

          {/* 🔹 Filters */}
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleFilterSubmit}>
              <CCol md={3}>
                <CFormInput
                  type="text"
                  label="Customer Name"
                  placeholder="Customer Name"
                  name="customerName"
                  value={filters.customerName}
                  onChange={handleFilterChange}
                />
              </CCol>
              <CCol md={2}>
                <CFormSelect
                  label="Status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="Paid">Paid</option>
                  <option value="UnPaid">UnPaid</option>
                  <option value="PartiallyPaid">Partially Paid</option>
                </CFormSelect>
              </CCol>
              <CCol md={2}>
                <CFormInput
                  type="date"
                  label="From Date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleFilterChange}
                />
              </CCol>
              <CCol md={2}>
                <CFormInput
                  type="date"
                  label="To Date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleFilterChange}
                />
              </CCol>
              <CCol md={2} className="d-flex align-items-end">
                <CButton type="submit" color="primary">
                  Search
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>

          {/* 🔹 Table */}
          <CCardBody>
            <CTable bordered hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Invoice No</CTableHeaderCell>
                  <CTableHeaderCell>Customer</CTableHeaderCell>
                  <CTableHeaderCell>Total Amount</CTableHeaderCell>
                  <CTableHeaderCell>Paid</CTableHeaderCell>
                  <CTableHeaderCell>Remaining</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.length > 0 ? (
                  data.map((row, idx) => {
                    const remaining = row.totalAmount - row.paidAmount
                    const isFullyPaid = remaining <= 0
                    return (
                      <CTableRow key={idx}>
                        <CTableDataCell>{row.invoiceNumber}</CTableDataCell>
                        <CTableDataCell>{row.customerName}</CTableDataCell>
                        <CTableDataCell>{row.totalAmount}</CTableDataCell>
                        <CTableDataCell>{row.paidAmount}</CTableDataCell>
                        <CTableDataCell>{remaining}</CTableDataCell>
                        <CTableDataCell>
                          {isFullyPaid ? (
                            <span className="badge bg-success">Fully Paid</span>
                          ) : (
                            row.status
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {!isFullyPaid && (
                            <CButton
                              size="sm"
                              color="primary"
                              onClick={() => openPaymentModal(row)}
                            >
                              Pay
                            </CButton>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={7} className="text-center">
                      No invoices found
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>

            {/* 🔹 Custom Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage((p) => p - 1)}>
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage((p) => p + 1)}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      <InvoicePayment
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        invoice={selectedInvoice}
        onSubmit={handlePaySubmit}
      />
    </CRow>
  )
}

export default InvoiceList
