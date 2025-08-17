import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const HistoryModal = ({ visible, onClose, historyData, selectedAnimalId }) => {
  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>History for Animal ID: {selectedAnimalId}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {historyData.length === 0 ? (
          <p>No history found.</p>
        ) : (
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {historyData.map((log, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{log.date}</CTableDataCell>
                  <CTableDataCell>{log.status}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default HistoryModal
