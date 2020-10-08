import React from 'react'
import styles from './Users.module.scss'
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({usersTotalCount, pageSize, currentPage, onPageChanged, ...props}) => {
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