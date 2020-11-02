import React from 'react'
import s from './Header.module.scss'
import logo from './logo1.png';
import userPhoto from "../../assets/img/profile.png";
import Preloader from "../common/Preloader/Preloader";

const Header = (props) => {
    if (!props.authUserProfile) {
        return <Preloader/>
    }
    return (
        <header className={s.header}>
            <img src={logo} alt='scanface logo' className={s.header__logo}/>
            <div className={s.profileInfoWrap}>
                <img className={s.profilePhoto} src={props.authUserProfile.photos.small || userPhoto}/>
                {props.isAuth && <span className={s.profileFullName}><span
                    className={s.profileFullNameTitle}>Welcome,</span><br/>{props.login}</span>}
            </div>
        </header>
    )
};

export default Header;