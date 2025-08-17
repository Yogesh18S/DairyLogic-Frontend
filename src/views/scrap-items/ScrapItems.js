import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import AppLoadingSpinner from '../../components/AppLoadingSpinner'
import AppPaginatedTable from '../../components/table/AppPaginatedTable'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import ScrapItemService from '../../services/scrapItemService'
import ScrapItemModal from './ScrapItemModal'

const ScrapItems = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    itemCategoryId: '',
    name: '',
    price: '',
    measuringUnit: '',
    image: null,
  })

  const fetchData = async () => {
    try {
      const response = await ScrapItemService.getScrapItems(currentPage, ITEMS_PER_PAGE)
      setData(response.data.result)
      setTotalRecords(response.data.pagedListMetadata.totalRecords)
    } catch (error) {
      console.error('API request failed', error)
      setError('Failed to fetch data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Create New Button Click
  const handleCreateNew = () => {
    setFormData({ itemCategoryId: '', name: '', price: '', measuringUnit: '', image: null })
    setEditMode(false)
    setModalVisible(true)
  }

  // Hanlde Edit record grid button click
  const handleEdit = (id) => {
    // TODO: Get itemToEdit from api call if required
    const itemToEdit = data.find((item) => item.id === id)

    setFormData(itemToEdit)
    setEditMode(true)
    setModalVisible(true)
  }

  // Hanlde delete record grid button click
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    try {
      await ScrapItemService.deleteScrapItem(id)

      // Refresh list after deletion
      fetchData()
    } catch (error) {
      console.error('Error deleting data', error)
      setError('Failed to delete data. Please try again.')
    }
  }

  // Handle save button click
  const handleSave = async () => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('itemCategoryId', formData.itemCategoryId)
      formDataToSend.append('name', formData.name)
      formDataToSend.append('price', formData.price)
      formDataToSend.append('measuringUnit', formData.measuringUnit)

      if (formData.image) {
        formDataToSend.append('file', formData.image) // Append image file
      }

      if (editMode) {
        await ScrapItemService.updateScrapItem(formData.id, formDataToSend)
      } else {
        await ScrapItemService.createScrapItem(formDataToSend)
      }
      setModalVisible(false)

      // Refresh list after update
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
    <CRow className="mb-3">
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Scrap Items</strong> <small>Manage your scrap items</small>
            </div>
            <CButton color="primary" onClick={handleCreateNew}>
              Create New
            </CButton>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: 'Category', accessor: 'itemCategory' },
                { label: 'Scrap Item', accessor: 'name' },
                { label: 'Price', accessor: 'price' },
                { label: 'Unit', accessor: 'measuringUnit' },
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

      {/* Modal Component */}
      <ScrapItemModal
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

export default ScrapItems
