import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AppLoadingSpinner from "../../components/AppLoadingSpinner"
import AppPaginatedTable from "../../components/table/AppPaginatedTable"
import { ITEMS_PER_PAGE } from "../../constants/globalConstants"
import pickupOrderService from "../../services/pickupOrderService"
import FilterComponent from "../pickup-orders/FilterComponent"

const customerDetails = ()=>{

  const [data, setData] = useState([])
  const [totalRecords, setTotalRecords] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const franchiseId = localStorage.getItem('franchise_id')
  const customerId = useParams().id;

  useEffect(() => {
    fetchData()
  }, [currentPage])

  const fetchData = async (filters = {}) => {
    try {
      const response = await pickupOrderService.getPaginatedOrdersRequest(
        franchiseId,
        currentPage,
        ITEMS_PER_PAGE,
        {...filters,customerId}
      )

      console.log(response.data.result)
      const formattedData = response.data.result.map((order) => ({
        ...order,
        id: order.pickupRequestId,
        email: order.email || "not available"
      }))

      setData(formattedData)
      setTotalRecords(response.data.pagedListMetadata.totalRecords)
    } catch (error) {
      console.log('Cannot fetch Orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <AppLoadingSpinner />
  }

  const openDetails = (id)=>{
    navigate(`/pickup-orders/${id}`)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

    const columns = [
        {
          label: 'PickupId',
          accessor: 'pickupRequestId',
        },
        {
          label: 'Customer Name',
          accessor: 'customerName',
        },
        {
          label: 'Franchise',
          accessor: 'franchiseName',
        },
        {
          label: 'Pickup Status',
          accessor: 'pickupStatus',
        },
        {
          label: 'Agent Name',
          accessor: 'agentName',
        },
      ]
      const actionButtons = [
        {
          label: 'Open',
          onClick: (id) => openDetails(id),
        },
      ]
    
    return(
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>Pickup Orders</strong>
          </CCardHeader>
          <CCardHeader>
            <FilterComponent fetchData={fetchData} customerId={customerId}/>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={columns}
              data={data}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
              actionButtons={actionButtons}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    )
}

export default customerDetails