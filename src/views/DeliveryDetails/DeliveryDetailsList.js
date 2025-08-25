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
  CFormSelect,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import AppLoadingSpinner from '../../components/AppLoadingSpinner'
import AppPaginatedTable from '../../components/table/AppPaginatedTable'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import deliveryDetailsService from '../../services/deliveryDetailsService'

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
    status: '',
  })

  const [filters, setFilters] = useState({
    customerName: '',
    routeName: '',
    status: '',
    date: '',
  })

  const fetchData = async () => {
    try {
      const response = await deliveryDetailsService.getDeliveryDetail(
        currentPage,
        ITEMS_PER_PAGE,
        filters,
      )
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

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id)
    setFormData(itemToEdit)
    setEditMode(true)
    setModalVisible(true)
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

            <div className="d-flex gap-2">
              <CFormInput
                type="text"
                placeholder="Customer"
                value={filters.customerName}
                onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
              />

              <CFormInput
                type="text"
                placeholder="Route"
                value={filters.routeName}
                onChange={(e) => setFilters({ ...filters, routeName: e.target.value })}
              />

              <CFormSelect
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </CFormSelect>

              <CFormInput
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />

              <CButton
                color="primary"
                onClick={() => {
                  setCurrentPage(1)
                  fetchData()
                }}
              >
                Search
              </CButton>
            </div>
          </CCardHeader>

          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: 'Customer Name', accessor: 'deliveryDate' },
                { label: 'Quantity (Liter)', accessor: 'quantity' },
                { label: 'Status', accessor: 'status' },
                { label: 'DeliverySequence', accessor: 'deliverySequence' },
                { label: 'Route', accessor: 'routeName' },
              ]}
              data={data}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalRecords={totalRecords}
              onPageChange={setCurrentPage}
              actionButtons={[{ label: 'Edit', onClick: handleEdit }]}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DeliveryDetailsList
