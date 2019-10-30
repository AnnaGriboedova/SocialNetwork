import React from 'react'
import s from './Header.module.scss'
import logo from './logo1.png';

const Header = () => {
  return (
      <header className={s.header}>
        <img src={logo} alt='scanface logo'/>
      </header>
  )
};

export default Header;