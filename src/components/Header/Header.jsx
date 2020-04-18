import React from 'react'
import s from './Header.module.scss'
import logo from './logo1.png';
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return (
      <header className={s.header}>
        <img src={logo} alt='scanface logo'/>
        <div className={s.loginBlock}>
            {props.isAuth?props.login
            :<NavLink to={'/login'}>Login</NavLink>
            }
        </div>
      </header>
  )
};

export default Header;