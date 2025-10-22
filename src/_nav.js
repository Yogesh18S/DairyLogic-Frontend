import {
  cilSpeedometer,
  cilUser,
  cilCalendar,
  cilCarAlt,
  cilMap,
  cilArrowCircleRight,
  cilHistory,
  cilTag,
  cilPeople,
  cilDescription,
  cilRecycle,
  cilBug,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import { getUserRole } from './helper/getUserRole'

const fullMenu = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Masters',
  },

  {
    component: CNavItem,
    name: 'Animal',
    to: '/Animal-List',
    icon: <CIcon icon={cilBug} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Vehicle',
    to: '/vehicle',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Route',
    to: '/route',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Product',
    to: '/product',
    icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Driver',
    to: '/driver',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Customers',
    to: '/customer',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Operations',
  },
  {
    component: CNavItem,
    name: 'Daily VehicleLoad',
    to: '/daily-vehicle-load',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Driver Details',
    to: '/driver-detail',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Delivery Sequence',
    to: '/delivery-sequence',
    icon: <CIcon icon={cilArrowCircleRight} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Calendar',
    to: '/person-calendar',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Delivery Details',
    to: '/delivery-details',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Invoice',
    to: '/invoice',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'ReproductionCycle',
    to: '/reproductionCycle',
    icon: <CIcon icon={cilRecycle} customClassName="nav-icon" />,
  },
]

export const getNavItems = () => {
  const userDetails = getUserRole()

  const filteredMenu = fullMenu.filter((item) => {
    if (!item.role) return true // No role restriction
    return item.role.some((role) => userDetails.roles.includes(role))
  })

  return filteredMenu
}
