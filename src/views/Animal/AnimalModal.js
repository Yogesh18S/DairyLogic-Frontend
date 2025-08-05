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

const AnimalModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
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
            <CFormInput name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" />
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
          <CButton color="primary" onClick={onSave}>
            Save
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default AnimalModal
