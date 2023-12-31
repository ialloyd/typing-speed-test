import  AccountCircle  from './AccountCircle'
import React from 'react'

const Header = () => {
  return (
    <div className='header'>
        <div className='logo'>
            LOGO
        </div>
        <div className='user-icon'>
            <AccountCircle/>
        </div>
    </div>
  )
}

export default Header