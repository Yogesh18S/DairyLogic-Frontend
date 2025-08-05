import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/react'

const DriverModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData(prevState => ({ ...prevState, [name]: checked }))
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
          </div>
          <div className="mb-3">
            <CFormLabel>Last Name</CFormLabel>
            <CFormInput name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormLabel>Email</CFormLabel>
            <CFormInput name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormLabel>Phone Number</CFormLabel>
            <CFormInput name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormLabel>Address</CFormLabel>
            <CFormInput name="address" value={formData.address} onChange={handleChange} />
          </div>
          {!editMode && (
            <div className="mb-3">
              <CFormLabel>Password</CFormLabel>
              <CFormInput name="password" type="password" value={formData.password} onChange={handleChange} />
            </div>
          )}
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
          <CButton color="secondary" onClick={onClose}>Cancel</CButton>
          <CButton color="primary" onClick={onSave}>Save</CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default DriverModal
