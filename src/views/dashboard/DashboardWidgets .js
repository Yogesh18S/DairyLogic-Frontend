import{
    CCard, 
    CCardHeader, 
    CCardBody, 
    CTable, 
    CTableHead, 
    CTableRow, 
    CTableHeaderCell,
    CTableBody, 
    CTableDataCell,
    CButton } 
    from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import dashboardService from '../../services/dashboardService'
const DashboardWidgets = () => {

  const [animalTrackerData, setAnimalTrackerData] = useState([])
  const [specialRequests, setSpecialRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

    useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        const [animalRes, specialRes] = await Promise.all([
          dashboardService.getAnimalTracker(),
          dashboardService.getSpecialRequests(),
        ])

        setAnimalTrackerData(animalRes.data?.result || [])
        setSpecialRequests(specialRes.data?.result  || [])
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

    const navigate = useNavigate()

    const handleCreateNew = () => {
      navigate('/special-request')
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 ">
      <CCard className="bg-dark text-white shadow-md rounded-2xl">
        <CCardHeader className="text-lg font-semibold border-b border-gray-700">
          Animal Tracker
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Next Check Date</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {animalTrackerData.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={3} className="text-center text-gray-400">
                    No records found
                  </CTableDataCell>
                </CTableRow>
              ) : (
                animalTrackerData.map((a, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{a.name}</CTableDataCell>
                    <CTableDataCell>{a.nextCheckDate}</CTableDataCell>
                    <CTableDataCell>{a.status}</CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Special Requested Card */}
      <div className="mt-4">
      <CCard className="bg-dark text-white shadow-md rounded-2xl">
        <CCardHeader className="text-lg font-semibold border-b border-gray-700">
          Special Requested
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Customer</CTableHeaderCell>
                <CTableHeaderCell>Address</CTableHeaderCell>
                <CTableHeaderCell>Request Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {specialRequests.map((req, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{req.name}</CTableDataCell>
                  <CTableDataCell>{req.address}</CTableDataCell>
                  <CTableDataCell>{req.requestDate}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <div className="flex justify-center mt-4">
            <CButton color="primary" className="rounded-lg" onClick={handleCreateNew}>
              Show More
            </CButton>
          </div>
        </CCardBody>
      </CCard>
      </div>
    </div>
  )
}

export default DashboardWidgets