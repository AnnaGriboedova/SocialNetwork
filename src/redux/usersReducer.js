const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';

let initialState = {
    users: [],
    pageSize: 5,
    usersTotalCount: 20,
    currentPage: 2
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map( u => {
                if(u.id === action.userId){
                    return {...u, followed: true}
                }
                return u
            })};
        case UNFOLLOW:
            return {...state, users: state.users.map( u => {
                    if(u.id === action.userId){
                        return {...u, followed: false}
                    }
                    return u
                })};
        case SET_USERS:
            return {...state, users: action.users};
        case SET_USERS_TOTAL_COUNT:
            return {...state, usersTotalCount: action.totalCount};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
    }
    return state
};

export const followAC = (userId) => ({
    type: FOLLOW,
   userId
});
export const unfollowAC = (userId) => ({
    type: UNFOLLOW,
    userId
});
export const setUsersAC = (users) => ({
    type: SET_USERS,
    users
});
export const setUsersTotalCountAC = (totalCount) => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount
});
export const setCurrentPageAC = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
});


export default usersReducer;