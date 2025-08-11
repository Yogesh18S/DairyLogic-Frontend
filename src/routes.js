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
const DeliverySequence=React.lazy(()=>import('./views/Delivery-Sequence/DeliverySequenceManager.js'))
const DailyVehicleLoaded = React.lazy(()=>import('./views/DailyVehicleLoad/dailyVehicleLoadedList.js'))
const Product = React.lazy(()=>import('./views/Product/ProductList.js'))
const CreateCustomer = React.lazy(()=>import('./views/Customer/CreateCustomer.js'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
   {path:'/animal-list',name:'Animal', element:Animal},
  { path:'/Customer',name:'Customer', element:Customer},
  { path:'/driver',name:'Driver', element:Driver},
  { path:'/route',name:'Route', element:Route},
  {path:'/vehicle',name:'Vehicle',element:Vehicle},
  {path:'/delivery-details',name:'Delivery Details',element:DeliveryDetails},
  {path:'/driver-detail',name:'Driver Details',element:DriverDetails},
  {path:'/delivery-sequence',name:'Delivery Sequence',element:DeliverySequence},
  {path:'/daily-vehicle-load',name:'Daily Vehicle Load',element:DailyVehicleLoaded},
  {path:'/product',name:'Product',element:Product},
  {path:'/create-customer',name:'Create Customer',element:CreateCustomer}
]

export default routes
