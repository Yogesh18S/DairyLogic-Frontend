import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import PrivateRoute from './PrivateRoute'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={
                  route.allowedRoles == null || route.allowedRoles.length === 0 ? (
                    <route.element />
                  ) : (
                    <PrivateRoute element={route.element} allowedRoles={route.allowedRoles} />
                  )
                }
              />
            )
          ))}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          {/* <Route path="/" element={<PrivateRoute element={() => <Navigate to="dashboard" replace />} roles={["admin"]} />} /> */}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)