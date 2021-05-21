export type PostType = {
    user: {
        userName: string
        userPhoto?: string
    },
    id?: number,
    message: string,
    likesCount?: any,
    date?: any
}

export type PhotosType = {
    small: string
    large: string
}

export type ContactsType = {
    [key: string]: string
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type UserProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType

}