import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": 'b642d82c-c58f-4b37-b2e1-e519e95e6a02'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        })
    },
    deleteFriend(friendId) {
        return instance.delete(`follow/${friendId}`);
    },
    addFriend(friendId) {
        return instance.post(`follow/${friendId}`);
    },
    getProfile(userId) {
        return instance.get('profile/' + userId);
    }
};

export const authAPI = {
    me() {
        return instance.get('auth/me');
    }
};
