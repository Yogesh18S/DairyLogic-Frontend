import React from 'react'
import { ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME } from './constants/globalConstants.js'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ScrapCategoriesList = React.lazy(() => import('./views/scrap-categories/ScrapCategories'))
const ScrapItems = React.lazy(() => import('./views/scrap-items/ScrapItems'))
const PickupOrdersList = React.lazy(() => import('./views/pickup-orders/PickupOrdersList'))
const OrderDetails = React.lazy(() => import('./views/pickup-orders/PickupOrderDetails.js'))
const FranchiseList = React.lazy(() => import('./Franchise/FranchiseList'))
const Agents = React.lazy(() => import('./views/agents/AgentList.js'))
const Customers = React.lazy(() => import('./views/customers/Customers.js'))
const CustomerDetails = React.lazy(() => import('./views/customers/customerDetails.js'))
const ChangeFranchise = React.lazy(() => import('./views/franchiseCard/ChangeFranchise.js'))
const CustomerQuotation = React.lazy(() => import('./views/customer-quotations/CustomerQuotations.js'))
const CreateCustomerQuotation = React.lazy(() => import('./views/customer-quotations/CreateCustomerQuotation'))
const CustomerQuotationDetails = React.lazy(()=> import('./views/customer-quotations/CustomerQuotationDetails.js'))
const UserManagementList = React.lazy(()=> import('./views/users-management/UsersList.js'))
const FranchiseItemList = React.lazy(()=> import('./Franchise/FranchiseItemsList.js'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {
    path: '/scrap-categories',
    name: 'ScrapCategoriesList',
    element: ScrapCategoriesList,
    allowedRoles: [ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME],
  },
  {
    path: '/scrap-items',
    name: 'Scrap Items',
    element: ScrapItems,
    allowedRoles: [ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME],
  },
  {
    path: '/pickup-orders',
    name: 'Pickup Orders',
    element: PickupOrdersList,
    allowedRoles: [ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME],
  },
  {
    path: '/pickup-orders/:id',
    name: 'Order Details',
    element: OrderDetails,
    allowedRoles: [ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME],
  },
  {
    path: '/franchise-list',
    name: 'Franchise',
    element: FranchiseList,
    allowedRoles: [ADMIN_ROLE_NAME],
  },
  {
    path: '/agents',
    name: 'Agents',
    element: Agents,
    allowedRoles: [ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME],
  },
  {
    path: '/customers',
    name: 'Customers',
    element: Customers,
    allowedRoles: [ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME],
  },
  {
    path: '/customers/:id',
    name: 'Customer Detail',
    element: CustomerDetails,
    allowedRoles: [ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME],
  },
  {
    path: '/change-franchise',
    name: 'Change Franchise',
    element: ChangeFranchise,
    allowedRoles: [ADMIN_ROLE_NAME],
  },
  {
    path: '/customer-quotations',
    name: 'Customer Quotation',
    element: CustomerQuotation,
    allowedRoles: [ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME],
  },
  {
    path: '/customer-quotations/create',
    name: 'Create Customer Quotation',
    element: CreateCustomerQuotation,
    allowedRoles: [ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME],
  },
  {
    path: '/customer-quotations/:id',
    name: 'Customer Quotation Details',
    element: CustomerQuotationDetails,
    allowedRoles: [ADMIN_ROLE_NAME, FRANCHISE_ADMIN_ROLE_NAME],
  },
  {
    path: '/users-management',
    name: ' Users Management',
    element: UserManagementList,
    allowedRoles: [ADMIN_ROLE_NAME]
  },
  {
    path: '/franchise-items',
    name: 'Franchise Items',
    element: FranchiseItemList,
    allowedRoles: [ADMIN_ROLE_NAME]
  }
]

export default routes
