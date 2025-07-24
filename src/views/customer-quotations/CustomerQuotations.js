import {
  CAlert,
  CAlertHeading,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLoadingSpinner from '../../components/AppLoadingSpinner'
import AppPaginatedTable from '../../components/table/AppPaginatedTable'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import customerquotationService from '../../services/customerquotationService'

const CustomerQuotations = ()=> {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const franchiseId = localStorage.getItem('franchise_id')

  const fetchData = async () => {
    try {
      const response = await customerquotationService.getCustomerQuotation(franchiseId,currentPage,ITEMS_PER_PAGE)
      const formattedData = response.data.result.map((customerquotation) => ({
        ...customerquotation,
        isActive: customerquotation.isActive ? 'Active' : 'Inactive',
      }))
      setData(formattedData)
      setTotalRecords(response.data.pagedListMetadata.totalRecords)
    } catch (error) {
      console.error('API request failed', error)
      setError('Failed to fetch data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage]) // Fetch data when `currentPage` changes

  const handleCreateNew = () => {
    console.log('Create New')
    navigate('/customer-quotations/create')
  }

  // Hanlde Edit record grid button click
  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id)
    console.log(itemToEdit)
    setCustomerData(itemToEdit)
    setEditMode(true)
    setModalVisible(true)
  }

  const handleOpen = (id,data)=>{
    // const specificData = data.find( item => item.id === id)
    // console.log(specificData)
    navigate(`/customer-quotations/${id}`)
  }

  if (loading) return <AppLoadingSpinner />

  return (
    <CRow className="mb-3">
      <CCol xs={12}>
        <div>
          {error && (
            <CAlert color="danger" dismissible>
              <CAlertHeading as="h4">Error!</CAlertHeading>
              <p>An error occurred while processing your request.</p>
            </CAlert>
          )}
        </div>
        <CCard>
          <CCardHeader className='d-flex justify-content-between align-items-center gap-0'>
            <strong>Customer Quotations</strong>
            <CButton color="primary" className="float-end" onClick={handleCreateNew}>
              Create New
            </CButton>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: 'Id', accessor: 'id'},
                { label: 'Customer Name', accessor: 'customerName' },
                { label: 'Total Amount', accessor: 'totalAmount' },
                { label: 'Status', accessor: 'quoteStatus' },
              ]}
              data={data}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalRecords={totalRecords}
              onPageChange={setCurrentPage}
              actionButtons={[
                { label: 'Edit', onClick: handleEdit },
                { label: 'Open', onClick: handleOpen}
              ]}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerQuotations
