/* eslint-disable prettier/prettier */
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
  CTableRow
} from '@coreui/react'
import { useEffect, useState } from 'react'
import driverDetailsService from '../../services/driverDetailsService'
import productService from '../../services/productService'

// eslint-disable-next-line react/prop-types
const AddItems = ({ customerId, onPayloadChange }) => {
  const [items, setItems] = useState([])
  const [drivers, setDrivers] = useState([])
  const [products, setProducts] = useState([])
  const [selectedDriverId, setSelectedDriverId] = useState('')
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await driverDetailsService.getAllDrivers()
        
        setDrivers(response.data.result)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchDrivers()
  }, [customerId])

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!selectedDriverId) return
        const response = await productService.getAllProductList()
        setProducts(response.data.result)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    if (selectedDriverId) {
      setProducts([])
      fetchProducts()
    }
  }, [selectedDriverId])

  // Handle product selection to populate default price and unit
  const handleProductSelection = (productId) => {
    setSelectedProductId(productId)
    
    if (productId) {
      const selectedProduct = products.find((p) => p.id === Number(productId))
      if (selectedProduct) {
        setPrice(selectedProduct.basePrice || '')
        setUnit(selectedProduct.unit || '')
      }
    } else {
      setPrice('')
      setUnit('')
    }
  }

  const handleAddItem = () => {
    if (!selectedProductId || !quantity || !price) {
      alert('Please select product, enter quantity and price.')
      return
    }

    const selectedProduct = products.find((p) => p.id === Number(selectedProductId))

    const newItem = {
      productId: Number(selectedProductId),
      quantity: Number(quantity),
      price: Number(price),
      unit: unit,
      productName: selectedProduct?.name || 'Unknown'
    }

    const updatedItems = [...items, newItem]
    setItems(updatedItems)

    // Build payload
    const totalPrice = updatedItems.reduce((sum, i) => sum + i.quantity * i.price, 0)
    const payload = {
      customerId,
      totalPrice,
      deliveryDate: deliveryDate ? new Date(deliveryDate).toISOString() : null,
      paid: 0,
      items: updatedItems.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price
      }))
    }

    onPayloadChange(payload)

    // Clear inputs
    setSelectedProductId('')
    setQuantity('')
    setPrice('')
    setUnit('')
  }

  return (
    <>
    <CCard>
      <CCardHeader><strong>Special Request Items</strong></CCardHeader>
        <CCardBody>
          <div className="d-flex gap-2 mb-3">
            <CFormInput
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
            <CFormSelect
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
              >
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>{driver.firstName} {driver.lastName}</option>
              ))}
            </CFormSelect>
            </div>
        

        <CTable bordered>
          <CTableBody>
            <CTableRow xs={12}>

            <CTableDataCell>
              <CFormSelect
                value={selectedProductId}
                onChange={(e) => handleProductSelection(e.target.value)}
                disabled={!products.length}
                >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </CFormSelect>
            </CTableDataCell>

            <CTableDataCell>
              <CFormInput
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
            </CTableDataCell>
            
            <CTableDataCell>
              <div className="d-flex align-items-center gap-2">
                <CFormInput
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ flex: 1 }}
                />
                {unit && (
                  <span className="text-muted small">({unit})</span>
                )}
              </div>
            </CTableDataCell>

            <CTableDataCell>
              <CButton color="primary" onClick={handleAddItem}>Add Item</CButton>
            </CTableDataCell>
            </CTableRow>
         
       
    
        {/* Show added items */}
        
            {items.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.productName}</CTableDataCell>
                <CTableDataCell>{item.quantity}</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex align-items-center gap-2">
                    <span>{item.price}</span>
                    {item.unit && (
                      <span className="text-muted small">({item.unit})</span>
                    )}
                  </div>
                </CTableDataCell>
                <CTableDataCell>{item.quantity * item.price}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    onClick={() => {
                      const updated = items.filter((_, i) => i !== index)
                      setItems(updated)
                      const totalPrice = updated.reduce((sum, i) => sum + i.quantity * i.price, 0)
                      onPayloadChange({
                        customerId,
                        totalPrice,
                        deliveryDate: deliveryDate ? new Date(deliveryDate).toISOString() : null,
                        paid: 0,
                        items: updated
                      })
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
  </>
  )
}

export default AddItems;