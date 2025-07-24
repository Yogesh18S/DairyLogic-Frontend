import { CCard, CCardBody, CCardLink, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';
import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FranchiseContext } from '../../context/FranchiseContext';

const AppFranchiseCard = ({data}) => {
  const navigate = useNavigate()
  
  const { selectFranchise } = useContext(FranchiseContext);

  const handleSelect = (id, name) => {
    selectFranchise(id, name);
    navigate('/dashboard');
  };


  return (
    <CRow sm={12}>
      {data.map((franchise) => (
        <CCol key={franchise.id} sm={3}>
          <CCard style={{ width: '16 rem' }}>
            <CCardBody>
              <Fragment>
                <CCardTitle>
                  <strong> Owner Name : </strong> {franchise.name}
                </CCardTitle>
                <CCardText>
                  <strong>Location : </strong>
                  {franchise.address}
                </CCardText>
                <CCardLink onClick={() => handleSelect(franchise.id, franchise.name)}>
                  Select
                </CCardLink>
              </Fragment>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

export default AppFranchiseCard
