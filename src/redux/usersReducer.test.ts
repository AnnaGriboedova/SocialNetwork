import usersReducer, {actions, InitialStateType} from './usersReducer'

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'TestName 0', followed: false,
                photos: {small: '', large: ''}, status: 'status 0'
            },
            {
                id: 1, name: 'TestName 1', followed: false,
                photos: {small: '', large: ''}, status: 'status 1'
            },
            {
                id: 2, name: 'TestName 2', followed: true,
                photos: {small: '', large: ''}, status: 'status 2'
            },
            {
                id: 3, name: 'TestName 3', followed: true,
                photos: {small: '', large: ''}, status: 'status 3'
            },
        ],
        pageSize: 10,
        usersTotalCount: 0,
        currentPage: 1,
        isFetching: false,
        onFollowingUsersId: []
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})