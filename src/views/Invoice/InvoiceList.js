// src/pages/Invoice/InvoiceList.js
import React, { useEffect, useState } from "react"
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
} from "@coreui/react"

import { ITEMS_PER_PAGE } from "../../constants/globalConstants"
import AppPaginatedTable from "../../components/table/AppPaginatedTable"
import AppLoadingSpinner from "../../components/AppLoadingSpinner"
import invoiceService from "../../services/invoiceService"

const InvoiceList = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    customerName: "",
    status: "",
    fromDate: "",
    toDate: "",
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      // const response = await invoiceService.getInvoices(
      //   currentPage,
      //   ITEMS_PER_PAGE,filters
      // )
       const response = await invoiceService.getInvoices(currentPage,ITEMS_PER_PAGE
        ,{customerName: filters.customerName,
          status: filters.status,
          fromDate: filters.fromDate,
          toDate: filters.toDate,
    }
  );
      const invoices = response.data.result || [] // assuming backend returns { result: { items, totalRecords } }
      setData(invoices)
      setTotalRecords(response.data.result.totalRecords || 0)
    } catch (error) {
      console.error("API error:", error)
      setError("Failed to fetch invoices. Please try again.")
    } finally {
      setLoading(false)
    }
  }

 const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleFilterSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1) // reset page when filtering
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  if (loading) return <AppLoadingSpinner />

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
          </CCardHeader>
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
          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: "Invoice No", accessor: "invoiceNumber" },
                { label: "Customer", accessor: "customerName" }, // ✅ correct accessor
                { label: "Total Amount", accessor: "totalAmount" },
                { label: "Generated Date", accessor: "generatedDate" },
                { label: "Status", accessor: "status" },
              ]}
              data={data}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalRecords={totalRecords}
              onPageChange={setCurrentPage}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default InvoiceList