import { CAlert, CAlertHeading, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import AppLoadingSpinner from ".././components/AppLoadingSpinner";
import AppPaginatedTable from ".././components/table/AppPaginatedTable";
import { ITEMS_PER_PAGE } from ".././constants/globalConstants";
import franchiseServices from ".././services/franchiseServices";
import LocationService from "../services/locationService";
import FranchiseModal from "./FranchiseModel";

const FranchiseList  =() =>{
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", address: "",locationId: ""});
  const [location, setLocation] = useState([])

  const fetchData = async () => {
    try {
        const response = await franchiseServices.getfranchise(currentPage, ITEMS_PER_PAGE);
        
        const formattedData = response.data.result.map((franchise)=>({
            ...franchise,
            displayName : franchise.displayName ? franchise.displayName : "Not Available"

        }))

        setData(formattedData);

        setTotalRecords(response.data.pagedListMetadata.totalRecords);

        const locationResponse = await LocationService.getLocation();
        setLocation(locationResponse.data.result);

    } catch (error) {
        console.error("API request failed", error);
        setError("Failed to fetch data. Please try again later.");
    } finally {
        setLoading(false);
    }
  };

     // Handle Create New Button Click
     const handleCreateNew = () => {
      setFormData({ id: "", name: "", email: "", phone: "", city: "", address: "",locationId: ""});
      setEditMode(false);
      setModalVisible(true);
  };

    // Hanlde Edit record grid button click
    const handleEdit = (id) => {
        
      // TODO: Get itemToEdit from api call if required
      const itemToEdit = data.find(item => item.id === id);

      setFormData(itemToEdit);
      setEditMode(true);
      setModalVisible(true);
  };
      // Hanlde delete record grid button click
      const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this franchise?")) return;
        try {
            await franchiseServices.deletefranchise(id);

            // Refresh list after deletion
            fetchData();
        } catch (error) {
            console.error("Error deleting data", error);
            setError("Failed to delete data. Please try again.");
        }
    };
        // Handle save button click
        const handleSave = async () => {
          try {
              if (editMode) {
                  await franchiseServices.updatefranchise(formData.id, formData);
              } else {
                  const response=await franchiseServices.createfranchise(formData);
                  console.log(response);
              }
              setModalVisible(false);
  
              // Refresh list after update
              fetchData();
          } catch (error) {
              console.error("Error saving data", error);
              setError("Failed to save data. Please try again.");
          }
      }; 
      useEffect(() => {
        fetchData();
    }, [currentPage]);

 if (loading) return <AppLoadingSpinner />;
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
                <CCardHeader className="d-flex gap-2 align-items-center justify-content-between">
                    <strong>Franchise List</strong>
                    <CButton color="primary" className="float-end" onClick={handleCreateNew}>
                        Create New
                    </CButton>
                </CCardHeader>
                <CCardBody>
                    <AppPaginatedTable
                        columns={[
                            { label: "Name", accessor: "name" },
                            { label: "Email", accessor: "email" },
                            { label: "Phone Number", accessor: "phone" },
                            { label: "City", accessor: "city" },
                            { label: "Address", accessor: "address" },
                            { label: "Location", accessor: "displayName"}
                        ]}
                        data={data}
                        currentPage={currentPage}
                        itemsPerPage={ITEMS_PER_PAGE}
                        totalRecords={totalRecords}
                        onPageChange={setCurrentPage}
                        actionButtons={[
                            { label: "Edit", onClick: handleEdit },
                            { label: "Delete", onClick: handleDelete },
                        ]}
                    />
                </CCardBody>
            </CCard>
        </CCol>
        <FranchiseModal
            backdrop="static"
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSave={handleSave}
            locationData = {location}
            formData={formData}
            setFormData={setFormData}
            editMode={editMode} />
    </CRow>
  );
};

export default FranchiseList
