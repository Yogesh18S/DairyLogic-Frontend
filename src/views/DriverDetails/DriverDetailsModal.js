import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormSelect,
} from '@coreui/react'

const DriverDetailsModal = ({
  visible,
  onClose,
  onSave,
  formData,
  setFormData,
  editMode,
  vehicles,
  routes,
  drivers,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <CModal backdrop="static" visible={visible} onClose={onClose}>
      <CModalHeader>{editMode ? 'Edit Driver Details' : 'Create Driver Details'}</CModalHeader>
      <CModalBody>
        <CForm>
          <CFormSelect
            label="Vehicle"
            name="vehicleId"
            value={formData.vehicleId || ''}
            onChange={handleChange}
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.vehicleNo}
              </option>
            ))}
          </CFormSelect>

          <CFormSelect
            label="Route"
            name="routeId"
            value={formData.routeId || ''}
            onChange={handleChange}
            className="mt-3"
          >
            <option value="">Select Route</option>
            {routes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </CFormSelect>

          <CFormSelect
            label="Driver"
            name="userId"
            value={formData.userId || ''}
            onChange={handleChange}
            className="mt-3"
          >
            <option value="">Select Driver</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.firstName}
              </option>
            ))}
          </CFormSelect>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={onSave}>
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DriverDetailsModal
