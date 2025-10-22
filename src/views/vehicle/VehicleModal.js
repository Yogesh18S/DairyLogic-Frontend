import {
  CButton,
  CForm,
  CFormInput,
  CFormSwitch,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
} from '@coreui/react'
import { useState } from 'react'
const VehicleModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }
  const [errors, setErrors] = useState({})
  const validate = () => {
    const newErrors = {}

    if (!formData.vehicleNo?.trim()) {
      newErrors.vehicleNo = 'Vehicle number is required'
    } else if (!/^[A-Za-z0-9-]+$/.test(formData.vehicleNo)) {
      newErrors.vehicleNo = 'Vehicle number must be alphanumeric (letters, numbers, or hyphens only)'
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
        <CModalTitle>{editMode ? 'Edit Vehicle' : 'Add Vehicle'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            label="Vehicle Number"
            name="vehicleNo"
            value={formData.vehicleNo}
            onChange={handleChange}
            required
          />
             {errors.vehicleNo && (
              <CAlert color="danger" className="mt-2 py-1">
                {errors.vehicleNo}
              </CAlert>
            )}
          <CFormSwitch
            label="Active"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={onSave} onClick={handleSave} className="flex-grow-1 flex-md-grow-0">
          {editMode ? 'Update' : 'Save'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default VehicleModal
