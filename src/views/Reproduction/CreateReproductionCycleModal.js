import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react'
import animalService from '../../services/animalServices'

const CreateReproductionCycleModal = ({
  visible,
  onClose,
  formData,
  setFormData,
  onSubmit,
  mode = 'create',
}) => {
  const [animalTags, setAnimalTags] = useState([])

  useEffect(() => {
    if (!visible) return

    const fetchAnimals = async () => {
      try {
        let response
        if (mode === 'create') {
          response = await animalService.getAnimalListWithoutReproduction()
        } else {
          response = await animalService.getAllAnimals()
        }
        setAnimalTags(response.data.result || [])
      } catch (error) {
        console.error('Failed to load animals:', error)
        setAnimalTags([])
      }
    }

    fetchAnimals()
  }, [visible, mode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>{mode === 'create' ? 'Create' : 'Edit'} Reproduction Cycle</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={onSubmit}>
          {/* Animal Tag Dropdown */}
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Animal Tag</CFormLabel>
              <CFormSelect
                name="animalId"
                value={formData.animalId || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select Animal Tag</option>
                {animalTags.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.tagNumber}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          {/* Reproduction Date */}
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Reproduction Date</CFormLabel>
              <CFormInput
                type="date"
                name="cycleStartDate"
                value={formData.cycleStartDate || ''}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>

          {/* Status Dropdown */}
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Status</CFormLabel>
              <CFormSelect
                name="cycleStatus"
                value={formData.cycleStatus || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="IU">IU</option>
                <option value="AI/NI">AI/NI</option>
                <option value="PD">PD</option>
                <option value="Delivery">Delivery</option>
              </CFormSelect>
            </CCol>
          </CRow>

          {/* Next Check Date */}
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Next Check Date</CFormLabel>
              <CFormInput
                type="date"
                name="nextCheckDate"
                value={formData.nextCheckDate || ''}
                onChange={handleChange}
              />
            </CCol>
          </CRow>

          <CButton type="submit" color="success">
            {mode === 'create' ? 'Create' : 'Update'}
          </CButton>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default CreateReproductionCycleModal
