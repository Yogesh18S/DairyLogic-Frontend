import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CRow } from "@coreui/react"
import { useEffect, useState } from "react"
import AppLoadingSpinner from "../components/AppLoadingSpinner"
import AppPaginatedTable from "../components/table/AppPaginatedTable"
import { ITEMS_PER_PAGE } from "../constants/globalConstants"
import franchiseServices from "../services/franchiseServices"
import ItemPriceModal from "./ItemPriceModal"

const FranchiseItemsList = () =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalRecords, setTotalRecords] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const franchiseId = localStorage.getItem("franchise_id");
    const [modalVisible,setModalVisible] = useState(false)
    const [search,setSearch] = useState("")
    const [formData, setFormData] = useState({
        franchiseId: '',
        scrapItemId : '',
        scrapName: '',
        price: ''
    })

    const fetchData = async ()=>{
        try{
            const response = await franchiseServices.getFranchiseItems(franchiseId,search,currentPage,ITEMS_PER_PAGE)
            const formattedData = response.data.result.map((items)=>({
                ...items,
                id: items.scrapItemId,
                customPrice: items.customPrice !== 0 ? items.customPrice : "not set"
            }))
            setData(formattedData)
            setTotalRecords(response.data.pagedListMetadata.totalRecords)
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

    const handleEdit = (id)=>{
        const itemToEdit = data.find(i => i.id === id);
        setFormData({
            scrapName: itemToEdit.scrapName,
            franchiseId: franchiseId,
            scrapItemId : itemToEdit.scrapItemId,
            customPrice: itemToEdit.customPrice !== "not set" ? itemToEdit.customPrice : ""
        })
        setModalVisible(true)
    }

    const handleSubmit = async ()=>{
        try {
            const { franchiseId, scrapItemId, customPrice } = formData;
    
            const payload = {
                franchiseId: Number(franchiseId),
                scrapItemId: Number(scrapItemId),
                price: Number(customPrice)
            };
    
            const response = await franchiseServices.setCustomPrice(payload);
            if(response.status === 200){
                alert("Price updated successfully!")
                fetchData()
                setModalVisible(false)
            }else{
            setModalVisible(true);
            }
        } catch (error) {
            console.error("Error updating price:", error);
            alert("Failed to update price.");
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    useEffect(()=>{
        fetchData()
    },[currentPage])

    useEffect(() => {
        if (search.length === 0) {
            fetchData(); // Automatically fetch data when search is empty
        }
    }, [search]);
    
    if(loading){
        <AppLoadingSpinner/>
    }
    
    return(
        <CRow className="mb-3">
            <CCol xs={12}>
                <CCard>
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        <strong>Franchise Items List</strong>
                        <div className= "d-flex gap-2">
                            <CFormInput type="text" placeholder="Search Item Name" value={search} onChange={handleSearch}/>
                            <CButton className="btn btn-primary" onClick={fetchData} >Search</CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <AppPaginatedTable
                        data={data}
                        columns={[
                            
                            {
                                label: "Item Id",
                                accessor: "scrapItemId"
                            },
                            {
                                label: "Item",
                                accessor: "scrapName"
                            },
                            {
                                label: "Master Price",
                                accessor: "masterPrice"
                            },
                            {
                                label: "Custom Price",
                                accessor: "customPrice"
                            },
                        ]}
                        currentPage={currentPage}
                        totalRecords={totalRecords}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPageChange={setCurrentPage}
                        actionButtons={[
                            {
                                label: "Edit",
                                onClick : handleEdit
                            }
                        ]}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
            <ItemPriceModal
            backdrop="static"
            visible={modalVisible}
            formData={formData}
            setFormData={setFormData}
            onClose={()=>setModalVisible(false)}
            onSave = {handleSubmit}
            />
        </CRow>
    )
}

export default FranchiseItemsList