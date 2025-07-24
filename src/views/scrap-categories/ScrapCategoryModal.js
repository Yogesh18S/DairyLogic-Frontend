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
import { useState } from 'react'

const ScrapCategoryModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {
  const [validated, setValidated] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prevState) => ({ ...prevState, image: file }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget

    if (!form.checkValidity()) {
      event.stopPropagation()
      setValidated(true)
      return
    }
    setValidated(true)
    onSave()
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{editMode ? 'Edit Scrap Category' : 'Create New Scrap Category'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel>Name</CFormLabel>
            <CFormInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              feedbackInvalid="Enter Category Name"
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Description</CFormLabel>
            <CFormInput
              name="description"
              value={formData.description}
              onChange={handleChange}
              feedbackInvalid="Enter Unit"
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Upload Image</CFormLabel>
            <CFormInput
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              feedbackInvalid="Select an image"
              required
            />
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

export default ScrapCategoryModal
