import React from 'react'
import styles from './Users.module.scss'
import userPhoto from '../../assets/img/profile.png'
import {NavLink} from "react-router-dom";

let User = ({user, onFollowingUsersId, follow, unfollow}) => {

    return <>
        <div className={styles.userWrapper}>
            <div className={styles.userProfile}>
                <div>
                    <NavLink className={styles.profileImgLink} to={'users/' + user.id}>
                        <img className={styles.profileImg} alt={'profile image'}
                             src={user.photos.small !== null ? user.photos.small : userPhoto}/>
                    </NavLink>
                </div>
            </div>
            <div className={styles.userInfoWrapper}>
                <div className={styles.userInfo}>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userStatus}>{user.status}</div>
                    <div>
                        <button className={'button'} disabled={onFollowingUsersId.some(id => id === user.id)}
                                onClick={() => {
                                    user.followed ? unfollow(user.id) : follow(user.id)
                                }}>{user.followed ? 'Unfollow' : 'Follow'}</button>
                    </div>
                </div>
                <div>
                    {/*<div>{u.location.country}</div>
                    <div>{u.location.city}</div>*/}
                </div>
            </div>
        </div>
    </>

};

export default User;