import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { Fragment, useEffect, useState } from 'react'
import specialRequestServices from '../../services/specialRequestServices'
import AddItems from './AddItems'
import FindCustomerInfo from './FindCustomerInfo'
import { useNavigate } from 'react-router-dom'
const CreateSpecialRequest = () => {
  const [customerInfo, setCustomerInfo] = useState(null)
  const [customerId, setCustomerId] = useState(null) // TODO: change it with customerUserId
  const [customerFound, setCustomerFound] = useState(false)
  const [requestItems, setRequestItems] = useState([])
  const [finalPayload, setFinalPayload] = useState(null)
  const navigate = useNavigate()
  // const franchiseId = localStorage.getItem('franchise_id')
  const [specialRequest, setSpecialRequest] = useState({
    customerId: null,
    driverId: 0,
    totalPrice: '',
    deliveryDate: '',
    requestDate: '',
    paid: '',
  })

  useEffect(() => {
    setSpecialRequest((prev) => ({
      ...prev,
      customerUserId: customerId,
    }))
  }, [customerId])

  // Callback when customer is found
  const handleCustomerFound = (id, customer) => {
    setCustomerInfo(customer)
    setCustomerId(id)
    setSpecialRequest((prev) => ({
      ...prev,
      customerId: id,
    }))
    setCustomerFound(true)
  }

  // Callback when customer is not found
  const handleCustomerNotFound = () => {
    setCustomerInfo(null)
    setCustomerId(null)
    setCustomerFound(false)
  }

  const handleItemsChange = (newItems) => {
    setRequestItems(newItems)
    //Todo : Calculate realTime Items Price and display
  }

  // const handleCreateCustomerQuotation = async () => {
  //   const requestData = {
  //     customerId: specialRequest.customerId,
  //     driverId: Number(specialRequest.driverId),
  //     deliveryDate: specialRequest.deliveryDate,
  //     totalPrice: specialRequest.totalPrice,
  //     items: requestItems.map((item) => ({
  //       productId: item.productId,
  //       quantity: item.quantity,
  //       price: item.price,
  //     })),
  //   }

  //   try {
  //     const response = await specialRequestServices.postSpecialRequest(requestData)
  //     if (response.status === 200) {
  //       alert('quotation created Succussefully')
  //     }

  //     //Todo: Implement automatic Pdf Generation and send Email to Corresponding User
  //   } catch (error) {
  //     console.error('error creating quotaion', error)
  //     alert('failed to created quotation')
  //   }
  // }

  const handleCreateCustomerQuotation = async () => {
    console.log('Final Payload:', finalPayload)
  if (!finalPayload || !finalPayload.customerId) {
    alert('Please fill all required details before submitting.')
    return
  }

  try {
    const response = await specialRequestServices.postSpecialRequest(finalPayload)
    if (response.status === 200) {
      alert('Quotation created successfully!')
    }
    navigate('/special-request')
  } catch (error) {
    console.error('Error creating quotation:', error)
    alert('Failed to create quotation.')
  }
}

  return (
    <Fragment>
      <CRow className="mb-2">
        <CCol xs={12}>
          <FindCustomerInfo
            onCustomerFound={handleCustomerFound}
            onCustomerNotFound={handleCustomerNotFound}
          />
        </CCol>
      </CRow>

      <CRow className="mb-2">
        <CCol xs={12}>
          {customerFound && <AddItems customerId={customerId} onPayloadChange={setFinalPayload} />}

          {!customerFound && (
            <CCard>
              <CCardBody>
                <p>Please find or create a customer first.</p>
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>

      <CRow className="mb-2">
        <CCol xs={12}>
          {customerFound && (
            <CCard>
              <CCardBody className="d-flex justify-content-between align-items-center">
                {/* <CFormLabel> <CCardText>Total Price: {totalPrice}</CCardText></CFormLabel> */}
                <CButton color="primary" onClick={handleCreateCustomerQuotation}>
                  Submit Quotation
                </CButton>
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </Fragment>
  )
}

export default CreateSpecialRequest
