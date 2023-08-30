export type Notiz = {
    _id: string,
    type: string,
    content: string,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
}
export type User = {
    _id: string,
    username: string,
    profileImg: string,

}

export type Message = {
    _id: string,
    content: string,
    sentBy: string,
    sentTo: string,
    createdAt: string

}

export interface AuthState {
    user: string,
    token: string,
    role: string,
}

export interface error {
    data: {
        error: string
    },
    status: number
}
