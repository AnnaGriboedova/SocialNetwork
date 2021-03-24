import React from 'react'
import styles from './Users.module.scss'
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from '../../redux/usersReducer';

type UsersType = {
    usersTotalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    isFetching: boolean
    users: Array<UserType>
    onFollowingUsersId: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<UsersType> = ({usersTotalCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return <>
        {props.isFetching ? <Preloader/> : ''}
        <div className={styles.usersContainer}>
            <Paginator itemsTotalCount={usersTotalCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged}
            />

            {props.users.map(u =>
                <User key={u.id}
                      user={u}
                      onFollowingUsersId={props.onFollowingUsersId}
                      follow={props.follow}
                      unfollow={props.unfollow}
                />
            )}
        </div>
    </>
};

export default Users;