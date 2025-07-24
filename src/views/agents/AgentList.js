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
import agentlistService from '../../services/agentlistService'
import franchiseServices from '../../services/franchiseServices'
import AgentModel from './AgentModal'

const Agents = () => {
  const [data, setData] = useState([])
  const [franchise,setFranchise] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    id:'',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    isActive:true,
    franchiseId: ''
  })

  const fetchData = async () => {
    try {
      const response = await agentlistService.getagentslist(currentPage, ITEMS_PER_PAGE)
      const formattedData = response.data.result.map((agent) => ({
        ...agent,
        isActive: agent.isActive ? 'Active' : 'Inactive',
        franchiseId: agent.franchiseId !== null ? agent.franchiseId : "Not set"
      }))
      setData(formattedData)
      setTotalRecords(response.data.pagedListMetadata.totalRecords)

      const franchiseResponse = await franchiseServices.getfranchise(currentPage,ITEMS_PER_PAGE)
      setFranchise(franchiseResponse.data.result)

    } catch (error) {
      console.error('API request failed', error)
      setError('Failed to fetch data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Create New Button Click
  const handleCreateNew = () => {
    setFormData({ id: '', firstName: '', lastName: '', phoneNumber: '', email: '',isActive: true,franchiseId:''})
    setEditMode(false)
    setModalVisible(true)
  }

  // Hanlde Edit record grid button click
  const handleEdit = (id) => {
    // TODO: Get itemToEdit from api call if required
    const itemToEdit = data.find((item) => item.id === id)
    const isActiveBool = itemToEdit.isActive === 'Active';

    setFormData({...itemToEdit,isActive:isActiveBool})
    setEditMode(true)
    setModalVisible(true)
  }
  // Hanlde delete record grid button click
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    try {
      await agentlistService.deleteagent(id)
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
      if (editMode) {
        await agentlistService.updateagent(formData.id, formData)
      } else {
        const response = await agentlistService.createagent(formData)
        console.log(response)
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
    <CRow>
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
          <CCardHeader className="d-flex align-items-center justify-content-between">
            <strong>Agents</strong>
            <CButton color="primary" className="float-end" onClick={handleCreateNew}>
              Create New
            </CButton>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: 'First Name', accessor: 'firstName' },
                { label: 'Last Name', accessor: 'lastName' },
                { label: 'UserName', accessor: 'userName' },
                { label: 'Email', accessor: 'email' },
                { label: 'Phone Number', accessor: 'phoneNumber' },
                { label: 'Status', accessor: 'isActive' },
                { label: 'Franchise', accessor: 'franchiseId'}
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
      <AgentModel
        backdrop="static"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        franchiseData={franchise}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        editMode={editMode}
      />
    </CRow>
  )
}

export default Agents
