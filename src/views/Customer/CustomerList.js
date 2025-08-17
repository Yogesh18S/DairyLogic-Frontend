import {
  CAlert,
  CAlertHeading,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import AppLoadingSpinner from '../../components/AppLoadingSpinner'
import AppPaginatedTable from '../../components/table/AppPaginatedTable'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import customerService from '../../services/customerDetailsService'
import { useNavigate } from 'react-router-dom';
const CustomerList = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    isActive: true
  })
  
const navigate = useNavigate();
  const handleCreateNew = () => {
    navigate('/create-customer'); // or your desired route
  };

const handleEdit = (id) => {
  navigate(`/create-customer/edit/${id}`);
};

  const fetchData = async () => {
    try {
      const response = await customerService.getCustomer(currentPage, ITEMS_PER_PAGE,)
      const formattedData = response.data.result.map((customer) => ({
        ...customer,
        isActive: customer.isActive ? 'Active' : 'Inactive',
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

  // const handleEdit = (id) => {
  //   const itemToEdit = data.find((item) => item.id === id)
  //   const isActiveBool = itemToEdit.isActive === 'Active'
  //   setFormData({ ...itemToEdit, isActive: isActiveBool })
  //   setEditMode(true)
  //   setModalVisible(true)
  // }
  const handleSearch = () => {
    setAppliedSearch(searchTerm)
    setCurrentPage(1) // reset to first page when searching
  }



  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    try {
      await customerService.deleteCustomer(id)
      fetchData()
    } catch (error) {
      console.error('Error deleting data', error)
      setError('Failed to delete data. Please try again.')
    }
  }

  const handleSave = async () => {
    try {
      if (editMode) {
        await customerService.updateCustomer(formData.id, formData)
      } else {
        await customerService.createCustomer(formData)
      }
      setModalVisible(false)
      fetchData()
    } catch (error) {
      console.error('Error saving data', error)
      setError('Failed to save data. Please try again.')
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  if (loading) return <AppLoadingSpinner />

  return (
    <CRow>
      <CCol xs={12}>
        {error && (
          <CAlert color="danger" dismissible>
            <CAlertHeading as="h4">Error!</CAlertHeading>
            <p>{error}</p>
          </CAlert>
        )}
        <CCard>
         <CCardHeader>
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between w-100 gap-2">
              <strong className="mb-2 mb-md-0">Customers</strong>

              <div className="d-flex flex-column flex-sm-row align-items-center gap-2 w-60 w-md-auto">
      <CFormInput
        placeholder="Search by name"
                  value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow-1"
      />
      <CButton color="primary" onClick={handleSearch} className="w-20 w-sm-auto">
        Search
      </CButton>
    </div>

    {/* Create New Button */}
    <CButton color="primary" onClick={handleCreateNew} className="w-19 w-md-auto mt-2 mt-md-0">
      Create New
    </CButton>
  </div>
</CCardHeader>

          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: 'First Name', accessor: 'firstName' },
                { label: 'Last Name', accessor: 'lastName' },
                { label: 'Email', accessor: 'email' },
                { label: 'Phone Number', accessor: 'phoneNumber' },
                { label: 'Address', accessor: 'address' },
                { label: 'Status', accessor: 'isActive' },
              ]}
              data={data}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalRecords={totalRecords}
              onPageChange={setCurrentPage}
              actionButtons={[
                { label: 'Edit', onClick: handleEdit },
                { label: 'Delete', onClick: handleDelete },
              ]}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerList
