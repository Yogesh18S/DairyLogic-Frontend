import {
  CButton,
  CForm,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import agentlistService from '../../services/agentlistService'
import pickupOrderService from '../../services/pickupOrderService'

const AssignModal = ({ pickupRequestId, visible, onClose }) => {
  const [agents, setAgents] = useState([])
  const [selectAgent, setSelectedAgent] = useState(null)

  const fetchData = async () => {
    try {
      //Todo : PaginatedAgent service used to instead to be used Seperate api to get all agent for corresponding franchise only
      const response = await agentlistService.getagentslist(1, 100)
      setAgents(response.data.result)
    } catch (error) {
      console.log('Unable to Get Agents List', error)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const agentUserId = selectAgent
      await pickupOrderService.scheduleRequest(pickupRequestId, agentUserId)

      onClose()
    } catch (error) {
      console.log('unable to assign agent, please try again later', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Assign Agent</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSave}>
          <CFormSelect
            value={selectAgent}
            onChange={(e) => {
              setSelectedAgent(e.target.value.trim())
            }}
          >
            <option>Select Agent</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.firstName}
              </option>
            ))}
          </CFormSelect>
          <CModalFooter>
            <CButton className="btn btn-primary" type="submit">
              Save
            </CButton>
            <CButton className="btn btn-danger" onClick={onClose}>
              Cancel
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default AssignModal
