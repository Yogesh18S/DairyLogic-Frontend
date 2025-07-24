import { Alert } from '@coreui/coreui'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import AppLoadingSpinner from '../../components/AppLoadingSpinner'
import AppPaginatedTable from '../../components/table/AppPaginatedTable'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import userManagementService from '../../services/userManagementService'
import CreateUserModal from './CreateUserModal'

const UserList = () => {
  const FranchiseId = localStorage.getItem('franchise_id')
  const FranchiseName = localStorage.getItem('franchise_name')

  const [data, setData] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    userType: '',
    isActive: '',
    franchiseId: null,
  })
  const [editMode, setEditMode] = useState(false)

  const columns = [
    {
      label: 'Id',
      accessor: 'id',
    },
    {
      label: 'Name',
      accessor: 'firstName',
    },
    {
      label: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      label: 'Email',
      accessor: 'email',
    },
    {
      label: 'UserType',
      accessor: 'userType',
    },
    {
      label: 'Status',
      accessor: 'isActive',
    },
  ]

  const actionButtons = [
    {
      label: 'Edit',
      onClick: (id) => handleEdit(id),
    },
    {
      label: 'Delete',
      onClick: (id) => handleDelete(id),
    },
  ]

  const handleEdit = (id) => {
    const userToEdit = data.find((item) => item.id === id)
    const cleanedUser = {
      ...userToEdit,
      firstName: userToEdit.firstName?.split(" ")[0], // keep only first word
    };

    setFormData(cleanedUser)
    setEditMode(true)
    setModalVisible(true)
  }

  const handleCreateNew = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      userType: '',
      isActive: '',
      franchiseId: '',
    })
    setEditMode(false)
    setChangePassword(true)
    setModalVisible(true)
  }

  const fetchData = async () => {
    try {
      const response = await userManagementService.getUserManagement(currentPage,ITEMS_PER_PAGE)
      const formattedData = response.data.result.map((users) => ({
        ...users,
        firstName: users.firstName + ' ' + users.lastName,
        isActive: users.isActive ? 'Active' : 'InActive',
      }))

      setData(formattedData)
      setTotalRecords(response.data.pagedListMetadata.totalRecords)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [currentPage])

  const handleSave = async () => {
    try {
      if(editMode){
        const response = await userManagementService.putUserManagement(formData.id,formData)
        if(response.status === 200){
          <Alert>User Updated</Alert>
        }
      }else{
        const response = await userManagementService.postUserManagement(formData)
        if (response.status !== 200) {
        console.log('Cannot Create New User')
        }
      }
      
      setModalVisible(false)

      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseModal = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      userType: '',
      isActive: '',
      franchiseId: '',
    })
    setEditMode(false)
    setChangePassword(false)
    setModalVisible(false)
  }

  const handlePasswordChange = (e) => {
    setChangePassword(true)
    
    setFormData((prevData) => ({
      ...prevData,
    }))
    console.log("passsword",formData);
  }


  if (loading) return <AppLoadingSpinner />

  return (
    <CRow className="mb-3">
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>User List</strong>
            <CButton className="btn btn-primary" onClick={handleCreateNew}>
              Create User
            </CButton>
          </CCardHeader>

          <CCardBody>
            <AppPaginatedTable
              columns={columns}
              data={data}
              actionButtons={actionButtons}
              totalRecords={totalRecords}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </CCardBody>
        </CCard>
      </CCol>

      <CreateUserModal
        backdrop="static"
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        visible={modalVisible}
        onClose={handleCloseModal}
        FranchiseId={FranchiseId}
        FranchiseName={FranchiseName}
        editMode={editMode}
        changePassword={changePassword}
        handlePasswordChange={handlePasswordChange}
      />
    </CRow>
  )
}

export default UserList
