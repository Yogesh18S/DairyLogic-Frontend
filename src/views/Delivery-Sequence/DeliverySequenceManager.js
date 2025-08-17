import { useEffect, useState } from 'react'
import { CButton, CFormSelect, CCard, CCardBody, CCardHeader, CAlert } from '@coreui/react'
import routeService from '../../services/routeService'
import customerService from '../../services/customerDetailsService'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const DeliverySequenceManager = () => {
  const [routes, setRoutes] = useState([])
  const [selectedRouteId, setSelectedRouteId] = useState('')
  const [customers, setCustomers] = useState([])
  const [draggedCustomerIndex, setDraggedCustomerIndex] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchRoutes()
  }, [])

  const fetchRoutes = async () => {
    try {
      const response = await routeService.getAllRouteList()
      if (response.data && Array.isArray(response.data.result)) {
        setRoutes(response.data.result)
      } else {
        setRoutes([])
      }
    } catch (error) {
      console.error('Failed to fetch routes', error)
    }
  }

  const fetchCustomers = async (routeId) => {
    try {
      const response = await customerService.getCustomersByRoute(routeId)
      const sortedCustomers = response.data.sort((a, b) => a.deliveryOrder - b.deliveryOrder)
      setCustomers(sortedCustomers)
    } catch (error) {
      console.error('Failed to fetch customers', error)
    }
  }

  const handleDragStart = (index) => {
    setDraggedCustomerIndex(index)
  }

  const handleDragEnter = (index) => {
    if (draggedCustomerIndex === null || draggedCustomerIndex === index) return

    const updatedList = [...customers]
    const draggedItem = updatedList[draggedCustomerIndex]

    // Remove the dragged item
    updatedList.splice(draggedCustomerIndex, 1)
    // Insert it at new position
    updatedList.splice(index, 0, draggedItem)

    // Update DeliveryOrder based on new position
    const reOrderedList = updatedList.map((item, idx) => ({
      ...item,
      deliveryOrder: idx + 1,
    }))

    setCustomers(reOrderedList)
    setDraggedCustomerIndex(index)
  }

  const handleSave = async () => {
    try {
      const updatedSequence = customers.map((customer) => ({
        id: customer.id,
        deliveryOrder: customer.deliveryOrder,
      }))
      await customerService.updateDeliveryOrder(updatedSequence)
      setSuccessMessage('Delivery sequence updated successfully.')
      setErrorMessage('')
    } catch (error) {
      console.error('Failed to update delivery order', error)
      setErrorMessage('Failed to update delivery order.')
      setSuccessMessage('')
    }
  }
  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(customers)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update delivery order numbers
    const updatedList = items.map((item, index) => ({
      ...item,
      deliveryOrder: index + 1,
    }))

    setCustomers(updatedList)
  }

  return (
    <>
      {successMessage && <CAlert color="success">{successMessage}</CAlert>}
      {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}

      <CCard>
        <CCardHeader>Select Route</CCardHeader>
        <CCardBody>
          <CFormSelect
            size="sm"
            className="w-50"
            onChange={(e) => {
              setSelectedRouteId(e.target.value)
              fetchCustomers(e.target.value)
            }}
            value={selectedRouteId}
          >
            <option value="">Select Route</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </CFormSelect>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="customers">
              {(provided) => (
                <ul
                  className="list-group mt-3"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {customers.map((customer, index) => (
                    <Draggable key={customer.id} draggableId={customer.id.toString()} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>
                            #{customer.deliveryOrder} - {customer.customerName}
                          </span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>

          <CButton className="mt-3" color="primary" onClick={handleSave}>
            Save Delivery Sequence
          </CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

export default DeliverySequenceManager
