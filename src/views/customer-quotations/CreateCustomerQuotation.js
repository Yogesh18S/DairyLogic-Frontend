  import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { Fragment, useEffect, useState } from 'react'
import customerquotationService from '../../services/customerquotationService'
import AddQuotationItems from './AddQuotationItems'
import FindCustomerInfo from './FindCustomerInfo'

  const CreateCustomerQuotation = () => {
    const [customerInfo, setCustomerInfo] = useState(null)
    const [customerId, setCustomerId] = useState(null) // TODO: change it with customerUserId
    const [customerFound, setCustomerFound] = useState(false)
    const [quotationItems, setQuotationItems] = useState([])

    const franchiseId = localStorage.getItem('franchise_id')
    const [customerQuotation, setCustomerQuotation] = useState({
      "customerUserId": null,
      "franchiseId": franchiseId,
      "quoteStatus":"Pending"
    })

    useEffect(() => {
      setCustomerQuotation((prev) => ({
        ...prev,
        customerUserId: customerId,
      }))
    }, [customerId])

    // Callback when customer is found
    const handleCustomerFound = (id, customer) => {
      setCustomerInfo(customer)
      setCustomerId(id)
      setCustomerQuotation((prev)=> ({
        ...prev,
        customerUserId: id
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
      setQuotationItems(newItems)
      //Todo : Calculate realTime Items Price and display
    }

    const handleCreateCustomerQuotation = async()=>{

      const requestData = {
        customerUserId: customerQuotation.customerUserId,
        franchiseId: customerQuotation.franchiseId,
        quoteStatus: customerQuotation.quoteStatus,
        quotationItems: quotationItems.map(item => ({
          scrapItemId: item.scrapItemId,
          scrapQuantity: item.scrapQuantity,
          scrapUnitPrice: item.scrapUnitPrice
        }))
      };

      try{
        const response = await customerquotationService.createCustomerQuotation(requestData)
        if(response.status === 200){
          alert('quotation created Succussefully')
        }

        //Todo: Implement automatic Pdf Generation and send Email to Corresponding User

      }catch(error){
        console.error('error creating quotaion', error)
        alert('failed to created quotation')
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
            {customerFound && <AddQuotationItems onItemsChange={handleItemsChange} />}

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
                  <CButton color="primary" onClick={handleCreateCustomerQuotation}>Submit Quotation</CButton>
                </CCardBody>
              </CCard>
            )}
          </CCol>
        </CRow>
      </Fragment>
    )
  }

  export default CreateCustomerQuotation