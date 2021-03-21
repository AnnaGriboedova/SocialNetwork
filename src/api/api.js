import * as axios from "axios";

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

export const emojiApi = {
    getEmojiCategory() {
        return instanceEmoji.get('categories?access_key=df363abb0aaceb6736b1e98b26ac4127aa5a6e4e')
    },
    getSubcategoryEmojis(categorySlug) {
        return instanceEmoji.get(`categories/${categorySlug}?access_key=df363abb0aaceb6736b1e98b26ac4127aa5a6e4e`)
    },
};

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
        console.warn('Obsolete method. Use profileAPI object');
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get('profile/' + userId);
    },
    getStatus(userId) {
        return instance.get('profile/status/' + userId);
    },
    updateStatus(status) {
        return instance.put('profile/status/', {
            status
        });
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append('image', file);

        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profileData) {
        return instance.put('profile/', profileData);
    },
};

export const authAPI = {
    me() {
        return instance.get('auth/me');
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url');
    }
};