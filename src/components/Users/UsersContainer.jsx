import React from 'react'
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setUsersTotalCount,
    toggleIsFetching,
    toggleIsFollowing
} from "../../redux/usersReducer";
import * as axios from "axios";
import Users from "./Users";
import {usersAPI} from "../../api/api";


class UsersAPI extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setUsersTotalCount(data.totalCount);

        });
    }

    onPageChanged=(pageNum)=>{
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNum);
        usersAPI.getUsers(pageNum, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items)
        });
    };

    render() {
        return <Users usersTotalCount={this.props.usersTotalCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      isFetching={this.props.isFetching}
                      onFollowingUsersId={this.props.onFollowingUsersId}
                      toggleIsFollowing={this.props.toggleIsFollowing}
        />
    }
}

let mapStateToProps = (state)=>{
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        usersTotalCount: state.usersPage.usersTotalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        onFollowingUsersId: state.usersPage.onFollowingUsersId
    }
};

/*let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(follow(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollow(userId))
        },
        setUsers: (users) => {
            dispatch(setUsers(users))
        },
        setUsersTotalCount: (totalCount) => {
            dispatch(setUsersTotalCount(totalCount))
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPage(currentPage))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetching(isFetching))
        },
    }
};*/

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setUsersTotalCount,
    setCurrentPage,
    toggleIsFetching,
    toggleIsFollowing
})(UsersAPI);