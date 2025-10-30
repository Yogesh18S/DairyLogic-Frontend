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
import InvoicePayment from '../invoice/InvoicePayment' 

const SpecialRequestList = ()=>{
    const[data,setData]= useState([])
    const [error,setError] = useState()
    const [currentPage,setCurrentPage]= useState(1)
    const [totalRecords,setTotalRecords]= useState(0)
    const [selectedInvoice, setSelectedInvoice] = useState(null)
    const [showPaymentModal, setShowPaymentModal] = useState(false) 
    const navigate = useNavigate()

  const fetchData = async ()=>{
    try{
      const response = await specialRequestServices.getPaginatedSpecialRequest(currentPage,ITEMS_PER_PAGE);
      console.log(response.data.result)
      setData(response.data.result)
      setTotalRecords(response.data.result.totalRecords)
    }catch(error){
      
    }
  }

    useEffect(()=>{
      fetchData()
    },[])

const handlePay = async (rowData) => {
  console.log('Pay clicked for row:', rowData)
  try {
    const response = await specialRequestServices.getSpecialRequestById(rowData)
    console.log('Request details response:', response)
    const details = response.data.result

    console.log('Full request details:', details)

    setSelectedInvoice({
      id: details.id,
      customerId: details.customerId,
      invoiceId: details.invoiceId,
      customerName: details.customerName,
      invoiceNumber: `REQ-${details.id}`,
      totalAmount: details.totalAmount ?? details.totalPrice ?? 0,
      paidAmount: details.paidAmount ?? 0,
      deliveryDate: details.deliveryDate,
      status: details.status,
      remarks: details.remarks ?? '',
      isSpecialRequest: true,
    })

    setShowPaymentModal(true)
  } catch (error) {
    console.error('Error fetching request details:', error)
    alert('Failed to load request details.')
  }
}

   const handlePaymentSubmit = (payload) => {
    console.log('Payment submitted:', payload)
    setShowPaymentModal(false)
    fetchData() // refresh data after payment
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
            <strong>Request Orders</strong>
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
                { label: 'Pay', onClick: handlePay }
              ]}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <InvoicePayment
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        invoice={selectedInvoice}
        onSubmit={handlePaymentSubmit}
      />
    </CRow>
    )
}

export default SpecialRequestList