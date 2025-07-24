import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import AppFranchiseCard from "../../components/card/AppFranchiseCard"
import AppPagination from '../../components/table/AppPagination'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import franchiseServices from "../../services/franchiseServices"

const ChangeFranchise = ()=>{

    const [data,setData] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [totalRecords,setTotalRecords] = useState(0)

    const fetchData =async ()=>{
        try{
            const response = await franchiseServices.getfranchise(currentPage,ITEMS_PER_PAGE)
            
            setData(response.data.result)
            setTotalRecords(response.data.pagedListMetadata.totalRecords);
        }catch(error){
            console.log("Fetch Api Failed", error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[currentPage])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
      }
    

    return(
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader>
                        Select Franchise
                    </CCardHeader>
                    <CCardBody className="d-flex gap-2 flex-column">
                        <AppFranchiseCard data={data}/>
                        <AppPagination
                            totalRecords={totalRecords}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ChangeFranchise