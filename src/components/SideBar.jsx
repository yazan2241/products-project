import React from 'react'
import { DARK_BG } from '../constant/ThemeConstant'
import Logo from '../assets/logo.png';
const SideBar = () => {
  return (
    <div className={`${DARK_BG} w-full h-full felx flex-col items-center justify-start hidden sm:block`}>
        <div className="flex justify-between">
            <div className='bg-white rounded-br-3xl flex items-center justify-center p-2'>
                <img src={Logo} alt='logo' width='70px' />
            </div>
            <div className='text-wrap text-white m-4'>
                <p className='w-20'>Enterprise Resource Planning</p>
            </div>
        </div>
        <div className='flex justify-center mt-8'>
            <ul>
                <li><a href='/' className='no-underline text-white hover:text-blue-300'>Products</a></li>
            </ul>
        </div>
    </div>
  )
}

export default SideBar