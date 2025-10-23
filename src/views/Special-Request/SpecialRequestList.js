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
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppPaginatedTable from '../../components/table/AppPaginatedTable'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import specialRequestServices from '../../services/specialRequestServices'

const SpecialRequestList = ()=>{
    const[data,setData]= useState([])
    const [error,setError] = useState()
    const [currentPage,setCurrentPage]= useState(1)
    const [totalRecords,setTotalRecords]= useState(0)
    const navigate = useNavigate()

  const fetchData = async ()=>{
    try{
      const response = await specialRequestServices.getPaginatedSpecialRequest(currentPage,ITEMS_PER_PAGE);

      setData(response.data.result)
      setTotalRecords(response.data.result.totalRecords)
    }catch(error){
      
    }
  }

    useEffect(()=>{
      fetchData()
    },[])

    const handleEdit = (id) =>{

    }

    const handleCreate = ()=>{
      navigate('/special-request/create')
    }

    return(
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
            <strong>Special Request</strong>
            <CButton color="primary" className="float-end" onClick={handleCreate}>Create Request</CButton>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: 'Customer Name', accessor: 'customerName' },
                { label: 'Total Amount', accessor: 'totalAmount' },
                { label: 'Status', accessor: 'status' },
                { label: 'Requested Date', accessor: 'requestedDate' },
              ]}
              data={data}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalRecords={totalRecords}
              onPageChange={setCurrentPage}
              actionButtons={[
                { label: 'Edit', onClick: handleEdit }
              ]}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    )
}

export default SpecialRequestList