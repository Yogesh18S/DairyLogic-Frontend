import { CButton, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react';
import { Fragment, useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import AppLoadingSpinner from '../../components/AppLoadingSpinner';

const CreateScrapItem = ()=>{
    const [categories, setCategories] = useState([]);
    const [formData , setFormData] = useState({
        itemCategoryId : "",
        Name : "",
        measuringUnit : "",
        Price : ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const fetchData = async ()=>{
        axiosInstance.get(`/ItemCategories`)
        .then((response) =>{
            setCategories(response.data.result);
        })
        .catch((error)=>{
            console.log("Error fetching Categories");
            setError(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        fetchData();
    },[])

    if(loading){
        <AppLoadingSpinner></AppLoadingSpinner>
    }
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axiosInstance.post("/ScrapItem", formData);
        console.log("Scrap Item Created:", response.data);
        alert("Scrap item added successfully!");
    } catch (error) {
        console.error("Error creating scrap item:", error);
        alert("Failed to add scrap item.");
        if(error.response){
            console.log("Response Data :" , error.response.data)
        }
    }
};

    return(
        <Fragment>
            <CContainer className="d-flex">
            <CRow className="justify-content-center w-100">
                <CCardBody>
                    <CCol xs={12} lg={6} xl={4} md={6} className="mx-auto bg-light-subtle p-5 rounded-4">
                        <CCardHeader>
                            <strong>Add Scrap Items</strong>
                        </CCardHeader>
                        <CForm onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
                        <div className='d-flex flex-column'>
                                <CFormLabel>Category</CFormLabel>
                                <CFormSelect
                                    type="text"
                                    id="category"
                                    name="itemCategoryId"
                                    placeholder="Select Category"
                                    value={formData.itemCategoryId}
                                    onChange={handleChange}
                                    required>

                                    <option value="">-- Select Category --</option>
                                    {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                    {category.name}
                                    </option>
                                    ))}

                                </CFormSelect>
                            </div>
                            <div className='d-flex flex-column'>
                                <CFormLabel>ScrapItem</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="name"
                                    name="Name"
                                    placeholder="Enter item name"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    required
                                    />
                            </div>
                            <div className='d-flex flex-column'>
                                <CFormLabel>Price</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="price"
                                    name="Price"
                                    placeholder="Enter Price"
                                    value={formData.Price}
                                    onChange={handleChange}
                                    required
                                    />
                            </div>
                            <div className='d-flex flex-column mb-2'>
                                <CFormLabel>Measuring Unit</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="measuringUnit"
                                    name="measuringUnit"
                                    placeholder="Enter Measuring unit"
                                    value={formData.measuringUnit}
                                    onChange={handleChange}
                                    required
                                    />
                            </div>
                            <CButton type="submit" color="primary">Add Item</CButton>
                        </CForm>
                    </CCol>
                </CCardBody>
            </CRow>
            </CContainer>
        </Fragment>
    );
}

export default CreateScrapItem