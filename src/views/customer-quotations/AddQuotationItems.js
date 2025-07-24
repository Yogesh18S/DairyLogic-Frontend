import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import scrapCategoryService from '../../services/scrapCategoryService'
import ScrapItemService from '../../services/scrapItemService'

const AddQuotationItems = ({ onItemsChange }) => {
  const [quotationItems, setQuotationItems] = useState([])
  const [scrapItems, setScrapItems] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [selectedScrapItemId, setSelectedScrapItemId] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState('')
  const [unitPrice, setUnitPrice] = useState('')

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchScrapCategory = async () => {
      try {
        const response = await scrapCategoryService.getScrapCategory()
        setCategories(response.data.result)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchScrapCategory()
  }, [])

  // Fetch scrap items when category is selected
  useEffect(() => {
    const fetchScrapItems = async () => {
      try {
        if (!selectedCategoryId) return
        const response = await ScrapItemService.getScrapItemsByCategoryId(selectedCategoryId)
        setScrapItems(response.data.result)
      } catch (error) {
        console.error('Error fetching scrap items:', error)
      }
    }

    if (selectedCategoryId) {
      setScrapItems([]) // Clear old items before fetching
      fetchScrapItems()
    }
  }, [selectedCategoryId])

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value)
    setSelectedScrapItemId('') // Reset selected scrap item
  }

  const handleAddItem = () => {
    if (!selectedCategoryId || !selectedScrapItemId || !selectedQuantity) {
      alert('Please select a category, scrap item, and enter a quantity.')
      return
    }

    const selectedCategory = categories.find((cat) => cat.id === Number(selectedCategoryId))
    const selectedScrapItem = scrapItems.find((item) => item.id === Number(selectedScrapItemId))

    const newItem = {
      categoryId: selectedCategoryId,
      categoryName: selectedCategory?.name || 'Unknown Category',
      scrapItemId: selectedScrapItemId,
      scrapItemName: selectedScrapItem?.name || 'Unknown Item',
      measuringUnit: selectedScrapItem?.measuringUnit || '',
      scrapQuantity: selectedQuantity,
      scrapUnitPrice: unitPrice
    }

    const updatedItems = [...quotationItems, newItem]
    setQuotationItems(updatedItems)
    onItemsChange(updatedItems)

    // Clear input fields
    setSelectedScrapItemId('')
    setSelectedQuantity('')
    setUnitPrice('')
  }

  const handleScrapItemChange = (e) => {
    const itemId = e.target.value;
    setSelectedScrapItemId(itemId);
  
    const selectedItem = scrapItems.find((item) => item.id === Number(itemId));
    setUnitPrice(''); // Clear any previously entered price
  };

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Quotation Items</strong> <small>Add scrap items</small>
      </CCardHeader>
      <CCardBody>
        <CTable bordered>
          <CTableBody>
            {/* Input Row for Adding New Items */}
            <CTableRow xs={12}>
              <CTableDataCell >
                <CFormSelect value={selectedCategoryId} onChange={handleCategoryChange}>
                  <option value="">Select Scrap Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id} type='number'>
                      {category.name}
                    </option>
                  ))}
                </CFormSelect>
              </CTableDataCell>
              <CTableDataCell >
                <CFormSelect
                  value={selectedScrapItemId}
                  onChange={(e) => setSelectedScrapItemId(e.target.value)}
                  disabled={scrapItems.length === 0}
                >
                  <option value="">Select Scrap Item</option>
                  {scrapItems.map((item) => (
                    <option key={item.id} value={item.id} type='number'>
                      {item.name} (Unit: {item.measuringUnit})
                    </option>
                  ))}
                </CFormSelect>
              </CTableDataCell>
              <CTableDataCell >
                <CFormInput
                  type="text"
                  placeholder="Enter Quantity"
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  feedbackInvalid="Enter Quantity"
                  required
                />
              </CTableDataCell>
              <CTableDataCell >
                <CFormInput
                  type="text"
                  placeholder={
                    selectedScrapItemId
                      ? `Item Price: ${scrapItems.find((item) => item.id === Number(selectedScrapItemId))?.price || 'N/A'}`
                      : "Enter Price"
                  }
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  feedbackInvalid="Please Enter Price"
                  required
                />
              </CTableDataCell>
              <CTableDataCell lg={3}>
                <CButton color="primary" onClick={handleAddItem}>
                  Add Item
                </CButton>
              </CTableDataCell>
            </CTableRow>

            {/* Rows for Existing Items */}
            {quotationItems.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.categoryName}</CTableDataCell>
                <CTableDataCell>{item.scrapItemName}</CTableDataCell>
                <CTableDataCell>
                  {item.scrapQuantity}
                </CTableDataCell>
                <CTableDataCell>
                {item.scrapUnitPrice}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    onClick={() => {
                      const updatedQuotationItems = quotationItems.filter((_, idx) => idx !== index)
                      setQuotationItems(updatedQuotationItems)
                      onItemsChange(updatedQuotationItems)
                    }}
                  >
                    Remove
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default AddQuotationItems