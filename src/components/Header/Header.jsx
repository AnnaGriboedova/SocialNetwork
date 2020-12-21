import React from 'react'
import s from './Header.module.scss'
import logo from './logo1.png';
import Preloader from "../common/Preloader/Preloader";
import UserSmallPhoto from "../common/UserSmallPhoto/UserSmallPhoto";

const Header = (props) => {
    if (!props.authUserProfile) {
        return <Preloader/>
    }
    return (
        <header className={s.header}>
            <img src={logo} alt='scanface logo' className={s.header__logo}/>
            <div className={s.profileInfoWrap}>
                <UserSmallPhoto photo={props.authUserProfile.photos.small} styles={{circle: true, size: 'md'}}/>
                {props.isAuth && <span className={s.profileFullName}><span
                    className={s.profileFullNameTitle}>Welcome,</span><br/>{props.login}</span>}
            </div>
        </header>
    )
};

export default Header;