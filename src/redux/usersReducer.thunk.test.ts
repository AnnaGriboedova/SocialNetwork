import {actions, follow, unfollow} from './usersReducer'
import {UsersAPI, usersAPI} from '../api/usersAPI'
import {ResultCodes} from '../api/api'

jest.mock('../api/usersAPI')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.addFriend.mockClear();
    userAPIMock.deleteFriend.mockClear();
})

const result: UsersAPI['addFriend'] | UsersAPI['deleteFriend'] = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {}
}

test('success follow thunk', async () => {
    const thunk = follow(1)
    userAPIMock.addFriend.mockReturnValue(Promise.resolve(result));

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 1))
})

test('success unfollow thunk', async () => {
    const thunk = unfollow(1)
    userAPIMock.deleteFriend.mockReturnValue(Promise.resolve(result));

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 1))
})
