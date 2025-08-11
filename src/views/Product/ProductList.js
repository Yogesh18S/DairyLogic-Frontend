// src/pages/Product/ProductList.js
import React, { useEffect, useState } from "react"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CAlert,
  CAlertHeading,
} from "@coreui/react"

import { ITEMS_PER_PAGE } from "../../constants/globalConstants"
import AppPaginatedTable from "../../components/table/AppPaginatedTable"
import AppLoadingSpinner from "../../components/AppLoadingSpinner"
import productService from "../../services/productService"
import ProductModal from "./ProductModal"

const ProductList = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    unit: "",
    basePrice: "",
  })



  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await productService.getPaginatedProducts(currentPage, ITEMS_PER_PAGE)
      const products = response.data.result || []
      setData(products)
      setTotalRecords(response.data.pagedListMetadata?.totalRecords || 0)
    } catch (error) {
      console.error("API error:", error)
      setError("Failed to fetch products. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      unit: "",
      basePrice: "",
    })
    setEditMode(false)
    setModalVisible(true)
  }

  const handleEdit = (id) => {
    console.log(id)
    const product = data.find((p) => p.id === id)
    console.log(product)
    if (product) {
      setFormData(product)
      setEditMode(true)
      setModalVisible(true)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      await productService.deleteProduct(id)
      fetchData()
    } catch (err) {
      console.error("Delete error:", err)
      setError("Failed to delete product.")
    }
  }

  const handleSave = async () => {
    try {
      if (editMode) {
        await productService.updateProduct(formData.id, formData)
      } else {
        await productService.createProduct(formData)
      }
      setModalVisible(false)
      fetchData()
    } catch (err) {
      console.error("Save error:", err)
      setError("Failed to save product.")
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  if (loading) return <AppLoadingSpinner />

  return (
    <CRow>
      <CCol xs={12}>
        {error && (
          <CAlert color="danger" dismissible>
            <CAlertHeading as="h4">Error</CAlertHeading>
            <p>{error}</p>
          </CAlert>
        )}

        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Products</strong>
            <CButton color="primary" onClick={handleCreate}>
              Create Product
            </CButton>
          </CCardHeader>
          <CCardBody>
            <AppPaginatedTable
              columns={[
                { label: "Name", accessor: "name" },
                { label: "Description", accessor: "description" },
                { label: "Unit", accessor: "unit" },
                { label: "Base Price", accessor: "basePrice" },
              ]}
              data={data}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalRecords={totalRecords}
              onPageChange={setCurrentPage}
              actionButtons={[
                { label: "Edit", onClick: handleEdit },
                { label: "Delete", onClick: handleDelete },
              ]}
            />
          </CCardBody>
        </CCard>

        <ProductModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
          editMode={editMode}
        />
      </CCol>
    </CRow>
  )
}

export default ProductList
