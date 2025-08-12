import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { ITEMS_PER_PAGE } from '../../constants/globalConstants'
import reproductionCycleService from '../../services/reproductionCycleService';
import CreateReproductionCycleModal from './CreateReproductionCycleModal';
import HistoryModal from './HistoryModal';
import StatusUpdateModal from './StatusUpdateModal';
const ReproductionCycleList = () => {
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({ animalId: '', cycleStatus: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusFormData, setStatusFormData] = useState({
  cycleStatus: '',
  nextCheckDate: ''
  });
  const [selectedCycleForStatus, setSelectedCycleForStatus] = useState(null);
  console.log(selectedCycleForStatus)
const handleStatusSubmit = async (e) => {
  e.preventDefault();
  try {
    await reproductionCycleService.updateCycleStatus({
        reproductionId: selectedCycleForStatus.id,
        cycleStatus: statusFormData.cycleStatus,
        nextCheckDate: statusFormData.nextCheckDate || null,
        remark: ''
});
    setShowStatusModal(false);
    fetchAllCycles();
  } catch {
    alert('Failed to update status');
  }
};

  useEffect(() => {
    fetchAllCycles();
  }, []);

  const fetchAllCycles = async () => {
    setLoading(true);
    try {
      const res = await reproductionCycleService.getReproductionCycleList(currentPage,ITEMS_PER_PAGE);
      console.log(res.data.result)
      setCycles(res.data.result || []);
    } catch (e) {
      setError('Failed to load reproduction cycles');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await reproductionCycleService.createReproductionCycle(createFormData);
      setShowCreateModal(false);
      fetchAllCycles();
    } catch {
      alert('Failed to create reproduction cycle');
    }
  };

//    const handleCreateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEdit) {
//         await reproductionCycleService.updateReproductionCycle(createFormData.id, createFormData);
//       } else {
//         await reproductionCycleService.createReproductionCycle(createFormData);
//       }
//       setShowCreateModal(false);
//       setIsEdit(false);
//       fetchAllCycles();
//     } catch {
//       alert('Failed to save reproduction cycle');
//     }
//   };

  const fetchHistory = async (animalId) => {
    setSelectedAnimalId(animalId);
    setShowHistoryModal(true);
    try {
      const res = await reproductionCycleService.getHistoryByAnimalId(animalId);
      setHistoryData(res.data.Result || []);
    } catch {
      setHistoryData([]);
    }
  };

const handleEdit = (cycle) => {
  setCreateFormData({
    animalId: cycle.animalId,
    reproductionDate: cycle.cycleStartDate,
    cycleStatus: cycle.cycleStatus,
    nextCheckDate: cycle.nextCheckDate || ''
  });
  setIsEdit(true);
  setShowCreateModal(true);
};

const handleUpdateStatus = (cycle) => {
  setSelectedCycleForStatus(cycle);
  setStatusFormData({
    cycleStatus: cycle.cycleStatus,
    nextCheckDate: cycle.nextCheckDate || ''
  });
  setShowStatusModal(true);
};

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <strong>Reproduction Cycles</strong>
          <CButton color="primary" onClick={() => setShowCreateModal(true)}>
            Create New
          </CButton>
        </CCardHeader>
        <CCardBody>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>AnimalName</CTableHeaderCell>
                  <CTableHeaderCell>TagName</CTableHeaderCell>
                  <CTableHeaderCell>Cycle Start Date</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {cycles.length === 0 && (
                  <CTableRow>
                    <CTableDataCell colSpan={4}>No records found</CTableDataCell>
                  </CTableRow>
                )}
                {cycles.map((cycle) => (
                  <CTableRow key={cycle.name}>
                    <CTableDataCell>{cycle.name}</CTableDataCell>
                    <CTableDataCell>{cycle.tagNumber}</CTableDataCell>
                    <CTableDataCell>{cycle.cycleStartDate}</CTableDataCell>
                    <CTableDataCell>{cycle.cycleStatus}</CTableDataCell>
                  <CTableDataCell>
  <CButton
    size="sm"
    color="info"
    onClick={() => fetchHistory(cycle.animalId)}
    className="me-2"
  >
    View History
  </CButton>

  <CButton
    size="sm"
    color="warning"
    className="me-2"
    onClick={() => handleEdit(cycle)}
  >
    Edit
  </CButton>

  <CButton
    size="sm"
    color="secondary"
    onClick={() => handleUpdateStatus(cycle)}
  >
    Update Status
  </CButton>
</CTableDataCell>

                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      {/* Create Modal */}
      <CreateReproductionCycleModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        formData={createFormData}
        setFormData={setCreateFormData}
        onSubmit={handleCreateSubmit}
        mode={isEdit ? 'edit' : 'create'}
      />

      {/* History Modal */}
      <HistoryModal
        visible={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        historyData={historyData}
        selectedAnimalId={selectedAnimalId}
      />
      <StatusUpdateModal
  visible={showStatusModal}
  onClose={() => setShowStatusModal(false)}
  formData={statusFormData}
  setFormData={setStatusFormData}
  onSubmit={handleStatusSubmit}
/>
    </>
  );
};

export default ReproductionCycleList;