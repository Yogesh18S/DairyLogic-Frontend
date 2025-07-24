import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
} from '@coreui/react'
import { useState } from 'react'

const CreateUserModal = ({
  formData,
  setFormData,
  onSave,
  visible,
  onClose,
  FranchiseId,
  FranchiseName,
  editMode,
  changePassword,
  handlePasswordChange
}) => {
  const [validated, setValidated] = useState(false)
  let [confirmPassword, setConfirmPassword] = useState('') // Separate state
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true) // Validation state

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'userType') {
      if (value === 'Admin') {
        setFormData((prevState) => ({
          ...prevState,
          userType: value,
          franchiseId: null, // Ensure franchiseId is reset
        }))
      } else if (value === 'FranchiseAdmin') {
        setFormData((prevState) => ({
          ...prevState,
          userType: value,
          franchiseId: FranchiseId, // Set correct FranchiseId
        }))
      }
    } else if (name === "isActive") {
      setFormData((prevState) => ({
        ...prevState,
        isActive: value === "true", // Convert string to boolean
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    if (name === 'password') {
      setConfirmPasswordValid((confirmPassword = value))
    }
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    setConfirmPasswordValid(e.target.value === formData.password) // Validate match
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    const finalFormData = { ...formData }
    if (formData.userType === 'Admin') {
      delete finalFormData.franchiseId
    }

    setValidated(true)
    onSave(finalFormData)
  }

  const closeModal = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      userType: '',
      isActive: '',
      franchiseId: null,
    })
    setValidated(false)
    setConfirmPassword('')
    onClose()
  }

 
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader className="d-flex">
        <div className="w-50 d-flex justify-content-between align-items-center">
          <strong>{editMode? "Edit User": "Create Admin or Franchise Admin"}</strong>
          { editMode &&
            <button className="bg-secondary border-0 rounded-2 text-white" onClick={handlePasswordChange}>Change Password </button>
          }
        </div>
      </CModalHeader>
      <CModalBody>
        <CForm
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="d-flex gap-2 flex-column "
        >
          <div className="row g-2">
            <div className="col-6">
              <CFormLabel>First Name</CFormLabel>
              <CFormInput
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                feedbackInvalid="Enter First Name"
              />
            </div>
            <div className="col-6">
              <CFormLabel>Last Name</CFormLabel>
              <CFormInput
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                feedbackInvalid="Enter last Name"
                required
              />
            </div>
          </div>

          <div className="row g-2">
            <div className="col-6">
              <CFormLabel>Role</CFormLabel>
              <CFormSelect
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                feedbackInvalid="Please select a Role"
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="FranchiseAdmin">Franchise Admin</option>
              </CFormSelect>
            </div>
            <div className="col-6">
              <CFormLabel>Selected Franchise</CFormLabel>
              <CFormInput
                name="franchiseName"
                value={formData.userType === 'Admin' ? '' : FranchiseName}
                readOnly
              />
              <input type="hidden" name="franchiseId" value={formData.franchiseId} />
            </div>
          </div>

          <div className="row g-2">
            <div className="col-6">
              <CFormLabel>Status</CFormLabel>
              <CFormSelect
                name="isActive"
                value={formData.isActive}
                onChange={handleChange}
                required
                feedbackInvalid="Please select a Role"
              >
                <option value="">Select Status</option>
                <option value="true">Active</option>
                <option value="false">InActive</option>
              </CFormSelect>
            </div>
            <div className="col-6">
              <CFormLabel>Phone number</CFormLabel>
              <CFormInput
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                feedbackInvalid="Please Enter Phone Number"
              />
            </div>
          </div>

          <div>
            <CFormLabel>Email</CFormLabel>
            <CFormInput
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              feedbackInvalid="Please Enter Email"
            />
          </div>

          { changePassword && 
                <>
              <div>
              <CFormLabel>Password</CFormLabel>
              <CFormInput
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                feedbackInvalid="Please Enter Password"
                />
            </div>
  
            <div>
              <CFormLabel>Confirm Password</CFormLabel>
              <CFormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                invalid={!confirmPasswordValid}
                feedbackInvalid="Please does not match"
                />
            </div>
            </>
          }
          <div className="d-flex justify-content-end gap-2">
            <CButton className="btn btn-primary" type="submit">
              Save
            </CButton>
            <CButton className="btn btn-danger" onClick={closeModal}>
              Cancel
            </CButton>
          </div>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default CreateUserModal
