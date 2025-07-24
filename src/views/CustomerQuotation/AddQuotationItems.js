import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CTable, CTableBody, CTableRow, CTableDataCell, CFormInput, CButton } from '@coreui/react';

const AddQuotationItems = ({ onItemsChange }) => {
  const [quotationItems, setQuotationItems] = useState([]);
  const [inputValues, setInputValues] = useState({
    col1: '',
    col2: '',
    col3: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleAddItem = () => {
    if (inputValues.col1 && inputValues.col2 && inputValues.col3) {
      const newQuotationItems = [
        ...quotationItems,
        {
          col1: inputValues.col1,
          col2: inputValues.col2,
          col3: inputValues.col3
        }
      ];
      setQuotationItems(newQuotationItems);
      setInputValues({ col1: '', col2: '', col3: '' }); // Clear inputs after adding

      // Pass the updated items list to the parent
      onItemsChange(newQuotationItems);
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <strong>Add Quotation Items</strong>
      </CCardHeader>
      <CCardBody>
        <CTable bordered>
          <CTableBody>
            {/* Input Row for Adding New Items */}
            <CTableRow>
              <CTableDataCell>
                <CFormInput
                  value={inputValues.col1}
                  onChange={handleInputChange}
                  name="col1"
                  placeholder="Enter Item 1"
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormInput
                  value={inputValues.col2}
                  onChange={handleInputChange}
                  name="col2"
                  placeholder="Enter Item 2"
                />
              </CTableDataCell>
              <CTableDataCell>
                <CFormInput
                  value={inputValues.col3}
                  onChange={handleInputChange}
                  name="col3"
                  placeholder="Enter Item 3"
                />
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" onClick={handleAddItem}>
                  Add Item
                </CButton>
              </CTableDataCell>
            </CTableRow>

            {/* Rows for Existing Items */}
            {quotationItems.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.col1}</CTableDataCell>
                <CTableDataCell>{item.col2}</CTableDataCell>
                <CTableDataCell>{item.col3}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" onClick={() => {
                    const updatedQuotationItems = quotationItems.filter((_, idx) => idx !== index);
                    setQuotationItems(updatedQuotationItems); // Remove item from state
                    onItemsChange(updatedQuotationItems); // Update parent with removed item
                  }}>
                    Remove
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default AddQuotationItems;