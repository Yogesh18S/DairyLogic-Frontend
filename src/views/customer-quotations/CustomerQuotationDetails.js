import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppTable from '../../components/table/AppTable';
import customerquotationService from '../../services/customerquotationService';
import pickupOrderService from '../../services/pickupOrderService';

const CustomerQuotationDetails = () => {
  const [ data, setData] = useState();
  const quotationId = useParams().id
  const [scrap,setScrap] = useState([])
  const [customerUserId, setCustomerUserId] = useState(null)

  const fetchData =async () => {
    try{
      const response = await customerquotationService.getCustomerQuotationById(quotationId)
      setData(response.data.result);
      setCustomerUserId(response.data.result.customerUserId)
      setScrap(response.data.result.quotationItems)
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
    console.log(customerUserId)
  },[])

  const columns = [
    {
      "label": "Id",
      "accessor": "id"
    },
    {
      "label": "Name",
      "accessor": "scrapName"
    },
    {
      "label": "Quantity",
      "accessor": "scrapQuantity"
    },
    {
      "label": "Price",
      "accessor":"scrapUnitPrice"
    },
    {
      "label": " Total Amount",
      "accessor": "totalPrice"
    },
  ]
  
  const handleAccept = async (customerUserId)=>{

    if(!data) return;

    const requestData = {
      FranchiseId : data.franchiseId,
      QuotationId : quotationId,
      Notes : 'Quotation Request Accepted Pickup Order Placed',
      PickupRequestItems : scrap.map((item)=>({
        ScrapItemId : item.scrapItemId,
        Quantity : item.scrapQuantity,
        UnitPrice : item.scrapUnitPrice
      }))
    }

    try{
      const response = await pickupOrderService.postQuotationRequest(customerUserId,requestData)
      if(response.status === 200){
        alert('Pickup Request Placed')
      }
    }catch(error){
      console.log("Cannot Post the Request", error)
    }
  }

  return (
    <CRow sm={12}>
      <CCol className="d-flex flex-column gap-2">
        <CCardBody className="d-flex gap-2 ">
          <CButton className="btn btn-primary" onClick={()=> handleAccept(customerUserId)}>Accept</CButton>
          <CButton className="btn btn-danger text-white">Reject</CButton>
        </CCardBody>
        
        <CTable responsive bordered>
            <CTableBody>
                <CTableRow>
                    <CTableDataCell scope="row"><h6>Customer</h6></CTableDataCell>
                    <CTableDataCell>{data?.customerName || "N/A"}</CTableDataCell>
                    <CTableDataCell scope="row"><h6>Mobile</h6></CTableDataCell>
                    <CTableDataCell>{data?.customerMobile || "N/A"}</CTableDataCell>
                </CTableRow>

                <CTableRow>
                  <CTableDataCell scope="row"><h6>Email</h6></CTableDataCell>
                  <CTableDataCell>{data?.email || "N/A"}</CTableDataCell>
                  <CTableDataCell scope="row"><h6>Address</h6></CTableDataCell>
                  <CTableDataCell>{data?.address || "N/A"}  </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>

        <CCard>
          <CCardHeader>Quotation Items</CCardHeader>
          <CCardBody>
            <AppTable
              columns={columns}
              data={scrap}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerQuotationDetails
