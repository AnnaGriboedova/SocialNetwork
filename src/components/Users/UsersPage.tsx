import React, {useEffect} from 'react'
import styles from './Users.module.scss'
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {follow, requestUsers, unfollow} from '../../redux/usersReducer';
import FilterForm from './FilterForm/FilterForm';
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getIsFetching,
    getIsFriend,
    getOnFollowingUsersId,
    getTerm,
    getUsersCount,
    getUsersSelector,
    getUsersTotalCount
} from "../../redux/usersSelectors";


export const UsersPage: React.FC = (props) => {
    const dispatch = useDispatch()

    const usersTotalCount = useSelector(getUsersTotalCount)
    const usersCount = useSelector(getUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const term = useSelector(getTerm)
    const isFriend = useSelector(getIsFriend)
    const isFetching = useSelector(getIsFetching)
    const users = useSelector(getUsersSelector)
    const onFollowingUsersId = useSelector(getOnFollowingUsersId)

    useEffect(() => {
        dispatch(requestUsers(currentPage, usersCount, term, isFriend));
    }, [])

    const onFollow = (userId: number) => {
        dispatch(follow(userId))
    }
    const onUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    const onTermFilter = (term: string) => {
        dispatch(requestUsers(1, usersCount, term, isFriend));
    }
    const onFriendFilter = (isFriend: boolean | '') => {
        dispatch(requestUsers(1, usersCount, term, isFriend));
    }
    const onPageChanged = (pageNum: number) => {
        dispatch(requestUsers(pageNum, usersCount, term, isFriend));
    };

    return <>
        {isFetching ? <Preloader/> : ''}
        <div className={styles.usersContainer}>
            <Paginator itemsTotalCount={usersTotalCount} usersCount={usersCount} currentPage={currentPage}
                       onPageChanged={onPageChanged}
            />

            <FilterForm term={term} isFriend={isFriend} currentPage={currentPage} onTermFilter={onTermFilter}
                        onFriendFilter={onFriendFilter}/>

            {users.map(u =>
                <User key={u.id}
                      user={u}
                      onFollowingUsersId={onFollowingUsersId}
                      follow={onFollow}
                      unfollow={onUnfollow}
                />
            )}
        </div>
    </>
};