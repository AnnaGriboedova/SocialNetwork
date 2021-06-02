import React from 'react'
import {connect} from "react-redux";
import {follow, requestUsers, unfollow} from "../../redux/usersReducer";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getIsFriend,
    getOnFollowingUsersId,
    getTerm,
    getUsers,
    getUsersCount,
    getUsersTotalCount
} from "../../redux/usersSelectors";
import {StateType} from '../../redux/redux-store';

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    requestUsers: (currentPage?: number, usersCount?: number, term?: string, isFriend?: (boolean | "")) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersAPI extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, usersCount, term, isFriend} = this.props;
        this.props.requestUsers(currentPage, usersCount, term, isFriend);
    }

    onTermFilter = (term: string) => {
        const {usersCount, isFriend} = this.props;
        this.props.requestUsers(1, usersCount, term, isFriend);
    }
    onFriendFilter = (isFriend: boolean | '') => {
        const {usersCount, term} = this.props;
        this.props.requestUsers(1, usersCount, term, isFriend);
    }
    onPageChanged = (pageNum: number) => {
        const {usersCount, term, isFriend} = this.props;
        this.props.requestUsers(pageNum, usersCount, term, isFriend);
    };

    render() {
        return <Users usersTotalCount={this.props.usersTotalCount}
                      usersCount={this.props.usersCount}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      onTermFilter={this.onTermFilter}
                      onFriendFilter={this.onFriendFilter}
                      users={this.props.users}
                      isFetching={this.props.isFetching}
                      onFollowingUsersId={this.props.onFollowingUsersId}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
                      term={this.props.term}
                      isFriend={this.props.isFriend}
        />
    }
}

let mapStateToProps = (state: StateType) => {
    return {
        users: getUsers(state),
        usersCount: getUsersCount(state),
        term: getTerm(state),
        isFriend: getIsFriend(state),
        usersTotalCount: getUsersTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        onFollowingUsersId: getOnFollowingUsersId(state)
    }
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, StateType>(mapStateToProps, {
        requestUsers,
        unfollow,
        follow
    }),
)(UsersAPI);