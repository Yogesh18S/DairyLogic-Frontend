import { CCard, CCardBody, CCardHeader, CCol } from '@coreui/react'
import { useEffect, useState } from 'react'
import AppTable from '../../components/table/AppTable'
import pickupOrderService from '../../services/pickupOrderService'

const StatusHistory = ({pickupRequestId}) => {
  const [statusHistory, setStatusHistory] = useState([])

  const fetchData = async () => {
    try {
      const statusResponse = await pickupOrderService.getPickupRequestStatusHistory(pickupRequestId)
      const formattedData = statusResponse.data.result.map((status) => ({
        ...status,
        id: status.id,
      }))
      setStatusHistory(formattedData)
    } catch (error) {
      console.log('fetch request for status History failed.', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CCol>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Status History</strong>
          </div>
        </CCardHeader>
        <CCardBody>
          <AppTable
            columns={[
              { label: 'Id', accessor: 'pickupRequestId' },
              { label: 'Changed By', accessor: 'byUser' },
              { label: 'Quantity', accessor: 'pickupStatus' },
              { label: 'Agent', accessor: 'agentName' },
              { label: 'Log', accessor: 'logText' },
            ]}
            data={statusHistory}
          />
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default StatusHistory