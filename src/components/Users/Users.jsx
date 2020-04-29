import React from 'react'
import styles from './Users.module.scss'
import userPhoto from '../../assets/img/profile.png'
import {NavLink} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import * as axios from "axios";

let Users = (props) => {
    let pagesCount = Math.ceil(props.usersTotalCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <>
        {props.isFetching ? <Preloader/> : ''}
        <div className={styles.usersContainer}>
            <div className={styles.usersPaginationWrapper}>
                {pages.map(p => {
                    return <span onClick={() => {
                        props.onPageChanged(p)
                    }} className={props.currentPage === p && styles.selectedPage}>{p}</span>
                })}
            </div>
            {props.users.map(u => <div className={styles.userWrapper} key={u.id}>
                <div className={styles.userProfile}>
                    <div>
                        <NavLink className={styles.profileImgLink} to={'profile/' + u.id}>
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
                                <button disabled={props.onFollowingUsersId.some(id => id === u.id)} onClick={() => {
                                    props.toggleIsFollowing(true, u.id);

                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": 'b642d82c-c58f-4b37-b2e1-e519e95e6a02'
                                        }
                                    }).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                        props.toggleIsFollowing(false, u.id);
                                    });


                                }}>Unfollow</button> :
                                <button disabled={props.onFollowingUsersId.some(id => id === u.id)} onClick={() => {
                                    props.toggleIsFollowing(true, u.id);

                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": 'b642d82c-c58f-4b37-b2e1-e519e95e6a02'
                                        }
                                    }).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                        props.toggleIsFollowing(false, u.id);
                                    });

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