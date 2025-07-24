import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CRow } from '@coreui/react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLoadingSpinner from '../../components/AppLoadingSpinner'
import AppPaginatedTable from '../../components/table/AppPaginatedTable'
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import customerService from '../../services/customerService'

const Customers = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const navigate = useNavigate()
  const [number, setNumber] = useState("");

  const fetchData = async () => {
    try {
      const response = await customerService.getCustomers(number,currentPage, ITEMS_PER_PAGE)

      const formattedData = response.data.result.map((customers) => ({
        ...customers,
        firstName: customers.firstName + ' ' + customers.lastName,
        address: customers.address ? customers.address : "Not available",
        email: customers.email ? customers.email : "Not Available"
      }))

      setData(formattedData)
      setTotalRecords(response.data.pagedListMetadata.totalRecords)
      setLoading(false)
    } catch (error) {
      console.log('Unable to fetch Data', error)
      setLoading(false)
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setCurrentPage(1)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  const columns = [
    { label: 'Id', accessor: 'id' },
    { label: 'Customer Name', accessor: 'firstName' },
    { label: 'Mobile', accessor: 'phoneNumber' },
    { label: 'Address', accessor: 'address' },
    { label: 'Email', accessor: 'email'}
  ]

  const actionButtons = [
    {
      label: 'View',
      onClick: (id) => handleView(id),
    },
  ]

  const handleView = (id)=>{
    navigate(`/customers/${id}`)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleChange = (e)=>{
    const input = e.target.value;
    
    if (/^\d{0,10}$/.test(input)) {
      setNumber(input);
    }
  }

  useEffect(() => {
    if ( number === "") {
      fetchData()
    }
  }, [number]);

  if (loading) {
    return <AppLoadingSpinner />
  }

  return (
    <CRow className="mb-3">
      <CCol xs={12}>
        <CCard>
          <CCardHeader className='d-flex justify-content-between align-items-center'>
            <strong>Customer Details</strong>
            <CForm className='d-flex' onSubmit={handleSubmit}>
              <CFormInput type='text' placeholder='Search By Mobile' name="number" value={number} onChange={handleChange}/>
              <CButton type='submit'>
                <FontAwesomeIcon icon={faSearch} />
              </CButton>
            </CForm>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={columns}
              data={data}
              totalRecords={totalRecords}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              actionButtons={actionButtons}
              onPageChange={handlePageChange}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Customers
