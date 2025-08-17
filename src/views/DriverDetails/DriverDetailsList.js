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
import driverDetailsService from '../../services/driverDetailsService'
import vehicleService from '../../services/vehicleService'
import routeService from '../../services/routeService'
import driverService from '../../services/driverService'
import DriverDetailsModal from './DriverDetailsModal'

const DriverDetailsList = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [routes, setRoutes] = useState([])
  const [drivers, setDrivers] = useState([])
  const [formData, setFormData] = useState({
    id: '',
    vehicleId: '',
    routeId: '',
    userId: '',
  })

  const fetchData = async () => {
    try {
      const response = await driverDetailsService.getDriverDetails(currentPage, ITEMS_PER_PAGE)
      console.log(response)
      setData(response.data.result)
      setTotalRecords(response.data.pagedListMetadata.totalRecords)
    } catch (error) {
      console.error('API request failed', error)
      setError('Failed to fetch data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const fetchDropdownData = async () => {
    try {
      const [vehiclesRes, routesRes, driversRes] = await Promise.all([
        vehicleService.getAllDriver(),
        routeService.getAllRouteList(),
        driverService.getAllDriverList(),
      ])
      setVehicles(vehiclesRes.data.result)
      setRoutes(routesRes.data.result)
      setDrivers(driversRes.data.result)
    } catch (error) {
      console.error('Failed to fetch dropdown data', error)
      setError('Failed to load dropdown data.')
    }
  }

  const handleCreateNew = () => {
    setFormData({
      id: '',
      vehicleId: '',
      routeId: '',
      userId: '',
    })
    setEditMode(false)
    setModalVisible(true)
  }

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id)
    setFormData({
      id: itemToEdit.id,
      vehicleId: itemToEdit.vehicleId,
      routeId: itemToEdit.routeId,
      userId: itemToEdit.userId,
    })
    setEditMode(true)
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this driver detail?')) return
    try {
      await driverDetailsService.deleteDriverDetails(id)
      fetchData()
    } catch (error) {
      console.error('Error deleting driver detail', error)
      setError('Failed to delete. Please try again.')
    }
  }

  const handleSave = async () => {
    try {
      if (editMode) {
        await driverDetailsService.updateDriverDetails(formData.id, formData)
      } else {
        await driverDetailsService.createDriverDetails(formData)
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
    fetchDropdownData()
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
            <strong>Driver Details</strong>
            <CButton color="primary" onClick={handleCreateNew}>
              Create New
            </CButton>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: 'Vehicle', accessor: 'vehicleNo' },
                { label: 'Route', accessor: 'routeName' },
                { label: 'Driver', accessor: 'driverName' },
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
      <DriverDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        editMode={editMode}
        vehicles={vehicles}
        routes={routes}
        drivers={drivers}
      />
    </CRow>
  )
}

export default DriverDetailsList
