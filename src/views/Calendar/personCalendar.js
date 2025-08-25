import React, { useState, useEffect } from 'react'
import {
  CFormSelect,
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import routeService from '../../services/routeService'
import customerDetailsService from '../../services/customerDetailsService'
import deliveryDetailsService from '../../services/deliveryDetailsService.js'

const PersonCalendar = () => {
  const [selectedRouteId, setSelectedRouteId] = useState(0)
  const [selectedCustomerId, setSelectedCustomerId] = useState(0)
  const [routes, setRoutes] = useState([])
  const [customers, setCustomers] = useState([])
  const [deliveryDetails, setDeliveryDetails] = useState([])
  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1) // 1-12
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ]
  // Fetch all routes
  const fetchRoutes = async () => {
    try {
      const response = await routeService.getAllRouteList()
      setRoutes(response.data?.result || [])
    } catch (error) {
      console.error('Failed to fetch routes', error)
      setRoutes([])
    }
  }

  // Fetch customers by route
  const fetchCustomers = async (routeId) => {
    if (!routeId) {
      setCustomers([])
      return
    }
    try {
      console.log('Fetching customers for route:', routeId)
      const response = await customerDetailsService.getCustomersByRoute(routeId)
      console.log(response)
      setCustomers(response.data || [])
    } catch (error) {
      console.error('Failed to fetch customers', error)
      setCustomers([])
    }
  }

  // Load routes on mount
  useEffect(() => {
    fetchRoutes()
  }, [])

  // Load customers when route changes
  useEffect(() => {
    if (selectedRouteId > 0) {
      fetchCustomers(selectedRouteId)
    } else {
      setCustomers([])
    }
  }, [selectedRouteId])

  // Example function for searching
  const fetchData = async () => {
    console.log('Searching with:', {
      routeId: selectedRouteId,
      customerId: selectedCustomerId,
      month: selectedMonth,
      year: selectedYear,
    })
    try {
      const response = await deliveryDetailsService.searchRouteData(
        selectedRouteId,
        selectedCustomerId,
        selectedMonth,
        selectedYear,
      )
      console.log(response)
      setTotalQuantity(response.data.result.totalQuantity)
      setTotalAmount(response.data.result.totalAmount)
      setDeliveryDetails(response.data.result.data)
    } catch (error) {
      console.error('Failed to search data', error)
    }
  }

  const years = Array.from({ length: 11 }, (_, i) => currentDate.getFullYear() - 5 + i)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="d-flex align-items-center justify-content-between">
            <strong>Person Calendar</strong>
            <div className="d-flex gap-2">
              {/* Route Select */}
              <CFormSelect
                size="md"
                className="w-100"
                value={selectedRouteId}
                onChange={(e) => {
                  const routeId = parseInt(e.target.value, 10) || 0
                  console.log('Selected Route ID:', routeId)
                  setSelectedRouteId(routeId)
                  setSelectedCustomerId(0) // reset customer when route changes
                }}
              >
                <option value={0}>Select Route</option>
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </CFormSelect>

              {/* Customer Select */}
              <CFormSelect
                size="md"
                className="w-100"
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(parseInt(e.target.value, 10) || 0)}
                disabled={selectedRouteId === 0}
              >
                <option value={0}>Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.customerName} - {customer.phoneNumber}
                  </option>
                ))}
              </CFormSelect>
              <CFormSelect
                size="md"
                className="w-100"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </CFormSelect>
              <CFormSelect
                size="md"
                className="w-100"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </CFormSelect>

              {/* Search Button */}
              <CButton
                color="primary"
                onClick={() => fetchData()}
                disabled={selectedRouteId === 0 || selectedCustomerId === 0}
              >
                Search
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable bordered hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Quantity</CTableHeaderCell>
                  <CTableHeaderCell>Amount</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {deliveryDetails.length > 0 ? (
                  deliveryDetails.map((detail, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{detail.deliveryDate}</CTableDataCell>
                      <CTableDataCell>{detail.quantity}</CTableDataCell>
                      <CTableDataCell>{detail.amount}</CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={3} className="text-center">
                      No data found
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
            {deliveryDetails.length > 0 && (
              <div className="mt-3 fw-bold">
                <p>Total Quantity: {totalQuantity} (L)</p>
                <p>Total Amount: {totalAmount} (₹)</p>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PersonCalendar
