import React from 'react'
import { Button,Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/mus-logo.png'

const Header = () => {
   const navigate = useNavigate()

    const items = [
      {
        key: 'profile',
        label: 'Profile',
      },
      {
        key: 'settings',
        label: 'Settings',
      },
      {
        key: 'logout',
        label: 'Logout',
      },
    ];

    const handleMenuClick = ({ key }) => {
      console.log('Clicked:', key);
      if (key === 'logout') {
       navigate('/login')
      }
    };
  
    const menuProps = {
      items,
      onClick: handleMenuClick,
    };

  return (
    <>
<header className='!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] p-2 border-b border-[#39444b]'>
   <div className="flex items-center justify-between">
    <img src={logo} alt="" width={50} height={50} className='md:hidden m-auto'/>
      <h2 className='text-white hidden md:block text-lg font-semibold font-sora pt-[0.5px]'>Mus Advisory Group HRMS</h2>
      <Dropdown menu={menuProps} placement="bottomRight">
        <Button><UserOutlined /></Button>
      </Dropdown>
   </div>
</header>

    </>

  )
}

export default Header