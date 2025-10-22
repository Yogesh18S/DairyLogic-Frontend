import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CAlert,
} from '@coreui/react'

import { useState } from 'react'
const AnimalModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  setErrors((prev) => ({ ...prev, [name]: '' }))
  }

   const validate = () => {
    const newErrors = {}

    if (!formData.tagNumber?.trim()) {
      newErrors.tagNumber = 'Tag number is required'
    } else if (!/^[A-Za-z0-9-]+$/.test(formData.tagNumber)) {
      newErrors.tagNumber = 'Tag number must be alphanumeric (letters, numbers, or hyphens)'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSave = () => {
    if (validate()) {
      onSave()
    }
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{editMode ? 'Edit Animal' : 'Create New Animal'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel>Tag Number</CFormLabel>
            <CFormInput name="tagNumber" value={formData.tagNumber} onChange={handleChange} />
             {errors.tagNumber && <CAlert color="danger" className="mt-2 py-1">{errors.tagNumber}</CAlert>}
          </div>
          <div className="mb-3">
            <CFormLabel>Name</CFormLabel>
            <CFormInput name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormLabel>Breed</CFormLabel>
            <CFormInput name="breed" value={formData.breed} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormLabel>Date of Birth</CFormLabel>
            <CFormInput name="dateOfBirth" value={formData.dateOfBirth || ""} onChange={handleChange} type="date" />
          </div>
          <div className="mb-3">
            <CFormLabel>Status</CFormLabel>
            <CFormSelect name="isActive" value={formData.isActive} onChange={handleChange}>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </CFormSelect>
          </div>
        </CForm>
        <div className="d-flex justify-content-end gap-2">
          <CButton color="secondary" onClick={onClose}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={onSave}  onClick={handleSave} className="flex-grow-1 flex-md-grow-0">
            Save
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default AnimalModal
