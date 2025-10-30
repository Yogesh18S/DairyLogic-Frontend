import { cilCheckAlt, cilHistory, cilWarning, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCol,
  CLink,
  CRow,
  CWidgetStatsF
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import dashboardService from '../../services/dashboardService'

function OrderStats() {
  const [orderStats, setOrderStats] = useState({
    totalCustomers: 0,
    todayDelivery: 0,
    totalInvoices: 0,
    remainingPayments: 0,
  })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dashboardService.getOrderCount()
        console.log('Order Count', response.data)
        setOrderStats(response.data.result.ordersCount)
      } catch (error) {
        console.error('Error fetching order count', error)
      } finally {
        setLoading(false) // Set loading to false when data is fetched
      }
    }
    fetchData()
  }, [])

  return (
    <div className="mb-3">
    <CRow className="g-3 mt-2">
      <CCol xs={12} sm={6} md={6} lg={3}>
        <CWidgetStatsF
          className="h-100"
          color="warning"
          footer={
            <CLink
              className="font-weight-bold font-xs text-body-secondary"
              href="#"
              rel="noopener noreferrer"
            >
              View more
              <CIcon icon={cilWarning} className="float-end" width={16} />
            </CLink>
          }
          icon={<CIcon icon={cilWarning} height={24} />}
          title="Total Customers"
          value={loading ? 'Counting...' : `${orderStats.totalCustomers}`}
        />
      </CCol>

      <CCol xs={12} sm={6} md={6} lg={3}>
        <CWidgetStatsF
          className="h-100"
          color="info"
          footer={
            <CLink
              className="font-weight-bold font-xs text-body-secondary"
              href="#"
              rel="noopener noreferrer"
            >
              View more
              <CIcon icon={cilHistory} className="float-end" width={16} />
            </CLink>
          }
          icon={<CIcon icon={cilHistory} height={24} />}
          title="Today's Delivery (Liters)"
          value={loading ? 'Counting...' : `${orderStats.todayDelivery}`}
        />
      </CCol>

      <CCol xs={12} sm={6} md={6} lg={3}>
        <CWidgetStatsF
          className="h-100"
          color="success"
          footer={
            <CLink
              className="font-weight-bold font-xs text-body-secondary"
              href="#"
              rel="noopener noreferrer"
            >
              View more
              <CIcon icon={cilCheckAlt} className="float-end" width={16} />
            </CLink>
          }
          icon={<CIcon icon={cilCheckAlt} height={24} />}
          title="Payment Received"
          value={loading ? 'Counting...' : `${orderStats.paymentRecipt}`}
        />
      </CCol>

      <CCol xs={12} sm={6} md={6} lg={3}>
        <CWidgetStatsF
          className="h-100"
          color="danger"
          footer={
            <CLink
              className="font-weight-bold font-xs text-body-secondary"
              href="#"
              rel="noopener noreferrer"
            >
              View more
              <CIcon icon={cilX} className="float-end" width={16} />
            </CLink>
          }
          icon={<CIcon icon={cilX} height={24} />}
          title="Total Remaining Payments"
          value={loading ? 'Counting...' : `${orderStats.remainingPayment}`}
        />
      </CCol>
    </CRow>
    </div>
  )
}
export default OrderStats
