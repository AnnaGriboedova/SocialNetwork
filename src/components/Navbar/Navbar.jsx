import React from 'react'
import s from './Navbar.module.scss'
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";

const Navbar = (props) => {
  return (
      <div className={`${s.navContainer} container`}>
        <nav className={s.nav}>
          <div className={`${s.item}`}>
            <NavLink to={'/profile'} activeClassName={s.active}>
              Profile
            </NavLink>
          </div>
          <div className={s.item}>
            <NavLink to={'/dialogs'} activeClassName={s.active}>
              Messages
            </NavLink>
          </div>
          <div className={s.item}>
            <NavLink to={'/news'} activeClassName={s.active}>
              News
            </NavLink>
          </div>
          <div className={s.item}>
            <NavLink to={'/music'} activeClassName={s.active}>
              Music
            </NavLink>
          </div>
          <div className={s.item}>
            <NavLink to={'/settings'} activeClassName={s.active}>
              Settings
            </NavLink>
          </div>
        </nav>

        <Friends state={props.state.friends}/>
      </div>
  )
};

export default Navbar;