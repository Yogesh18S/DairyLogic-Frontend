import {
  CButton,
  CButtonGroup,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const AppTable = ({ columns, data, actionButtons = [] }) => {
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          {columns.map((column) => (
            <CTableHeaderCell key={column.accessor}>{column.label}</CTableHeaderCell>
          ))}

          {actionButtons.length > 0 && <CTableHeaderCell>Actions</CTableHeaderCell>}
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item) => (
          <CTableRow key={item.id}>
            {columns.map((column) => (
              <CTableDataCell key={column.accessor}>{item[column.accessor]}</CTableDataCell>
            ))}
            <CTableDataCell>
              <CButtonGroup size="sm" role="group" aria-label="Small button group">
                {actionButtons.map((action) => (
                  <CButton
                    color={ action.color || "primary"}
                    variant="outline"
                    key={action.label}
                    onClick={() => action.onClick(item.id)}
                  >
                    {action.label}
                  </CButton>
                ))}
              </CButtonGroup>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default AppTable
