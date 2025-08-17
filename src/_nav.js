  import {
  cilDrop,
  cilInbox,
  cilSpeedometer,
  cilTruck,
  cilUser
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import { getUserRole } from './helper/getUserRole'

  const fullMenu = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
    },
    // operations
    {
      component: CNavTitle,
      name: 'Operations',
    
    },
    {
      component: CNavItem,
      name: 'Animal',
      to: '/Animal-List',
      icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
      // role: ['Admin','FranchiseAdmin']
    },
    {
      component: CNavItem,
      name: 'Customers',
      to: '/Customer',
      icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      // role: ['Admin']
    },
  
    {
      component: CNavItem,
      name: 'Driver',
      to:'/driver',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      // role: ['Admin','FranchiseAdmin']
    },
      {
      component: CNavItem,
      name: 'Driver Details',
      to:'/driver-detail',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      // role: ['Admin','FranchiseAdmin']
    },{
            component: CNavItem,
      name: 'Product',
      to:'/product',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
       {
      component: CNavItem,
      name: 'Delivery Sequence',
      to:'/delivery-sequence',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      // role: ['Admin','FranchiseAdmin']
    },
           {
      component: CNavItem,
      name: 'Daily VehicleLoad',
      to:'/daily-vehicle-load',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      // role: ['Admin','FranchiseAdmin']
    },
      {
      component: CNavItem,
      name: 'Delivery Details',
      to:'/delivery-details',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
      {
      component: CNavItem,
      name: 'ReproductionCycle',
      to:'/reproductionCycle',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    // masters
    {
      component: CNavTitle,
      name: 'Masters',
      // role: ['Admin','FranchiseAdmin']
    },
    {
      component: CNavItem,
      name: 'Route',
      to: '/route',
      icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      // role: ['Admin']
    },
    {
      component: CNavItem,
      name: 'Vehicle',
      to: '/vehicle',
      icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      // role: ['Admin']
    },
    {  component: CNavItem,
      name: 'Invoice',
      to: '/invoice',
      icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      // role: ['Admin']
    }
  ]

  export const getNavItems = () => {
    const userDetails = getUserRole();

    const filteredMenu = fullMenu.filter((item) => {
      if (!item.role) return true; // No role restriction
      return item.role.some((role) => userDetails.roles.includes(role));
    });

    return filteredMenu;
  };