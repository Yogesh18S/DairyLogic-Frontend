import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CAlert,
} from '@coreui/react'

const ProductModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {
  // When modal opens, populate form (on edit)
  const [errors, setErrors] = useState({})
  useEffect(() => {
    if (visible && editMode && formData) {
      setFormData({
        id: formData.id || '',
        name: formData.name || '',
        description: formData.description || '',
        unit: formData.unit || '',
        basePrice: formData.basePrice || '',
      })
    } else if (visible && !editMode) {
      setFormData({
        id: '',
        name: '',
        description: '',
        unit: '',
        basePrice: '',
      })
    }
  }, [visible, editMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'basePrice' ? parseFloat(value) || '' : value,
    }))
  }
  const validate = () => {
    const newErrors = {}

    if (!formData.name?.trim()) {
      newErrors.name = 'Product name is required'
    }

    if (!formData.unit?.trim()) {
      newErrors.unit = 'Unit is required'
    }

    if (formData.basePrice === '' || formData.basePrice == null) {
      newErrors.basePrice = 'Base price is required'
    } else if (isNaN(formData.basePrice) || formData.basePrice <= 0) {
      newErrors.basePrice = 'Base price must be a positive number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSubmit = () => {
    if (validate()) {
      onSave()
    }
  }
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{editMode ? 'Edit' : 'Add'} Product</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="name">Name</CFormLabel>
            <CFormInput id="name" name="name" value={formData.name} onChange={handleChange} />
             {errors.name && (
              <CAlert color="danger" className="mt-2 py-1">
                {errors.name}
              </CAlert>
            )}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="description">Description</CFormLabel>
            <CFormInput
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="unit">Unit</CFormLabel>
            <CFormInput id="unit" name="unit" value={formData.unit} onChange={handleChange} />
              {errors.unit && (
              <CAlert color="danger" className="mt-2 py-1">
                {errors.unit}
              </CAlert>
            )}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="basePrice">Base Price</CFormLabel>
            <CFormInput
              id="basePrice"
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
            />
              {errors.basePrice && (
              <CAlert color="danger" className="mt-2 py-1">
                {errors.basePrice}
              </CAlert>
            )}
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ProductModal
