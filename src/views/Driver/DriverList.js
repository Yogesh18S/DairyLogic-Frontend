import {
  CAlert,
  CAlertHeading,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import { useEffect, useState } from 'react'
import AppLoadingSpinner from '../../components/AppLoadingSpinner'
import AppPaginatedTable from '../../components/table/AppPaginatedTable'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import driverService from '../../services/driverService'
import DriverModal from './DriverModal'

const DriverList = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    isActive: true,
    address: ''
  })

  const fetchData = async () => {
    try {
      const response = await driverService.getDriverList(currentPage, ITEMS_PER_PAGE)
      const formattedData = response.data.result.map(driver => ({
        ...driver,
        isActive: driver.isActive ? 'Active' : 'Inactive'
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

  const handleCreateNew = () => {
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      isActive: true,
      address: ''
    })
    setEditMode(false)
    setModalVisible(true)
  }

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id)
    const isActiveBool = itemToEdit.isActive === 'Active'
    setFormData({ ...itemToEdit, isActive: isActiveBool, password: '' })
    setEditMode(true)
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this driver?')) return
    try {
      await driverService.deleteDriver(id)
      fetchData()
    } catch (error) {
      console.error('Error deleting driver', error)
      setError('Failed to delete driver. Please try again.')
    }
  }

  const handleSave = async () => {
    try {
      if (editMode) {
        await driverService.updateDriver(formData.id, formData)
      } else {
        await driverService.createDriver(formData)
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
          <CCardHeader className="d-flex align-items-center justify-content-between">
            <strong>Drivers</strong>
            <CButton color="primary" onClick={handleCreateNew}>
              Create New
            </CButton>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: 'First Name', accessor: 'firstName' },
                { label: 'Last Name', accessor: 'lastName' },
                { label: 'Email', accessor: 'email' },
                { label: 'Phone Number', accessor: 'phoneNumber' },
                { label: 'Status', accessor: 'isActive' },
                { label: 'Address', accessor: 'address' }
              ]}
              data={data}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalRecords={totalRecords}
              onPageChange={setCurrentPage}
              actionButtons={[
                { label: 'Edit', onClick: handleEdit },
                { label: 'Delete', onClick: handleDelete }
              ]}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <DriverModal
        backdrop="static"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        editMode={editMode}
      />
    </CRow>
  )
}

export default DriverList
