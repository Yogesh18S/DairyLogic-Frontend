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
import { useEffect, useState } from 'react'
import driverDetailsService from '../../services/driverDetailsService'
import productService from '../../services/productService'

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
  const [requestDate, setRequestDate] = useState('')

  // Fetch drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await driverDetailsService.getAllDrivers()
        setDrivers(response.data.result)
      } catch (error) {
        console.error('Error fetching drivers:', error)
      }
    }
    fetchDrivers()
  }, [])

  // Fetch products
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

  // Handle product selection
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

  // Handle add item
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
      productName: selectedProduct?.name || 'Unknown',
    }

    const updated = [...items, newItem]
    setItems(updated)
  }

  // Whenever items, driver, date, or customerId changes — update payload to parent
  useEffect(() => {
    const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0)

    const payload = {
      customerId,
      totalPrice,
      driverId: selectedDriverId ? Number(selectedDriverId) : 0,
      requestDate: requestDate ? new Date(requestDate).toISOString().split('T')[0] : null,
      paid: 0,
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
      })),
    }

    console.log('📤 Sending Payload to Parent:', payload)
    onPayloadChange(payload)
  }, [items, selectedDriverId, requestDate, customerId])

  return (
    <CCard>
      <CCardHeader>
        <strong>Special Request Items</strong>
      </CCardHeader>
      <CCardBody>
        <div className="d-flex gap-2 mb-3">
          <CFormInput
            type="date"
            value={requestDate}
            onChange={(e) => setRequestDate(e.target.value)}
          />
          <CFormSelect
            value={selectedDriverId}
            onChange={(e) => setSelectedDriverId(e.target.value)}
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.firstName} {driver.lastName}
              </option>
            ))}
          </CFormSelect>
        </div>

        <CTable bordered>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>
                <CFormSelect
                  value={selectedProductId}
                  onChange={(e) => handleProductSelection(e.target.value)}
                  disabled={!products.length}
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
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
                  {unit && <span className="text-muted small">({unit})</span>}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <CButton color="primary" onClick={handleAddItem}>
                  Add Item
                </CButton>
              </CTableDataCell>
            </CTableRow>

            {items.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.productName}</CTableDataCell>
                <CTableDataCell>{item.quantity}</CTableDataCell>
                <CTableDataCell>
                  {item.price} {item.unit && <span className="text-muted small">({item.unit})</span>}
                </CTableDataCell>
                <CTableDataCell>{item.quantity * item.price}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    onClick={() => {
                      const updated = items.filter((_, i) => i !== index)
                      setItems(updated)
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

export default AddItems