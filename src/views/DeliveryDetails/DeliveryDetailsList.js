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
import AppLoadingSpinner from '../../components/AppLoadingSpinner'
import AppPaginatedTable from '../../components/table/AppPaginatedTable'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import deliveryDetailsService from '../../services/deliveryDetailsService'
import DeliveryDetailsModal from './DeliveryDetailsModal'

const DeliveryDetailsList = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    deliveryDate: '',
    deliveryAddress: '',
    status: ''
  })


   const fetchData = async () => {
      try {
        const response = await deliveryDetailsService.getAllDeliveryDetails(currentPage, ITEMS_PER_PAGE)
        console.log(response)
        const formattedData = response.data.result.map((driver) => ({
          ...driver,
          isActive: driver.isActive ? 'Active' : 'Inactive',
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
    setFormData({ id: '', deliveryDate: '', deliveryAddress: '', status: '' })
    setEditMode(false)
    setModalVisible(true)
  }

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id)
    setFormData(itemToEdit)
    setEditMode(true)
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return
    try {
      await deliveryDetailsService.deleteDeliveryDetails(id)
      fetchData()
    } catch (error) {
      console.error('Error deleting data', error)
      setError('Failed to delete data. Please try again.')
    }
  }

  const handleSave = async () => {
    try {
      if (editMode) {
        await deliveryDetailsService.updateDeliveryDetails(formData.id, formData)
      } else {
        await deliveryDetailsService.createDeliveryDetails(formData)
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
            <strong>Delivery Details</strong>
            <CButton color="primary" onClick={handleCreateNew}>
              Create New
            </CButton>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: 'Delivery Date', accessor: 'deliveryDate' },
                { label: 'Address', accessor: 'deliveryAddress' },
                { label: 'Status', accessor: 'status' }
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
      <DeliveryDetailsModal
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

export default DeliveryDetailsList
