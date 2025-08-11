import React, { useState, useEffect } from 'react';
import {
  CForm, CFormInput, CFormLabel, CFormCheck, CButton,
  CRow, CCol, CCard, CCardBody, CCardHeader, CFormSelect
} from '@coreui/react';
import { useNavigate, useParams } from 'react-router-dom';
import routeService from '../../services/routeService';
import customerDetailsService from '../../services/customerDetailsService';
const CreateCustomer = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: '',
    longitude: '',
    milkType: 'Cow',
    quantityLiter: '',
    startDate: '',
    endDate: '',
    deliveryDaysMon: true,
    deliveryDaysTue: true,
    deliveryDaysWed: true,
    deliveryDaysThu: true,
    deliveryDaysFri: true,
    deliveryDaysSat: true,
    deliveryDaysSun: true,
    deliveryOrder: 0,
    routeId: '',
    price: '',
    isActive: true,
    isDeleted: false,
  });

  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

//  useEffect(() => {
//     fetchRoutes();
//     if (id) fetchCustomer(id);
//   }, [id]);

  console.log(id)
  useEffect(() => {
    if (id) {
      fetchCustomer(id);
    }
  }, [id]);

  const fetchRoutes = async () => {
    try {
      const { data } = await routeService.getAllRouteList();
      setRoutes(
        data?.result?.map(r => ({
          id: r.id,
          name: r.name?.trim() || ''
        })) || []
      );
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  const fetchCustomer = async (customerId) => {
    console.log(customerId)
    try {
      setLoading(true);
      const { data } = await customerDetailsService.getCustomerById(customerId);
      console.log(data)
      if (data) {
        setFormData(prev => ({
          ...prev,
          ...data,
          routeId: data.routeId || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value.trim()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await customerDetailsService.updateCustomer(id, formData);
        alert('Customer updated successfully!');
      } else {
        await customerDetailsService.createCustomer(formData);
        alert('Customer created successfully!');
      }
      navigate('/customers');
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('Failed to save customer');
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <strong>{id ? 'Edit Customer' : 'Create Customer'}</strong>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          {/* First and Last Name */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>First Name</CFormLabel>
              <CFormInput name="firstName" value={formData.firstName} onChange={handleChange} required />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Last Name</CFormLabel>
              <CFormInput name="lastName" value={formData.lastName} onChange={handleChange} />
            </CCol>
          </CRow>

          {/* Phone & Milk Type */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Phone Number</CFormLabel>
              <CFormInput name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Milk Type</CFormLabel>
              <CFormInput name="milkType" value={formData.milkType} onChange={handleChange} />
            </CCol>
          </CRow>

          {/* Quantity & Price */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Quantity (Liters)</CFormLabel>
              <CFormInput type="number" name="quantityLiter" value={formData.quantityLiter} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Price</CFormLabel>
              <CFormInput type="number" name="price" value={formData.price} onChange={handleChange} />
            </CCol>
          </CRow>

          {/* Address */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Address Line 1</CFormLabel>
              <CFormInput name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Address Line 2</CFormLabel>
              <CFormInput name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
            </CCol>
          </CRow>

          {/* City, State, Zip */}
          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel>City</CFormLabel>
              <CFormInput name="city" value={formData.city} onChange={handleChange} />
            </CCol>
            <CCol md={4}>
              <CFormLabel>State</CFormLabel>
              <CFormInput name="state" value={formData.state} onChange={handleChange} />
            </CCol>
            <CCol md={4}>
              <CFormLabel>Zip Code</CFormLabel>
              <CFormInput name="zipCode" value={formData.zipCode} onChange={handleChange} />
            </CCol>
          </CRow>

          {/* Lat & Long */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Latitude</CFormLabel>
              <CFormInput name="latitude" value={formData.latitude} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Longitude</CFormLabel>
              <CFormInput name="longitude" value={formData.longitude} onChange={handleChange} />
            </CCol>
          </CRow>

          {/* Dates */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Start Date</CFormLabel>
              <CFormInput type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormLabel>End Date</CFormLabel>
              <CFormInput type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
            </CCol>
          </CRow>

          {/* Delivery Days */}
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Delivery Days</CFormLabel>
              <div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <CFormCheck
                    key={day}
                    inline
                    label={day}
                    name={`deliveryDays${day}`}
                    checked={formData[`deliveryDays${day}`]}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </CCol>
          </CRow>

          {/* Route & Delivery Order */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Route</CFormLabel>
              <CFormSelect name="routeId" value={formData.routeId} onChange={handleChange}>
                <option value="">Select Route</option>
                {routes.map(route => (
                  <option key={route.id} value={route.id}>{route.name}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Delivery Order</CFormLabel>
              <CFormInput type="number" name="deliveryOrder" value={formData.deliveryOrder} onChange={handleChange} />
            </CCol>
          </CRow>

          <CButton color="success" type="submit">{id ? 'Update' : 'Submit'}</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default CreateCustomer;