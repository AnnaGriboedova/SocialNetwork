import React from 'react'
import s from './Navbar.module.scss'
import {NavLink} from "react-router-dom";
import HeaderContainer from "../Header/HeaderContainer";
import LogoutContainer from "./Logout/LogoutContainer";

import cn from 'classnames'

const Navbar = () => {
    return (
        <div className={`${s.navContainer} container`}>
            <HeaderContainer/>

            <div className={s.navWrapper}>
                <div className={cn(s.navTitle, 'title--sm--greyColor')}>Account</div>
                <nav className={s.nav}>
                    <div className={`${s.nav__item}`}>
                        <NavLink to={'/profile'} activeClassName={s.active}>
                            <span className={cn(s.nav__itemIcon, s['nav__itemIcon--profile'])}></span>Profile
                        </NavLink>
                    </div>
                    <div className={`${s.nav__item}`}>
                        <NavLink to={'/users'} activeClassName={s.active}>
                            <span className={cn(s.nav__itemIcon, s['nav__itemIcon--users'])}></span>
                            Users
                        </NavLink>
                    </div>
                    <div className={s.nav__item}>
                        <NavLink to={'/dialogs'} activeClassName={s.active}>
                            <span className={cn(s.nav__itemIcon, s['nav__itemIcon--messages'])}></span>
                            Messages
                        </NavLink>
                    </div>
                    <div className={s.nav__item}>
                        <NavLink to={'/news'} activeClassName={s.active}>
                            <span className={cn(s.nav__itemIcon, s['nav__itemIcon--news'])}></span>
                            News
                        </NavLink>
                    </div>
                    <div className={s.nav__item}>
                        <NavLink to={'/music'} activeClassName={s.active}>
                            <span className={cn(s.nav__itemIcon, s['nav__itemIcon--music'])}></span>
                            Music
                        </NavLink>
                    </div>
                    <div className={s.nav__item}>
                        <NavLink to={'/settings'} activeClassName={s.active}>
                            <span className={cn(s.nav__itemIcon, s['nav__itemIcon--settings'])}></span>
                            Settings
                        </NavLink>
                    </div>
                </nav>
            </div>

            {/*<FriendsContainer/>*/}

            <LogoutContainer/>
        </div>
    )
};

export default Navbar