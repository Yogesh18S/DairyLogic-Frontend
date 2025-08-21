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

const HistoryModal = ({ visible, onClose, historyData = [], selectedAnimalId }) => {
  return (
    <CModal visible={visible} onClose={onClose} aria-labelledby="history-modal-title" size="lg">
      <CModalHeader closeButton>
        <CModalTitle id="history-modal-title">
          History for Animal Tag Number: {historyData.tagNumber}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {historyData.length === 0 ? (
          <div className="text-center text-muted">No history found</div>
        ) : (
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Action Date</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Next Chec kDate</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {historyData.map((log, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{log.actionDate}</CTableDataCell>
                  <CTableDataCell>{log.status}</CTableDataCell>
                  <CTableDataCell>{log.nextCheckDate}</CTableDataCell>
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
