import React from 'react'
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    setCurrentPage,
    toggleIsFollowing, getUsers
} from "../../redux/usersReducer";
import Users from "./Users";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class UsersAPI extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNum) => {
        this.props.getUsers(pageNum, this.props.pageSize);
    };

    render() {
        return <Users usersTotalCount={this.props.usersTotalCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      isFetching={this.props.isFetching}
                      onFollowingUsersId={this.props.onFollowingUsersId}
                      toggleIsFollowing={this.props.toggleIsFollowing}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        usersTotalCount: state.usersPage.usersTotalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        onFollowingUsersId: state.usersPage.onFollowingUsersId
    }
};

export default compose(
    connect(mapStateToProps, {
        setCurrentPage,
        toggleIsFollowing,
        getUsers,
        unfollow,
        follow
    }),
    withAuthRedirect
)(UsersAPI);