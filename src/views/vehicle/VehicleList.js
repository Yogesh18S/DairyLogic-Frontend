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
import vehicleService from '../../services/vehicleService'
import VehicleModal from './VehicleModal'

const VehicleList = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    registrationNumber: '',
    model: '',
    description: '',
    isActive: true,
  })

  const fetchData = async () => {
    try {
      const response = await vehicleService.getVehicleList(currentPage, ITEMS_PER_PAGE)
      const formattedData = response.data.result.map((vehicle) => ({
        ...vehicle,
        isActive: vehicle.isActive ? 'Active' : 'Inactive',
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
    setFormData({ id: '', registrationNumber: '', model: '', description: '', isActive: true })
    setEditMode(false)
    setModalVisible(true)
  }

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id)
    const isActiveBool = itemToEdit.isActive === 'Active'
    setFormData({ ...itemToEdit, isActive: isActiveBool })
    setEditMode(true)
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return
    try {
      await vehicleService.deleteVehicle(id)
      fetchData()
    } catch (error) {
      console.error('Error deleting data', error)
      setError('Failed to delete data. Please try again.')
    }
  }

  const handleSave = async () => {
    try {
      if (editMode) {
        await vehicleService.updateVehicle(formData.id, formData)
      } else {
        await vehicleService.createVehicle(formData)
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
            <strong>Vehicles</strong>
            <CButton color="primary" onClick={handleCreateNew}>
              Create New
            </CButton>
          </CCardHeader>
          <CCardBody>
           <div className="table-responsive">
            <AppPaginatedTable
              columns={[
                { label: 'Vehicle No', accessor: 'vehicleNo' }, // <-- Update label here
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
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <VehicleModal
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

export default VehicleList
