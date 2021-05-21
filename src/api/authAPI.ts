import {instance, ResultCodes} from "./api";

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