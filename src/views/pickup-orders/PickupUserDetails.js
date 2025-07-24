import { CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import pickupOrderService from '../../services/pickupOrderService'

const PickupUserDetails = ({ pickupRequestId }) => {
  const [pickupData, setPickupData] = useState({})

  const fetchData = async () => {
    try {
      const pickupDetails = await pickupOrderService.getPickupRequest(pickupRequestId)
      setPickupData(pickupDetails.data.result[0])
    } catch (error) {
      console.log('Fetch Api Reuqest failed', error)
    }
  }

  const formatScheduledTime = (scheduledTimeUtc) => {
    if (!scheduledTimeUtc || !scheduledTimeUtc.date || !scheduledTimeUtc.time ) return "N/A";

    const { day, month, year } = scheduledTimeUtc.date;
    const { hours, minutes, seconds } = scheduledTimeUtc.time;

    // Format date and time
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} ${formattedTime}`;
};

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CTable responsive bordered>
    <CTableBody>
        <CTableRow>
            <CTableDataCell scope="row"><h6>Customer</h6></CTableDataCell>
            <CTableDataCell>{pickupData?.customerName || "N/A"}</CTableDataCell>
            <CTableDataCell scope="row"><h6>Customer Mobile</h6></CTableDataCell>
            <CTableDataCell>{pickupData?.customerMobile || "N/A"}</CTableDataCell>
            {/* customer address later */}
        </CTableRow>

        <CTableRow>
            <CTableDataCell scope="row"><h6>Agent</h6></CTableDataCell>
            <CTableDataCell>{pickupData?.agentName || "N/A"}</CTableDataCell>
            <CTableDataCell scope="row"><h6>Agent Mobile</h6></CTableDataCell>
            <CTableDataCell>{pickupData?.agentMobile || "N/A"}</CTableDataCell>
        </CTableRow>

        <CTableRow>
            <CTableDataCell scope="row"><h6>Current Status</h6></CTableDataCell>
            <CTableDataCell>{pickupData?.pickupStatus || "N/A"}</CTableDataCell>
            <CTableDataCell scope="row"><h6>Schedule Date</h6></CTableDataCell>
            <CTableDataCell>{formatScheduledTime(pickupData?.scheduledTimeUtc)}</CTableDataCell>
        </CTableRow>

        <CTableRow>
            <CTableDataCell scope="row"><h6>Wallet Awarded</h6></CTableDataCell>
            <CTableDataCell scope="row">{pickupData?.walletAwarded || "N/A"}</CTableDataCell>
            <CTableDataCell scope="row"><h6>Total Amount</h6></CTableDataCell>
            <CTableDataCell scope="row">{pickupData.totalAmount}</CTableDataCell>
        </CTableRow>
    </CTableBody>
</CTable>
)
}

export default PickupUserDetails
