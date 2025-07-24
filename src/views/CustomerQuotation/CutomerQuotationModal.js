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
  CHeader,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { default as CustomerQuotation, default as customerquotationService } from '../../services/customerquotationService'
import scrapCategoryService from '../../services/scrapCategoryService'
import ScrapItemService from '../../services/scrapItemService'

const CutomerQuotationModal = ({ visible, onClose, onSave, editMode }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [franchiseId, setFranchiseId] = useState('')
  const [totalamount, setTotalAmount] = useState('')
  const [scrapItems, setScrapItems] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [selectedScrapItemId, setSelectedScrapItemId] = useState('')
  const [categories, setCategories] = useState([])
  const [quotationItems, setQuotationItems] = useState([])
  const [selectedQuantity, setSelectedQuantity] = useState('')
  const [customerData, setCustomerData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    isActive: '',
    franchiseId: '',
  })
  const [isCustomerFound, setIsCustomerFound] = useState(false)

  const [tmpScrapItems, setTmpScrapItems] = useState([])
  const [validated, setValidated] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    franchiseId: '',
    totalAmount: '',
    scrapItemId: selectedScrapItemId,
    ItemCategoryId: selectedCategoryId, // Include selected category ID
  })

  const fetchScrapCategory = async () => {
    try {
      const response = await scrapCategoryService.getScrapCategory()
      console.log('Scrap Category:', response.data)

      // Ensure the response contains an array
      if (response.data && Array.isArray(response.data.result)) {
        setCategories(response.data.result)
      } else {
        setCategories([]) // Set empty array if response is not as expected
        console.error('Unexpected API response format:', response.data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError('Failed to fetch categories.')
      setCategories([]) // Ensure it's always an array
    }
  }

  useEffect(() => {
    fetchScrapCategory()
  }, [])

  useEffect(() => {
    if (selectedCategoryId) {
      const fetchScrapItems = async () => {
        try {
          const response = await ScrapItemService.getScrapItemsByCategoryId(selectedCategoryId)
          console.log('Scrap Items:', response.data.result)

          setScrapItems(
            response.data.result.map((item) => ({
              ...item,
              categoryId: item.categoryId || '',
            })),
          )
        } catch (error) {
          console.error('Error fetching scrap items:', error)
          setError('Failed to fetch scrap items.')
        }
      }
      fetchScrapItems()
    } else {
      setScrapItems([])
    }
  }, [selectedCategoryId])

  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      event.stopPropagation()
      setValidated(true)
      return
    }
    setValidated(true)

    try {
      let customerId = customerData.id
      if (!isCustomerFound) {
        // Customer doesn't exist, create a new customer first
        const newCustomerData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: phoneNumber, // Ensure phone number is saved
        }
        const customerResponse = await customerquotationService.createCustomer(newCustomerData)
        customerId = customerResponse.data.result.id // Get new customer ID
        console.log('New Customer Created:', customerResponse.data)
      }
      const requestData = {
        CustomerUserId: customerData.id,
        franchiseId: franchiseId,
        totalAmount: totalamount,
      }

      console.log('Submitting Data:', requestData)
      const response = await CustomerQuotation.createCustomerQuotation(requestData)
      alert('Customer quotation created successfully.')
      console.log(response)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to create customer quotation.')
    }
  }

  const handleSearch = async () => {
    if (!phoneNumber) {
      setError('Please enter a phone number.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await customerquotationService.getCustomerNumber(phoneNumber)
      console.log('Search Response:', response.data)

      if (response.data && response.data.result) {
        // Customer found in the database
        setIsCustomerFound(true)
        setCustomerData({
          id: response.data.result.id,
          firstName: response.data.result.firstName || '',
          lastName: response.data.result.lastName || '',
          email: response.data.result.email || '',
        })
        // Auto-fill the form data
        setFormData({
          firstName: response.data.result.firstName || '',
          lastName: response.data.result.lastName || '',
          email: response.data.result.email || '',
        })
      } else {
        // Customer not found
        setIsCustomerFound(false)
        setCustomerData({ firstName: '', lastName: '', email: '', id: '' }) // Reset customer data
        setFormData({ firstName: '', lastName: '', email: '' }) // Reset form data
      }
    } catch (err) {
      console.error('Search Error:', err)
      setError('Customer not found or an error occurred.')
      setIsCustomerFound(false)
      setCustomerData({ firstName: '', lastName: '', email: '', id: '' }) // Reset customer data
      setFormData({ firstName: '', lastName: '', email: '' }) // Reset form data
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      event.stopPropagation()
      setValidated(true)
      return
    }
    if (!selectedCategoryId || !selectedScrapItemId || !selectedQuantity || selectedQuantity <= 0) {
      alert('Please select a category, scrap item, and enter a valid quantity.')
      return
    }

    if (!selectedCategoryId || !selectedScrapItemId) {
      alert('Please select both a category and a scrap item.')
      return
    }

    // Find the selected scrap item from the scrapItems list
    const selectedScrapItem = scrapItems.find((item) => item.id === Number(selectedScrapItemId))
    if (!selectedScrapItem) {
      alert('Invalid scrap item selected.')
      return
    }

    // Add the selected scrap item to the temporary list
    const newItem = {
      id: Date.now(), // Unique ID for the item
      categoryId: selectedCategoryId,
      categoryName: selectedScrapItem.name,
      scrapItemId: selectedScrapItemId,
      scrapItemName: selectedScrapItem.name,
      unit: selectedScrapItem.measuringUnit,
      quantity: selectedQuantity,
    }
    console.log('New Item:', newItem)
    setTmpScrapItems((prevItems) => [...prevItems, newItem])
    console.log('temp:', tmpScrapItems)
    setSelectedCategoryId('')
    setSelectedScrapItemId('')
    setSelectedQuantity('')
  }

  // Remove item from the list
  const handleRemoveItem = (itemId) => {
    setTmpScrapItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId)
      console.log('Updated Tmp Scrap Items:', updatedItems) // Log updated items
      return updatedItems
    })
  }

  useEffect(() => {
    if (phoneNumber.length === 10) {
      handleSearch()
    }
  }, [phoneNumber])

  return (
    <CRow className="mb-2">
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>Create Customer Quotations</strong>
          </CCardHeader>
          <CCardBody>
            <CForm noValidate validated={validated} onSubmit={handleSubmit}>
              <CRow className="g-3">
                <CCol xs={12} md={6} lg={3}>
                  <CFormLabel>Enter phone number</CFormLabel>
                  <CFormInput
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^\d{0,10}$/.test(value)) {
                        setPhoneNumber(value)
                      }
                    }}
                    placeholder="Enter phone number"
                    required
                    feedbackInvalid="Please provide a phone number."
                  />
                </CCol>

                <CCol xs={12} md={6} lg={3}>
                  <CFormLabel>First Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={isCustomerFound ? customerData.firstName : formData.firstName}
                    onChange={handleChange}
                    readOnly={isCustomerFound}
                    feedbackInvalid="Please provide a First Name."
                    required
                    placeholder="Enter First Name"
                  />
                </CCol>

                <CCol xs={12} md={6} lg={3}>
                  <CFormLabel>Last Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={isCustomerFound ? customerData.lastName : formData.lastName}
                    onChange={handleChange}
                    readOnly={isCustomerFound}
                    placeholder="Enter Last Name"
                  />
                </CCol>

                <CCol xs={12} md={6} lg={3}>
                  <CFormLabel>Email</CFormLabel>
                  <CFormInput
                    type="text"
                    id="email"
                    name="email"
                    value={isCustomerFound ? customerData.email : formData.email}
                    onChange={handleChange}
                    readOnly={isCustomerFound}
                    required
                    placeholder="Enter Email"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    feedbackInvalid="Please enter a valid email (e.g., user@example.com)."
                  />
                </CCol>

                <CCol xs={12} md={6} lg={3}>
                  <CFormLabel>Franchise</CFormLabel>
                  <CFormInput
                    type="number"
                    id="franchiseId"
                    name="franchiseId"
                    value={franchiseId}
                    onChange={(e) => setFranchiseId(e.target.value)}
                    placeholder="Enter Franchise Id"
                  />
                </CCol>

                <CCol xs={12} md={6} lg={3}>
                  <CFormLabel>Total Amount</CFormLabel>
                  <CFormInput
                    type="number"
                    id="totalamount"
                    name="totalamount"
                    value={totalamount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    placeholder="Enter The Total Amount"
                  />
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol className="mb-2">
        
        <CCard>
          <CCardHeader>
            <strong>Add Quotation Items</strong>
          </CCardHeader>
          <CCardBody>
            {/* <CTable bordered>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>
                    <CFormInput></CFormInput>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput></CFormInput>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput></CFormInput>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton></CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable> */}

            <CTable bordered>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>Row 1, Col 1</CTableDataCell>
                  <CTableDataCell>Row 1, Col 2</CTableDataCell>
                  <CTableDataCell>Row 1, Col 3</CTableDataCell>
                  <CTableDataCell>Row 1, Col 4</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} className="mt-3">
        <CCard>
          <CCardHeader>
            <strong>Create Quotation Items</strong>
          </CCardHeader>
          <CCardBody>
            <CTable bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>
                    <CFormLabel>Scrap Item</CFormLabel>
                    {' '}
                    <CFormSelect
                      value={selectedCategoryId}
                      onChange={(e) => {
                        const id = Number(e.target.value) // Convert to number
                        setSelectedCategoryId(id)
                        feedbackInvalid = 'Please provide a Category.'
                        required
                      }}
                    >
                      <option value="">Select Scrap Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CTableHeaderCell>

                  <CTableHeaderCell>Column 2</CTableHeaderCell>
                  <CTableHeaderCell>Column 3</CTableHeaderCell>
                  <CTableHeaderCell>Column 4</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>Row 1, Col 1</CTableDataCell>
                  <CTableDataCell>Row 1, Col 2</CTableDataCell>
                  <CTableDataCell>Row 1, Col 3</CTableDataCell>
                  <CTableDataCell>Row 1, Col 4</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Row 1, Col 1</CTableDataCell>
                  <CTableDataCell>Row 1, Col 2</CTableDataCell>
                  <CTableDataCell>Row 1, Col 3</CTableDataCell>
                  <CTableDataCell>Row 1, Col 4</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            <CForm
              noValidate
              validated={validated}
              onSubmit={handleAddItem}
              className="d-flex gap-2"
            >
              <CCol xs={12} md={6} lg={3}>
                <CFormLabel>Scrap Category</CFormLabel>
                <CFormSelect
                  value={selectedCategoryId}
                  onChange={(e) => {
                    const id = Number(e.target.value) // Convert to number
                    setSelectedCategoryId(id)
                    feedbackInvalid = 'Please provide a Category.'
                    required
                  }}
                >
                  <option value="">Select Scrap Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12} md={6} lg={3}>
                <CFormLabel>Scrap Item</CFormLabel>
                <CFormSelect
                  value={selectedScrapItemId}
                  onChange={(e) => setSelectedScrapItemId(e.target.value)}
                >
                  <option value="">Select Scrap Item</option>
                  {scrapItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} Unit: {item.measuringUnit}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12} md={6} lg={3}>
                <CFormLabel>Quantity</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Enter Quantity"
                  feedbackInvalid="Please provide a Quantity."
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  required
                />
              </CCol>
              <CCol xs={12} md={6} lg={3} className="d-flex align-items-end">
                <CButton type="submit" className="btn btn-primary">
                  Add Item
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
          <CHeader></CHeader>
          <h4>Selected Scrap Items:</h4>
          <div className="row">
            {tmpScrapItems.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-3 mb-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="card-title">{item.scrapItemName}</h5>
                    <p className="card-text">
                      {item.quantity} {item.unit}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="btn btn-danger btn-sm w-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CCard>
        <CCol xs={12} md={6} lg={3}>
          <CButton color="primary" className="mt-3" onClick={handleSubmit}>
            {editMode ? 'Update Quotation' : 'Submit Quotation'}
          </CButton>
        </CCol>
        {/* </CRow> */}
      </CCol>
    </CRow>
  )
}
export default CutomerQuotationModal
