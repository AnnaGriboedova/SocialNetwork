import React from 'react'
import styles from './Users.module.scss'
import userPhoto from '../../assets/img/profile.png'
import {NavLink} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";

let Users = (props) => {
    let pagesCount = Math.ceil(props.usersTotalCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <>
        {props.isFetching? <Preloader/>:''}
        <div className={styles.usersContainer}>
            <div>
                {pages.map(p => {
                    return <span onClick={() => {
                        props.onPageChanged(p)
                    }} className={props.currentPage === p && styles.selectedPage}>{p}</span>
                })}
            </div>
            {props.users.map(u => <div className={styles.userWrapper} key={u.id}>
                <div className={styles.userProfile}>
                    <div>
                        <NavLink className={styles.profileImgLink} to={'profile/'+u.id}>
                            <img className={styles.profileImg} alt={'profile image'}
                                 src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                        </NavLink>
                    </div>
                </div>
                <div className={styles.userInfoWrapper}>
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>{u.name}</div>
                        <div className={styles.userStatus}>{u.status}</div>
                        <div className={styles.userButtonWrapper}>
                            {u.followed ?
                                <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button> :
                                <button onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>}
                        </div>
                    </div>
                    <div>
                        {/*<div>{u.location.country}</div>
                    <div>{u.location.city}</div>*/}
                    </div>
                </div>
            </div>)}
        </div>
    </>

};

export default Users;