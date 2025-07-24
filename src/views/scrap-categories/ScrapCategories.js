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
import React, { useEffect, useState } from 'react'
import { default as AppLoadingSpinner } from '../../components/AppLoadingSpinner.js'
import AppPaginatedTable from '../../components/table/AppPaginatedTable.js'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants.js'
import scrapCategoryService from '../../services/scrapCategoryService.js'
import ScrapCategoryModal from './ScrapCategoryModal.js'

const ScrapCategories = () => {

  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({name: "", description: "", image: null});

  // Function to fetch data using Axios
  const fetchData = async () => {

    try{
      const response = await scrapCategoryService.getPaginatedScrapCategory(currentPage,ITEMS_PER_PAGE);
      setData(response.data.result);
      setTotalRecords(response.data.pagedListMetadata.totalRecords);
    }catch(error){
      console.log("ApiRequest Failed",error);
      setError("Cannot Get Scrap Category");
    }finally{
      setLoading(false);
    }
  }
  
  const handleCreateNew = ()=>{
    setFormData({ id: "",name:"",description:"",image: null});
    setEditMode(false);
    setModalVisible(true);
  }

  const handleEdit = (id) =>{
    const categoryToEdit = data.find(item => item.id === id);

    setFormData(categoryToEdit);
    setEditMode(true);
    setModalVisible(true);
  }

  const handleDelete = async (id)=>{
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try{
      await scrapCategoryService.deleteScrapCategory(id);
      fetchData();
    }catch(error){
      console.error("Error deleting Category", error);
      setError("Failed to delete data. Please try again");
    }
  }

  const handleSave = async ()=>{
    try{

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      
      if (formData.image) {
        formDataToSend.append("file", formData.image); // Append image file
      }

      if(editMode){
        await scrapCategoryService.updateScrapCategory(formData.id,formDataToSend)
      }else{
        await scrapCategoryService.createScrapCategory(formDataToSend);
      }

      setModalVisible(false);
      fetchData();
    }catch(error){
      console.error("Error saving Category", error);
      setError("Failed to save data. Please try again");
    }
  };

  // Action buttons to pass into the table
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

  // Handler to update currentPage when pagination changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchData()
  }, [currentPage])

  if (loading) {
    return <AppLoadingSpinner></AppLoadingSpinner>
  }

  const columns = [
    {
      label: 'Name',
      accessor: 'name'
    },
    {
      label: 'Description',
      accessor: 'description'
    }
  ]

  return (
    <CRow className="mb-3">
      <CCol xs={12}>
        <div>
        {
          error &&
          <CAlert
            color="danger"
            dismissible>
            <CAlertHeading as="h4">Error!</CAlertHeading>
            <p>An error occurred while processing your request.</p>
          </CAlert>
        }
        </div>
        <CCard>
          <CCardHeader className='d-flex align-items-center justify-content-between'>
            <strong>Scrap categories</strong>
            <CButton color="primary" onClick={handleCreateNew}>
              Create New
            </CButton>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={columns}
              data={data}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              totalRecords={totalRecords}
              actionButtons={actionButtons}
              onPageChange={handlePageChange}
            ></AppPaginatedTable>
          </CCardBody>
        </CCard>
      </CCol>
      <ScrapCategoryModal
        backdrop ="static"
        visible={modalVisible}
        onClose={()=> setModalVisible(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        editMode={editMode}/>
    </CRow>
  )
}

export default ScrapCategories
