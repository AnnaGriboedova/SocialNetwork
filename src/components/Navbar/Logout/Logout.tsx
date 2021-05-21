import React from 'react';
import s from '../Navbar.module.scss';
import usersIcon from "../../../assets/img/icons/nav/logout.svg";
import {DispatchProps, StateProps} from "./LogoutContainer";

const Logout: React.FC<StateProps & DispatchProps> = (props) => {
        return (
            <>
                {
                    props.isAuth &&
                    <div className={s.logoutBlock}>
                        <a href='' onClick={props.logout}>
                            <span style={{backgroundImage: `url(${usersIcon})`}} className={s.logoutBlock__icon}></span>
                            <span>Log out</span>
                        </a>
                    </div>
                }
            </>
        )
    }
;

export default Logout;