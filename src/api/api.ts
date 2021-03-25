import axios from "axios";
import {UserProfileType} from "../types/types";
import {UserType} from "../redux/usersReducer";
import {Emoji} from "../redux/appReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": 'b642d82c-c58f-4b37-b2e1-e519e95e6a02'
    }
});

const instanceEmoji = axios.create({
    baseURL: 'https://emoji-api.com/',
    headers: {
        "API-KEY": 'df363abb0aaceb6736b1e98b26ac4127aa5a6e4e',
        'Content-Type': 'application/json'
    }
});

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaRequired = 10
}

type EmojiApi = {
    getEmojiCategory: Array<{
        slug: string
        subCategories: Array<string>
    }>
    getSubcategoryEmojis: Array<Emoji>
}

export const emojiApi = {
    getEmojiCategory() {
        return instanceEmoji.get<EmojiApi['getEmojiCategory']>('categories?access_key=df363abb0aaceb6736b1e98b26ac4127aa5a6e4e')
    },
    getSubcategoryEmojis(categorySlug: string) {
        return instanceEmoji.get<EmojiApi['getSubcategoryEmojis']>(`categories/${categorySlug}?access_key=df363abb0aaceb6736b1e98b26ac4127aa5a6e4e`)
    },
};

type UsersAPI = {
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
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<UsersAPI['getUsers']>(`users?page=${currentPage}&count=${pageSize}`).then(res => {
            return res.data
        })
    },
    deleteFriend(friendId: number) {
        return instance.delete<UsersAPI['deleteFriend']>(`follow/${friendId}`).then(res => res.data);
    },
    addFriend(friendId: number) {
        return instance.post<UsersAPI['addFriend']>(`follow/${friendId}`).then(res => res.data);
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId);
    }
};

type ProfileAPI = {
    getProfile: UserProfileType
    getStatus: string
    updateStatus: {
        resultCode: ResultCodes.Success | ResultCodes.Error
        messages: Array<string>,
        data: {}
    }
    savePhoto: {
        data: {
            photos: {
                small: string
                large: string
            }
        }
        resultCode: ResultCodes.Success | ResultCodes.Error
        messages: Array<string>
    }
    saveProfile: {
        resultCode: ResultCodes.Success | ResultCodes.Error
        messages: Array<string>,
        data
            :
            {}
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileAPI['getProfile']>('profile/' + userId)
            .then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get<ProfileAPI['getStatus']>('profile/status/' + userId)
            .then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put<ProfileAPI['updateStatus']>('profile/status/', {
            status
        }).then(res => res.data);
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append('image', file);

        return instance.put<ProfileAPI['savePhoto']>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profileData: UserProfileType) {
        return instance.put<ProfileAPI['saveProfile']>('profile/', profileData)
            .then(res => res.data);
    },
};

type AuthAPI = {
    Me: {
        resultCode: ResultCodes.Success | ResultCodes.Error
        messages: Array<string>
        data: {
            id: number
            email: string
            login: string
        }
    }
    Login: {
        resultCode: ResultCodes.Success | ResultCodes.Error | ResultCodes.CaptchaRequired
        messages: Array<string>,
        data: {
            userId: number
        }
    }
    Logout: {
        resultCode: ResultCodes.Success | ResultCodes.Error
        messages: Array<string>,
        data: {}
    }
}

export const authAPI = {
    me() {
        return instance.get<AuthAPI['Me']>('auth/me').then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<AuthAPI['Login']>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    logout() {
        return instance.delete<AuthAPI['Logout']>(`auth/login`)
            .then(res => res.data);
    }
};

type SecurityAPI = {
    getCaptchaUrl: {
        url: string
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<SecurityAPI['getCaptchaUrl']>('security/get-captcha-url')
            .then(res => res.data);
    }
};
