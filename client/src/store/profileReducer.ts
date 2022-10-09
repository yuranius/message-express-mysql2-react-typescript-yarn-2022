export const  ASYNC_CHANGE_LOGIN_USER = 'ASYNC_CHANGE_LOGIN_USER'
const CHANGE_LOGIN_USER = 'CHANGE_LOGIN_USER'

export const ASYNC_CHANGE_AVATAR_USER = 'ASYNC_CHANGE_AVATAR_USER'
const CHANGE_AVATAR_USER = 'CHANGE_AVATAR_USER'

const defaultState = {
    userId: null,
    userLogin: '',
    userAvatar:''
};


export const profileReducer = (state = defaultState, action:ProfileReducerActionType) => {
    switch (action.type) {

        // case CHANGE_LOGIN_USER:
        //     return {...state, ...action.payload};
        case CHANGE_AVATAR_USER:
            return {...state, userAvatar: action.payload}
        default:
            return state;
    }
};


export type AsyncChangeLoginUserActionType = {
    type: typeof ASYNC_CHANGE_LOGIN_USER,
    payload: ChangeLoginUserType
}

export type ChangeLoginUserType = {
    userId: number,
    userLogin: string,
}

export type ChangeAvatarUserActionType = {
    type: typeof CHANGE_AVATAR_USER,
    payload: ChangeAvatarUserType
}

export type ChangeAvatarUserType = {
    avatar:string
}


export type AsyncChangeAvatarUserActionType = {
    type: typeof ASYNC_CHANGE_AVATAR_USER,
    payload: {}
}

export type ProfileReducerActionType = ChangeAvatarUserActionType

//export const changeLoginUserAction = (payload) => ({type: CHANGE_LOGIN_USER, payload}) пока не используется
export const AsyncChangeLoginUserAction = (payload:ChangeLoginUserType):AsyncChangeLoginUserActionType => ({type: ASYNC_CHANGE_LOGIN_USER, payload})

export const changeAvatarUserAction = (payload:ChangeAvatarUserType):ChangeAvatarUserActionType => ({type: CHANGE_AVATAR_USER, payload})
export const AsyncChangeAvatarUserAction = (payload:{}):AsyncChangeAvatarUserActionType => ({type: ASYNC_CHANGE_AVATAR_USER, payload})