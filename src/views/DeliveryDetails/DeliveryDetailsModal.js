import {
  CButton,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

const DeliveryDetailsModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  console.log('Modal formData:', formData)
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{editMode ? 'Edit Delivery Details' : 'Add Delivery Details'}</CModalTitle>
      </CModalHeader>
      <CModalBody>

        <div className="mb-3">
            <strong>Customer Name:</strong>{' '}
            <span>{formData.customerName || 'N/A'}</span>
          </div>
          
        <CForm>
          <CFormInput
            label="Quantity"
            name="quantity"
            value={formData.quantity || ''}
            onChange={handleChange}
            required
          />
       
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={onSave}>
          {editMode ? 'Update' : 'Save'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeliveryDetailsModal
