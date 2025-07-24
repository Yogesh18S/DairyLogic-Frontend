import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/react'
import { useState } from 'react'

const franchiseModel = ({ visible, onClose, onSave, formData, setFormData, editMode,locationData }) => {
  const [validated, setValidated] = useState(false)
  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget

    if (!form.checkValidity()) {
      event.stopPropagation()
      setValidated(true)
      return true
    }

    setValidated(true)
    onSave()
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{editMode ? 'Edit franchise' : 'Create New franchise'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm validated={validated} noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel>Name</CFormLabel>
            <CFormInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              feedbackInvalid="Please provide a Name."
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Email</CFormLabel>
            <CFormInput
              name="email"
              value={formData.email}
              onChange={handleChange}
              feedbackInvalid="Please provide a Email"
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Phone Number</CFormLabel>
            <CFormInput
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              feedbackInvalid="Please provide a Phone number"
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>City</CFormLabel>
            <CFormInput
              name="city"
              value={formData.city}
              onChange={handleChange}
              feedbackInvalid="Please provide a valid city."
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Address</CFormLabel>
            <CFormInput
              name="address"
              value={formData.address}
              onChange={handleChange}
              feedbackInvalid="Please provide a address"
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Location</CFormLabel>
            <CFormSelect name="locationId" value={formData.locationId} onChange={handleChange}>
              <option value="">Select Location</option>
              {locationData.map((location)=>(
                <option key={location.id} value={location.id}>{location.displayName}</option>
              ))}
            </CFormSelect>
          </div>
          <div className="d-flex gap-2 flex-row-reverse">
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" type="submit">
          Save
        </CButton>
      </div>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default franchiseModel
