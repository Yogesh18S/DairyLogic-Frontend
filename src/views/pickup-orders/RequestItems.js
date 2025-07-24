import { CCard, CCardBody, CCardHeader, CCol } from '@coreui/react'
import { useEffect, useState } from 'react'
import AppTable from '../../components/table/AppTable'
import pickupOrderService from '../../services/pickupOrderService'

const RequestItems = ({ pickupRequestId }) => {
  const [itemsData, setItemsData] = useState([])

  const fetchData = async () => {
    try {
      const itemsResponse = await pickupOrderService.getPickupRequestItems(pickupRequestId)
      const formattedData = itemsResponse.data.result.map((items) => ({
        ...items,
        id: items.scrapItemId,
      }))
      setItemsData(formattedData)
    } catch (error) {
      console.log('Fetch Api Request Failed', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CCol xs={12}>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Order Items</strong>
          </div>
        </CCardHeader>
        <CCardBody>
          <AppTable
            columns={[
              { label: 'Id', accessor: 'scrapItemId' },
              { label: 'Name', accessor: 'scrapName' },
              { label: 'Quantity', accessor: 'requestedQuantity' },
              { label: 'Price', accessor: 'requestedUnitPrice'}
            ]}
            data={itemsData}
          />
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default RequestItems
