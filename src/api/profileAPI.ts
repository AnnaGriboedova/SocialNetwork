import {UserProfileType} from "../types/types";
import {instance, ResultCodes} from "./api";

export type ProfileAPI = {
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