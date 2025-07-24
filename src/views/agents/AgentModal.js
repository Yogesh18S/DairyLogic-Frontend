import {
    CButton,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CModal,
    CModalBody,
    CModalHeader, CModalTitle
} from "@coreui/react";

const AgentModal = ({ visible, onClose, onSave, formData, setFormData, editMode,franchiseData }) => {

    // Handle Form Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>{editMode ? "Edit Agent" : "Create New Agent"}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    <div className="d-flex gap-2">
                        <div className="w-50">
                            <CFormLabel>First Name</CFormLabel>
                            <CFormInput name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="w-50">
                            <CFormLabel>Last Name</CFormLabel>
                            <CFormInput name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Email</CFormLabel>
                        <CFormInput name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Phone Number</CFormLabel>
                        <CFormInput name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}  type="text" />
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Franchise</CFormLabel>
                        <CFormSelect name="franchiseId" value={formData.franchiseId} onChange={handleChange}>
                            <option value=''>Select Franchise</option>
                            {franchiseData.map((franchise)=>(
                                <option key={franchise.id} value={franchise.id} type="text">{franchise.name}</option>
                            ))}
                        </CFormSelect>
                    </div>
                </CForm>
                <div className="d-flex justify-content-end gap-2">
                <CButton color="secondary" onClick={onClose}>Cancel</CButton>
                <CButton color="primary" onClick={onSave}>Save</CButton>
            </div>
            </CModalBody>
            
        </CModal>
    );
};

export default AgentModal;