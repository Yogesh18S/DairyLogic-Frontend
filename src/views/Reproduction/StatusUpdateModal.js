import React from 'react';
import {
  CModal, CModalHeader, CModalTitle, CModalBody,
  CForm, CFormLabel, CFormSelect, CFormInput, CButton
} from '@coreui/react';

const StatusUpdateModal = ({ visible, onClose, formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Update Status</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={onSubmit}>
          <CFormLabel>Status</CFormLabel>
          <CFormSelect
            name="cycleStatus"
            value={formData.cycleStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="IU">IU</option>
            <option value="AI/NI">AI/NI</option>
            <option value="PD">PD</option>
            <option value="Delivery">Delivery</option>
          </CFormSelect>

          <CFormLabel className="mt-3">Next Check Date</CFormLabel>
          <CFormInput
            type="date"
            name="nextCheckDate"
            value={formData.nextCheckDate || ''}
            onChange={handleChange}
          />

          <CButton type="submit" color="success" className="mt-3">Update</CButton>
        </CForm>
      </CModalBody>
    </CModal>
  );
};

export default StatusUpdateModal;
