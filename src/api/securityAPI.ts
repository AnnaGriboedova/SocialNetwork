import {instance} from "./api";

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