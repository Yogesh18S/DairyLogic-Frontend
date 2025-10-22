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
import animalService from '../../services/animalServices'
import AnimalModal from './AnimalModal'

const AnimalList = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    tagNumber: '',
    name: '',
    breed: '',
    dateOfBirth: '',
    isActive: true
  })

  const fetchData = async () => {
    try {
      const response = await animalService.getAnimalsList(currentPage, ITEMS_PER_PAGE)
      const formattedData = response.data.result.map((animal) => ({
        ...animal,
        isActive: animal.isActive ? 'Active' : 'Inactive',
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
    setFormData({ id: '', tagNumber: '', name: '', breed: '', dateOfBirth: '', isActive: true })
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
    if (!window.confirm('Are you sure you want to delete this item?')) return
    try {
      await animalService.deleteAnimal(id)
      fetchData()
    } catch (error) {
      console.error('Error deleting data', error)
      setError('Failed to delete data. Please try again.')
    }
  }

  const handleSave = async () => {
    try {
        const payload = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth : null}
      if (editMode) {
        await animalService.updateAnimal(formData.id, payload)
      } else {
        await animalService.createAnimal(payload)
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
        <CCard  className="shadow-sm border-0">
          <CCardHeader className="d-flex align-items-center justify-content-between">
            <strong>Animals</strong>
            <CButton color="primary" onClick={handleCreateNew}>
              Create New
            </CButton>
          </CCardHeader>
          <CCardBody  className="p-2 p-md-3">
           <div className="table-responsive">
            <AppPaginatedTable
              columns={[
                { label: 'Tag Number', accessor: 'tagNumber' },
                { label: 'Name', accessor: 'name' },
                { label: 'Breed', accessor: 'breed' },
                { label: 'Date of Birth', accessor: 'dateOfBirth' },
                { label: 'Status', accessor: 'isActive' }
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
      <AnimalModal
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

export default AnimalList
