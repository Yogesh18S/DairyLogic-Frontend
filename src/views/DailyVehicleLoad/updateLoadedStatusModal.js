import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
} from '@coreui/react'
import dailyVehicleLoadedService from '../../services/dailyVehicleLoadedService'

const UpdateLoadedStatusModal = ({
  visible,
  onClose,
  dailyVehicleLoadId,
  initialRemainingQty,
  onQuantityUpdated,
}) => {
  const [remainingQty, setRemainingQty] = useState('')
  const [loading, setLoading] = useState(false)

  // ✅ When modal opens, pre-fill with existing value
  useEffect(() => {
    if (visible) {
      setRemainingQty(initialRemainingQty ?? '')
    }
  }, [visible, initialRemainingQty])

  const handleSubmit = async () => {
    if (!remainingQty && remainingQty !== 0) {
      alert('Please enter remaining quantity')
      return
    }

    try {
      setLoading(true)
      const response = await dailyVehicleLoadedService.UpdateStatusByAdmin({
        id: dailyVehicleLoadId,
        remainingQuantity: Number(remainingQty),
      })

      if (response?.data?.isSuccess) {
        alert(response.data.message || 'Status updated successfully')
        if (onQuantityUpdated) onQuantityUpdated() // ✅ refresh list
        onClose()
      } else {
        alert(response?.data?.message || 'Failed to update status')
      }
    } catch (error) {
      console.error('Error updating remaining quantity:', error)
      alert('Something went wrong while updating.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size="md">
      <CModalHeader closeButton>
        <CModalTitle>Update Daily Vehicle Load Status</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            type="number"
            label="Remaining Quantity"
            placeholder="Enter remaining quantity"
            value={remainingQty}
            onChange={(e) => setRemainingQty(e.target.value)}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Updating...' : 'Submit'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default UpdateLoadedStatusModal
