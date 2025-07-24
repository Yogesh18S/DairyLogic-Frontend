import { CButton, CCardBody, CCol, CRow } from '@coreui/react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import pickupOrderService from '../../services/pickupOrderService'
import AssignModal from './AssignModal'
import PickupUserDetails from './PickupUserDetails'
import RequestItems from './RequestItems'
import StatusHistory from './StatusHistory'

const PickupOrderDetails = () => {
  const [modalVisible,setModalVisible] = useState(false);

  //get pickupRequestId from url
  const pickupRequestId = useParams().id

  const handleCancel = async ()=>{
    try{
      await pickupOrderService.cancelRequest(pickupRequestId)
    }catch(error){
      console.log('failed to cancel the Request',error)
    }
  }

  const openModal = ()=>{
    setModalVisible(true);
  }

  return (
    <CRow className="d-flex flex-column mb-2 gap-2">
      <CCol>
          <CCardBody className="d-flex gap-2 ">
            <CButton className="btn btn-primary" onClick={openModal}>Assign Agent</CButton>
            <CButton className="btn btn-danger text-white" onClick={handleCancel}>Cancel Request</CButton>
          </CCardBody>
      </CCol>
      
      <CCol>
        <PickupUserDetails pickupRequestId={pickupRequestId}/>
      </CCol>

      <CCol>
        <RequestItems pickupRequestId={pickupRequestId} />
      </CCol>

      <CCol>
        <StatusHistory pickupRequestId={pickupRequestId}/>
      </CCol>

      <AssignModal
        backdrop='static'
        pickupRequestId={pickupRequestId}
        visible={modalVisible}
        onClose={()=>setModalVisible(false)}
      />
    </CRow>
  )
}

export default PickupOrderDetails
