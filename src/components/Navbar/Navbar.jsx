import React from 'react'
import s from './Navbar.module.scss'
import {NavLink} from "react-router-dom";
import HeaderContainer from "../Header/HeaderContainer";
import LogoutContainer from "./Logout/LogoutContainer";

import profileIcon from "../../assets/img/icons/nav/profile.svg"
import usersIcon from "../../assets/img/icons/nav/group-profile-users.svg"
import dialogsIcon from "../../assets/img/icons/nav/chat.svg"
import newsIcon from "../../assets/img/icons/nav/newspaper.svg"
import musicIcon from "../../assets/img/icons/nav/music.svg"
import settingsIcon from "../../assets/img/icons/nav/settings.svg"

const Navbar = () => {
    return (
        <div className={`${s.navContainer} container`}>
            <HeaderContainer/>

            <div className={s.navWrapper}>
                <div className={s.navTitle}>Account</div>
                <nav className={s.nav}>
                    <div className={`${s.nav__item}`}>
                        <NavLink to={'/profile'} activeClassName={s.active}>
                            <span style={{backgroundImage: `url(${profileIcon})`}} className={s.nav__itemIcon}></span>Profile
                        </NavLink>
                    </div>
                    <div className={`${s.nav__item}`}>
                        <NavLink to={'/users'} activeClassName={s.active}>
                            <span style={{backgroundImage: `url(${usersIcon})`}} className={s.nav__itemIcon}></span>
                            Users
                        </NavLink>
                    </div>
                    <div className={s.nav__item}>
                        <NavLink to={'/dialogs'} activeClassName={s.active}>
                            <span style={{backgroundImage: `url(${dialogsIcon})`}} className={s.nav__itemIcon}></span>
                            Messages
                        </NavLink>
                    </div>
                    <div className={s.nav__item}>
                        <NavLink to={'/news'} activeClassName={s.active}>
                            <span style={{backgroundImage: `url(${newsIcon})`}} className={s.nav__itemIcon}></span>
                            News
                        </NavLink>
                    </div>
                    <div className={s.nav__item}>
                        <NavLink to={'/music'} activeClassName={s.active}>
                            <span style={{backgroundImage: `url(${musicIcon})`}} className={s.nav__itemIcon}></span>
                            Music
                        </NavLink>
                    </div>
                    <div className={s.nav__item}>
                        <NavLink to={'/settings'} activeClassName={s.active}>
                            <span style={{backgroundImage: `url(${settingsIcon})`}} className={s.nav__itemIcon}></span>
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