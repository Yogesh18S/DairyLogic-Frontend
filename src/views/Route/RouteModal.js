import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CAlert
} from '@coreui/react'
import { useState } from 'react'
const RouteModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
       if (!formData.name?.trim()) {
      newErrors.name = 'Route name is required'
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
        <CModalTitle>{editMode ? 'Edit Route' : 'Create New Route'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel>Name</CFormLabel>
            <CFormInput name="name" value={formData.name} onChange={handleChange} />
                {errors.name && (
              <CAlert color="danger" className="mt-2 py-1">
                {errors.name}
              </CAlert>
            )}  
          </div>
          <div className="mb-3">
            <CFormLabel>Description</CFormLabel>
            <CFormInput name="description" value={formData.description} onChange={handleChange} />
          </div>
        </CForm>
        <div className="d-flex justify-content-end gap-2">
          <CButton color="secondary" onClick={onClose}>
            Cancel
          </CButton>
          <CButton color="primary"  onClick={handleSave} >
            Save
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default RouteModal
