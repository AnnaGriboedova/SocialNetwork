import React from 'react'
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    setCurrentPage,
    requestUsers,
    toggleIsFollowing
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


class UsersAPI extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNum) => {
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
                      toggleIsFollowing={this.props.toggleIsFollowing}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
        />
    }
}

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, {
        setCurrentPage,
        toggleIsFollowing,
        requestUsers,
        unfollow,
        follow
    }),
)(UsersAPI);