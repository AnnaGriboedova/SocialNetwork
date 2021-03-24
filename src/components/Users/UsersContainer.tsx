import React from 'react'
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    requestUsers,
    UserType
} from "../../redux/usersReducer";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getOnFollowingUsersId,
    getPageSize,
    getUsers,
    getUsersTotalCount
} from "../../redux/usersSelectors";
import {StateType} from '../../redux/redux-store';

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    usersTotalCount: number
    users: Array<UserType>
    isFetching: boolean
    onFollowingUsersId: Array<number>
}

type MapDispatchToPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersAPI extends React.Component<PropsType, StateType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNum: number) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageNum, pageSize);
    };

    render() {
        return <Users usersTotalCount={this.props.usersTotalCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      isFetching={this.props.isFetching}
                      onFollowingUsersId={this.props.onFollowingUsersId}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
        />
    }
}

let mapStateToProps = (state: StateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
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