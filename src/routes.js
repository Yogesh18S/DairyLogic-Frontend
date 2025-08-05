import React from 'react'
import { ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME } from './constants/globalConstants.js'
import { element } from 'prop-types'
import react from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Animal = React.lazy(()=>import('./views/Animal/AnimalList.js'))
const Customer = React.lazy(()=>import('./views/Customer/CustomerList.js'))
const Driver = React.lazy(()=>import('./views/Driver/DriverList.js'))
const Route = React.lazy(()=>import('./views/Route/RouteList.js'))
const Vehicle = React.lazy(()=>import('./views/vehicle/VehicleList.js'))
const DeliveryDetails = React.lazy(()=>import('./views/DeliveryDetails/DeliveryDetailsList.js'))
const DriverDetails = React.lazy(()=>import('./views/DriverDetails/DriverDetailsList.js'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
   {path:'/animal-list',name:'Animal', element:Animal},
  { path:'/Customer',name:'Customer', element:Customer},
  { path:'/driver',name:'Driver', element:Driver},
  { path:'/route',name:'Route', element:Route},
  {path:'/vehicle',name:'Vehicle',element:Vehicle},
  {path:'/deliveryDetails',name:'DeliveryDetails',element:DeliveryDetails},
  {path:'/driver-detail',name:'DriverDetails',element:DriverDetails}
]

export default routes
