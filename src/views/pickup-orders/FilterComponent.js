import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow
} from '@coreui/react'
import { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'

  const FilterComponent = ({ fetchData,customerId}) => {
  const [status, setStatus] = useState([])
  const [filters, setFilters] = useState({
    agentId:'',
    customerId:'',
    pickupStatusId: '',
    search: '',
    fromDate: '',
    toDate: '',
  })

  const formattedDate = (date) => {
    if (!date) return undefined;
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
};


  useEffect(() => {
    axiosInstance
      .get(`/CommonLookup/GetPickupStatuses`)
      .then((response) => {
        setStatus(response.data.result)
      })
      .catch((error) => {
        console.log('Cannot fetch Status', error)
        setStatus([])
      })
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      customerId:customerId || '',
      [name]: value,
    }))
  }

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    let filtersToSend = {};

    if (filters.fromDate) {
        filtersToSend["fromDate"] = formattedDate(filters.fromDate); // Convert date format
    }

    if (filters.toDate) {
        filtersToSend["toDate"] = formattedDate(filters.toDate); // Convert date format
        console.log(filters)
    }

    if (filters.agentId) filtersToSend.agentId = filters.agentId;
    if (filters.customerId) filtersToSend.customerId = customerId
    if (filters.pickupStatusId) filtersToSend.pickupStatusId = filters.pickupStatusId;
    if (filters.searchText) filtersToSend.searchText = filters.searchText;
    console.log(filters)

    fetchData(filtersToSend); // Fetch data with correct filter
};


  const handleClearFilters = (e) => {
    e.preventDefault()
    setFilters({
      agentId:'',
      customerId: customerId || '',
      pickupStatusId: '',
      searchText: '',
      fromDate: '',
      toDate: '',
    })
    fetchData({})
  }

  return (
    <CRow>
      <CCol xs={12}>
            <CForm onSubmit={handleFilterSubmit}>
              <CRow>
                {/* Pickup Status Dropdown */}
                <CCol xs={6} md={4} lg={3}>
                  <CFormSelect
                    name="pickupStatusId"
                    placeholder="Status"
                    value={filters.pickupStatusId}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Pickup Status</option>
                    {status.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>

                {/* Phone Number */}
                <CCol xs={6} md={4} lg={3}>
                  <CFormInput
                    type="text"
                    name="searchText"
                    placeholder="Search"
                    value={filters.searchText}
                    onChange={handleFilterChange}
                  />
                </CCol>

                {/* Created Date From */}
                <CCol xs={6} md={4} lg={2}>
                  <CFormInput
                    type="date"
                    name="fromDate"
                    value={filters.fromDate}
                    onChange={handleFilterChange}
                  />
                </CCol>

                {/* Created Date To */}
                <CCol xs={6} md={4} lg={2}>
                  <CFormInput
                    type="date"
                    name="toDate"
                    value={filters.toDate}
                    onChange={handleFilterChange}
                  />
                </CCol>

                {/* Filter & Clear Buttons */}
                <CCol xs={4} md={3} lg={2}>
                  <CButton type="submit" color="primary" className="me-2">
                    Filter
                  </CButton>
                  <CButton type="button" color="secondary" onClick={handleClearFilters}>
                    Clear
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
      </CCol>
    </CRow>
  )
}

export default FilterComponent