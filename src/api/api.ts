import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": 'b642d82c-c58f-4b37-b2e1-e519e95e6a02'
    }
});

export const instanceEmoji = axios.create({
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

