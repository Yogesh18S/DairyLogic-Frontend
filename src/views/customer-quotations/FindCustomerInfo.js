import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormText,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react'
import React, { useState } from 'react'
import customerquotationService from '../../services/customerquotationService'
import customerService from '../../services/customerService'

const FindCustomerInfo = ({ onCustomerFound, onCustomerNotFound }) => {
  const [mobileNumber, setMobileNumber] = useState('')
  const [customerInfo, setCustomerInfo] = useState(null)
  const [newCustomerData, setNewCustomerData] = useState({
    id:'',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  })

  const [validated, setValidated] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!mobileNumber) {
      setError('Please enter a phone number.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await customerquotationService.getCustomerNumber(mobileNumber)

      if (response.data?.result) {
        const customer = response.data.result
        setCustomerInfo(response.data.result)
        onCustomerFound(customer.id, customer)
        return
      }
      setCustomerInfo(null)
      onCustomerNotFound()
    } catch (err) {
      console.error('Search Error:', err)
      setError('Customer not found or an error occurred.')
      setCustomerInfo(null)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => setMobileNumber(e.target.value)

  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target
    setNewCustomerData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateCustomer =async (e) => {
    e.preventDefault()

    const form = e.currentTarget

    if(!form.checkValidity()){
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    // Form validation logic
    if (!newCustomerData.firstName.trim() || !newCustomerData.phoneNumber.trim()) {
      setValidated(true)
      return
    }

    if (newCustomerData.email && !/^\S+@\S+\.\S+$/.test(newCustomerData.email)) {
      setError('Please enter a valid email.')
      setValidated(true)
      return
    }
    
    try {
      const { id , ...dataToSend} = newCustomerData;
      const response = await customerService.createCustomerByAdmin(dataToSend);
  
      if (response.status === 200) {
        alert('Customer Created Successfully');
        setValidated(false);
        setMobileNumber(newCustomerData.phoneNumber)

        const customerGet = await customerService.getByCustomerNumber(newCustomerData.phoneNumber)
        
        if(customerGet.data?.result){
          const createdCustomer = customerGet.data.result

          setNewCustomerData((prev)=>({
            ...prev,
            id: createdCustomer.id
          }))

          setCustomerInfo(createdCustomer);
          await onCustomerFound(createdCustomer.id, newCustomerData);
        }

        // Clear form
        setNewCustomerData({
          id:'',
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          address: '',
        });
      } else {
        throw new Error('Failed to create customer. Please try again.');
      }
    } catch (err) {
      onCustomerNotFound()
      setCustomerInfo(null)
      console.error('Error creating customer:', err);
      setError(err.response?.data?.message || 'An error occurred while creating the customer.');
    }
  }

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <div>
          <strong>Customer Details</strong> <small>Find a customer or create new one</small>
        </div>

        <CForm className="d-flex justify-content-end gap-2">
          <CCol lg={12}>
            <CFormLabel className="visually-hidden" htmlFor="customerMobile">
              Customer Mobile
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Enter mobile number"
              id="customerMobile"
              value={mobileNumber}
              onChange={handleInputChange}
            />
          </CCol>
          <CCol>
            <CButton color="primary" onClick={handleSearch}>
              Find
            </CButton>
          </CCol>
        </CForm>
      </CCardHeader>
      <CCardBody>
        {/* Display customer info if found */}
        {customerInfo && (
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Id</CTableHeaderCell>
                <CTableHeaderCell>Customer Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Mobile</CTableHeaderCell>
                <CTableHeaderCell>Address</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>{customerInfo.id}</CTableDataCell>
                <CTableDataCell>
                  {customerInfo.firstName} {customerInfo.lastName}
                </CTableDataCell>
                <CTableDataCell>{customerInfo.email}</CTableDataCell>
                <CTableDataCell>{customerInfo.phoneNumber}</CTableDataCell>
                <CTableDataCell>{customerInfo.address}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        )}

        {/* Create New Customer Form if customer not found */}
        {!customerInfo && error && (
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader className="d-flex justify-content-between">
                  Create New Customer
                  {error && <CFormText className="text-danger ">{error}</CFormText>}
                </CCardHeader>
                <CCardBody>
                  <CForm
                    noValidate
                    validated={validated}
                    className="d-flex gap-2"
                    onSubmit={handleCreateCustomer}
                  >
                    <div>
                      <CFormInput
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={newCustomerData.firstName}
                        onChange={handleCustomerInputChange}
                        feedbackInvalid="Please enter a First Name"
                        required
                      />
                    </div>
                    <div>
                      <CFormInput
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={newCustomerData.lastName}
                        onChange={handleCustomerInputChange}
                        feedbackInvalid="please enter Last Name"
                        required
                      />
                    </div>
                    <div>
                      <CFormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newCustomerData.email}
                        onChange={handleCustomerInputChange}
                        feedbackInvalid="please enter Email"
                        required
                      />
                    </div>
                    <div>
                      <CFormInput
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={newCustomerData.phoneNumber}
                        onChange={handleCustomerInputChange}
                        feedbackInvalid="Please enter a Phone number"
                        required
                      />
                    </div>
                    <div>
                      <CFormInput
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={newCustomerData.address}
                        onChange={handleCustomerInputChange}
                        feedbackInvalid="please enter Address"
                        required
                      />
                    </div>
                    <div>
                      <CButton color="primary" type="submit" disabled={loading}>
                        {loading ? <CSpinner size="sm" /> : 'Create'}
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )}
      </CCardBody>
    </CCard>
  )
}

export default FindCustomerInfo
