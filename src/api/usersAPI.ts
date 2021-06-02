import {UserType} from "../redux/usersReducer";
import {instance, ResultCodes} from "./api";

export type UsersAPI = {
    getUsers: {
        items: Array<UserType>
        totalCount: number
        error: null | string
    }
    deleteFriend: {
        resultCode: ResultCodes.Success | ResultCodes.Error
        messages: Array<string>,
        data: {}
    }
    addFriend: {
        resultCode: ResultCodes.Success | ResultCodes.Error
        messages: Array<string>,
        data: {}
    }
}
export const usersAPI = {
    getUsers(currentPage: number, usersCount: number, term: string, isFriend: boolean | '') {
        return instance.get<UsersAPI['getUsers']>(`users?page=${currentPage}&count=${usersCount}&term=${term}&friend=${isFriend}`).then(res => {
            return res.data
        })
    },
    deleteFriend(friendId: number) {
        return instance.delete<UsersAPI['deleteFriend']>(`follow/${friendId}`).then(res => res.data);
    },
    addFriend(friendId: number) {
        return instance.post<UsersAPI['addFriend']>(`follow/${friendId}`).then(res => res.data);
    },
};