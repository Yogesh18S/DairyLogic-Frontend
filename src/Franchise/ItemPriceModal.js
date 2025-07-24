import { CButton, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';
import { useState } from 'react';

const ItemPriceModal = ({visible, onSave, onClose, formData, setFormData, editMode}) => {
    const [validated,setValidated] = useState(false)
  
    const handleSubmit = (event) => {
      event.preventDefault()
  
      const form = event.currentTarget
  
      if (!form.checkValidity()) {
        event.stopPropagation()
        setValidated(true)
        return
      }
      setValidated(true)
      onSave()
    };

    const handleChange = (e)=>{
      const {name, value} = e.target
      setFormData((prevState)=> ({...prevState, [name] : value}))
    }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{editMode ? 'Edit Price' : 'Set Custom Price'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-2"
        >
          <div>
            <CFormLabel>Scrap Name</CFormLabel>
            <CFormInput
              name="scrapName"
              value={formData.scrapName}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div>
            <CFormLabel>Update Price</CFormLabel>
            <CFormInput
              name="customPrice"
              value={formData.customPrice}
              onChange={handleChange}
              type="text"
              required
              feedbackInvalid= "enter a price"
            />
          </div>

          <div className="d-flex gap-2 flex-row-reverse mt-2">
            <CButton color="secondary" onClick={onClose}>
              Cancel
            </CButton>
            <CButton color="primary" type="submit">
              Save
            </CButton>
          </div>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default ItemPriceModal