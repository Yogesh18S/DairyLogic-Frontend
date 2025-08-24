// import React, { createContext, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FRANCHISE_ID_LS_KEY, FRANCHISE_NAME } from '../constants/globalConstants';
// import { getUserRole } from '../helper/getUserRole';

// export const FranchiseContext = createContext(null);

// export const FranchiseProvider = ({ children }) => {
//     const navigate = useNavigate()
//     const location = useLocation()

//     const [franchise, setFranchise] = useState({
//         id: localStorage.getItem(FRANCHISE_ID_LS_KEY) || null,
//         name: localStorage.getItem(FRANCHISE_NAME) || "none",
//       });
    
//       useEffect(() => {
//           const handleFranchiseLogic = async () => {
//           const userDetails = getUserRole();
//           const roles = userDetails.roles;
    
//           const isAdmin = roles.includes('Admin');
    
//           if (isAdmin) {
//             const missingFranchise =
//               !franchise.id || franchise.id === null || !franchise.name || franchise.name === 'none';
    
//             if (missingFranchise && location.pathname!=='/change-franchise') {
//               navigate('/change-franchise');
//             }
//           }
//         };
    
//         handleFranchiseLogic();
//       }, [navigate]);
    
//       const selectFranchise = (id, name) => {
//         setFranchise({ id, name });
//         localStorage.setItem(FRANCHISE_ID_LS_KEY,id);
//         localStorage.setItem(FRANCHISE_NAME, name);
//         navigate('/dashboard');  // Redirect to dashboard after selecting a franchise
//       };
    
//   return (
//     <FranchiseContext.Provider value={{ franchise, selectFranchise }}>
//       {children}
//     </FranchiseContext.Provider>
//   );
// };
