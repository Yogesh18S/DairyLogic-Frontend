import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
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
import { useEffect, useState } from 'react'
import customerDetailsService from '../../services/customerDetailsService'
import routeService from '../../services/routeService'
import specialRequestServices from '../../services/specialRequestServices'

const FindCustomerInfo = ({ onCustomerFound, onCustomerNotFound }) => {
  const [mobileNumber, setMobileNumber] = useState('')
  const [customerName,setCustomerName] = useState('')
  const [customerInfo, setCustomerInfo] = useState(null)
  const [newCustomerData, setNewCustomerData] = useState({
    id:'',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    routeId: 0
  })
  

  const [validated, setValidated] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [route,setRoute] = useState([])
  const [routeId,setSelectedRouteId] = useState()

  const routeData =  async () => {
      console.log("route fetch")
    try{
      const response = await routeService.getAllRouteList()
      setRoute(response.data.result)

    }catch(err){
      setError(err.response?.data?.message || 'An error occurred while getting routes.');
      console.log("An error occured")
    }
  }

  useEffect(()=>{
    routeData()
  },[])

  const handleSearch = async () => {
    if (mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true)
    setError('')
    try {
      const response = await specialRequestServices.getCustomerByMobile(mobileNumber)
      console.log(response.data.result)
      if (response.data?.result) {
      const customer = response.data.result;
      if (customer.startDate) {
        const { day, month, year } = customer.startDate;
        const formattedDate = `${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year}`;
        customer.startDateString = formattedDate;
      }
      setCustomerInfo(customer);
      onCustomerFound(customer.id, customer);
      return;
    } 
    
      setCustomerInfo(null);
      onCustomerNotFound();
      routeData();
      setError('Customer not found.');
      return;

  } catch (err) {
    console.error('Search Error:', err);
    setError('Customer not found or an error occurred.');
    setCustomerInfo(null);
  } finally {
    setLoading(false);
  }
};

  const handleInputChange = (e) =>
  {
    const value = e.target.value;

    // Allow only digits and max 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
    }
  }

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
      const response = await customerDetailsService.createCustomer(dataToSend);
  
      if (response.status === 200) {
        alert('Customer Created Successfully');
        setValidated(false);
        setMobileNumber(newCustomerData.phoneNumber)

        const customerGet = await specialRequestServices.getCustomerByMobile(newCustomerData.phoneNumber)
        
        if(customerGet.data?.result){
          const createdCustomer = customerGet.data.result

          if (createdCustomer.startDate) {
            const { day, month, year } = createdCustomer.startDate;
            const formattedDate = `${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year}`;
            createdCustomer.startDateString = formattedDate;
          }

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
          city: '',
          routeId: 0
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
              placeholder="Enter Customer Mobile"
              id="customerMobile"
              value={mobileNumber}
              onChange={handleInputChange}
              maxLength={10}          // stops typing beyond 10 chars
              pattern="\d{10}"        // enforces only digits (with validation)
              required
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
                <CTableHeaderCell>Milk Type</CTableHeaderCell>
                <CTableHeaderCell>City</CTableHeaderCell>
                <CTableHeaderCell>Start Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>{customerInfo.id}</CTableDataCell>
                <CTableDataCell>
                  {customerInfo.firstName} {customerInfo.lastName}
                </CTableDataCell>
                <CTableDataCell>{customerInfo.milkType}</CTableDataCell>
                <CTableDataCell>{customerInfo.city}</CTableDataCell>
                <CTableDataCell>{customerInfo.startDateString}</CTableDataCell>
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
                        name="city"
                        placeholder="city"
                        value={newCustomerData.city}
                        onChange={handleCustomerInputChange}
                        feedbackInvalid="please enter city"
                        required
                      />
                    </div>
                    <div>
                    <CFormSelect
                      value={routeId}
                      onChange={(e) => setSelectedRouteId(e.target.value)}
                      disabled={route.length === 0}
                      >
                      <option value="">Select Route</option>
                      {route.map((item) => (
                        <option key={item.id} value={item.id} type='number'>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
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
