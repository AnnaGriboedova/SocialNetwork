import React from 'react'
import s from './Header.module.scss'
import logo from './logo1.png';
import userPhoto from "../../assets/img/profile.png";

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src={logo} alt='scanface logo' className={s.header__logo}/>
            <div className={s.profileInfo}>
                <img className={s.profilePhoto} src={props.smallProfilePhoto || userPhoto}/>
                {props.isAuth && <span className={s.profileFullName}><span
                    className={s.profileFullNameTitle}>Welcome,</span><br/>{props.login}</span>}
            </div>
        </header>
    )
};

export default Header;