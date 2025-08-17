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
import dailyVehicleLoadService from '../../services/dailyVehicleLoadedService'
import DailyVehicleLoadModal from './dailyVehicleLoadModal'

const dailyVehicleLoadList = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    vehicleId: '',
    vehicleNo: '',
    quantity: '',
    deliveredQuantity: '',
    remainingQuantity: '',
    variance: '',
  })

  const fetchData = async () => {
    try {
      const response = await dailyVehicleLoadService.getDailyVehicleLoadedList(
        currentPage,
        ITEMS_PER_PAGE,
      )
      console.log(response)
      const formattedData = response.data.result.map((item) => ({
        ...item,
        vehicleNo: item.vehicleNo || 'N/A',
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
      vehicleId: '',
      vehicleNo: '',
      quantity: '',
      deliveredQuantity: 0,
      remainingQuantity: 0,
      variance: 0,
    })
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
      await dailyVehicleLoadService.deleteDailyVehicleLoad(id)
      fetchData()
    } catch (error) {
      console.error('Error deleting data', error)
      setError('Failed to delete data. Please try again.')
    }
  }

  const handleSave = async () => {
    try {
      if (editMode) {
        await dailyVehicleLoadService.updateDailyVehicleLoad(formData.id, formData)
      } else {
        await dailyVehicleLoadService.createDailyVehicleLoaded(formData)
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
            <strong>Daily Vehicle Loads</strong>
            <CButton color="primary" onClick={handleCreateNew}>
              Create New
            </CButton>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: 'Vehicle No', accessor: 'vehicleNo' },
                { label: 'Quantity', accessor: 'quantity' },
                { label: 'Delivered Quantity', accessor: 'deliveredQuantity' },
                { label: 'Remaining Quantity', accessor: 'remainingQuantity' },
                { label: 'Delivery Date', accessor: 'deliveryDate' },
                { label: 'Variance', accessor: 'variance' },
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

      <DailyVehicleLoadModal
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

export default dailyVehicleLoadList
