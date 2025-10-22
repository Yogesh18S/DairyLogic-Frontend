import { useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CAlert,
} from '@coreui/react'

const DriverModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {
   const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: checked }))
  }

 const validate = () => {
    const newErrors = {}

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits'
    }

    if (!formData.password?.trim()) {
    newErrors.password = 'Password is required'
  } else {
    const password = formData.password

    if (!/[a-z]/.test(password)) {
      newErrors.password = "Passwords must have at least one lowercase ('a'-'z')."
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Passwords must have at least one uppercase ('A'-'Z')."
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      newErrors.password = 'Passwords must have at least one non alphanumeric character.'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }
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
        <CModalTitle>{editMode ? 'Edit Driver' : 'Create New Driver'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel>First Name</CFormLabel>
            <CFormInput name="firstName" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && (
              <CAlert color="danger" className="mt-2 py-1">
                {errors.firstName}
              </CAlert>
            )}
          </div>
          <div className="mb-3">
            <CFormLabel>Last Name</CFormLabel>
            <CFormInput name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormLabel>Email</CFormLabel>
            <CFormInput name="email" value={formData.email} onChange={handleChange} />
              {errors.email && (
              <CAlert color="danger" className="mt-2 py-1">
                {errors.email}
              </CAlert>
            )}
          </div>
          <div className="mb-3">
            <CFormLabel>Phone Number</CFormLabel>
            <CFormInput name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                {errors.phoneNumber && (
              <CAlert color="danger" className="mt-2 py-1">
                {errors.phoneNumber}
              </CAlert>
            )}
          </div>
          <div className="mb-3">
            <CFormLabel>Address</CFormLabel>
            <CFormInput name="address" value={formData.address} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <CFormLabel>Password</CFormLabel>
            <CFormInput
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
              {errors.password && (
              <CAlert color="danger" className="mt-2 py-1">
                {errors.password}
              </CAlert>
            )}
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="isActive"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Active</label>
          </div>
        </CForm>
        <div className="d-flex justify-content-end gap-2">
          <CButton color="secondary" onClick={onClose}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Save
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default DriverModal
