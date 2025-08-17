import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
} from '@coreui/react'
import vehicleService from '../../services/vehicleService' // Assume you have this service

const dailyVehicleLoadModal = ({ visible, onClose, onSave, formData, setFormData, editMode }) => {
  const [vehicleList, setVehicleList] = useState([])
  useEffect(() => {
    if (!editMode) {
      const today = new Date().toISOString().split('T')[0]
      setFormData((prev) => ({
        ...prev,
        deliveryDate: today,
      }))
    }
  }, [visible, editMode])

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await vehicleService.getAllDriver() // Customize this to your API
        setVehicleList(res.data.result || [])
      } catch (error) {
        console.error('Error fetching vehicles:', error)
      }
    }

    if (visible) {
      fetchVehicles()
    }
  }, [visible])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleVehicleChange = (e) => {
    const selectedId = e.target.value
    const selectedVehicle = vehicleList.find((v) => v.id === selectedId)
    setFormData((prev) => ({
      ...prev,
      vehicleId: selectedId,
      vehicleNo: selectedVehicle?.vehicleNo || '',
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave()
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{editMode ? 'Edit' : 'Create'} Daily Vehicle Load</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody>
          <div className="mb-3">
            <CFormLabel htmlFor="vehicleId">Vehicle</CFormLabel>
            <CFormSelect
              id="vehicleId"
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleVehicleChange}
              required
            >
              <option value="">Select a vehicle</option>
              {vehicleList.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.vehicleNo}
                </option>
              ))}
            </CFormSelect>
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="quantity">Quantity</CFormLabel>
            <CFormInput
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="deliveryDate">Delivery Date</CFormLabel>
            <CFormInput
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate || ''}
              onChange={handleChange}
              required
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" type="submit">
            {editMode ? 'Update' : 'Submit'}
          </CButton>
          <CButton color="secondary" onClick={onClose}>
            Cancel
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default dailyVehicleLoadModal
