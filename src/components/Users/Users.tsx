import React from 'react'
import styles from './Users.module.scss'
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from '../../redux/usersReducer';
import FilterForm from './FilterForm/FilterForm';

type UsersType = {
    usersTotalCount: number
    usersCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    onTermFilter: (term: string) => void
    term: string
    isFriend: '' | boolean
    onFriendFilter: (isFriend: boolean | '') => void
    isFetching: boolean
    users: Array<UserType>
    onFollowingUsersId: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<UsersType> = (
    {
        usersTotalCount,
        usersCount,
        currentPage,
        onPageChanged,
        onTermFilter,
        onFriendFilter,
        term,
        isFriend,
        ...props
    }) => {
    return <>
        {props.isFetching ? <Preloader/> : ''}
        <div className={styles.usersContainer}>
            <Paginator itemsTotalCount={usersTotalCount} usersCount={usersCount} currentPage={currentPage}
                       onPageChanged={onPageChanged}
            />

            <FilterForm term={term} isFriend={isFriend} currentPage={currentPage} onTermFilter={onTermFilter}
                        onFriendFilter={onFriendFilter}/>

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