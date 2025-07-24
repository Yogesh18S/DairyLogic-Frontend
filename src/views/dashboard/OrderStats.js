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
    pendingCount: 0,
    completedCount: 0,
    progressCount: 0,
    cancelledCount: 0,
  })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      const franchiseId = localStorage.getItem('franchise_id')
      try {
        const response = await dashboardService.getOrderCount(franchiseId)
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
    <>
      <CRow className="d-flex">
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            footer={
              <CLink
                className="font-weight-bold font-xs text-body-secondary"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon icon={cilWarning} className="float-end" width={16} />
              </CLink>
            }
            icon={<CIcon icon={cilWarning} height={24} />}
            title="Pending Orders"
            value={loading ? 'Counting...' : `${orderStats.pendingCount}`}
          />
        </CCol>

        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="info"
            footer={
              <CLink
                className="font-weight-bold font-xs text-body-secondary"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon icon={cilHistory} className="float-end" width={16} />
              </CLink>
            }
            icon={<CIcon icon={cilHistory} height={24} />}
            title="In Progress Orders"
            value={loading ? 'Counting...' : `${orderStats.progressCount}`}
          />
        </CCol>

        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            footer={
              <CLink
                className="font-weight-bold font-xs text-body-secondary"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon icon={cilCheckAlt} className="float-end" width={16} />
              </CLink>
            }
            icon={<CIcon icon={cilCheckAlt} height={24} />}
            title="Completed Orders"
            value={loading ? 'Counting...' : `${orderStats.completedCount}`}
          />
        </CCol>

     
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="danger"
            footer={
              <CLink
                className="font-weight-bold font-xs text-body-secondary"
                href="https://coreui.io/"
                rel="noopener norefferer"
                target="_blank"
              >
                View more
                <CIcon icon={cilX} className="float-end" width={16} />
              </CLink>
            }
            icon={<CIcon icon={cilX} height={24} />}
            title="Cancelled Orders"
            value={loading ? 'Counting...' : `${orderStats.cancelledCount}`}
          />
        </CCol>
      </CRow>
    </>
  )
}
export default OrderStats
