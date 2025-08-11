import React, { useEffect } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
} from "@coreui/react";

const ProductModal = ({
  visible,
  onClose,
  onSave,
  formData,
  setFormData,
  editMode,
}) => {
  // When modal opens, populate form (on edit)
  useEffect(() => {
    if (visible && editMode && formData) {
      setFormData({
        id: formData.id || "",
        name: formData.name || "",
        description: formData.description || "",
        unit: formData.unit || "",
        basePrice: formData.basePrice || "",
      });
    } else if (visible && !editMode) {
      setFormData({
        id: "",
        name: "",
        description: "",
        unit: "",
        basePrice: "",
      });
    }
  }, [visible, editMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "basePrice" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = () => {
    onSave();
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{editMode ? "Edit" : "Add"} Product</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="name">Name</CFormLabel>
            <CFormInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="description">Description</CFormLabel>
            <CFormInput
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="unit">Unit</CFormLabel>
            <CFormInput
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="basePrice">Base Price</CFormLabel>
            <CFormInput
              id="basePrice"
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
            />
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ProductModal;