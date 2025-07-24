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
import { useEffect, useState } from 'react'
import scrapCategoryService from '../../services/scrapCategoryService'

const ScrapItemModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {
  const [categories, setCategories] = useState([])
  const [validated, setValidated] = useState(false)

  const fetchCategory = async () => {
    try {
      const response = await scrapCategoryService.getScrapCategory()
      setCategories(response.data.result)
    } catch (error) {
      console.log('Error', error)
    }
  }

  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleFileChange = (e)=>{
    const file = e.target.files[0]
    setFormData((prevState) => ({ ...prevState, image: file }))
  }

  useEffect(() => {
    fetchCategory()
  }, [])

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
        <CModalTitle>{editMode ? 'Edit Scrap Item' : 'Create New Scrap Item'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm noValidate validated={validated} onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
          <div>
            <CFormLabel>Category</CFormLabel>
            <CFormSelect
              name="itemCategoryId"
              value={formData.itemCategoryId}
              onChange={handleChange}
              feedbackInvalid="Select a category"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div>
            <CFormLabel>Name</CFormLabel>
            <CFormInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              feedbackInvalid="Enter a name"
              required
            />
          </div>
          <div>
            <CFormLabel>Price</CFormLabel>
            <CFormInput
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              feedbackInvalid="Enter a number"
              required
            />
          </div>
          <div>
            <CFormLabel>Unit</CFormLabel>
            <CFormInput
              name="measuringUnit"
              value={formData.measuringUnit}
              onChange={handleChange}
              feedbackInvalid="Enter a Measuring Unit"
              required
            />
          </div>
          <div>
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
          <div className = "d-flex gap-2 flex-row-reverse mt-2">
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

export default ScrapItemModal
