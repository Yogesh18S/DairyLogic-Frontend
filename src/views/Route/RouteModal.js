import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

const RouteModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
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
          <CButton color="primary" onClick={onSave}>
            Save
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default RouteModal
