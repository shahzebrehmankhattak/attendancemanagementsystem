import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Outlet, useLocation } from 'react-router-dom';
import MainDashboard from './index';

const Dashboard = () => {
  const location = useLocation();
  return (
    <>
   <MainLayout>
   {location.pathname === '/' && <MainDashboard/>}
   <Outlet />
    </MainLayout>
    </>
  )
}

export default Dashboard