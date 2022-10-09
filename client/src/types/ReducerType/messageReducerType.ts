import {ADD_MESSAGE, ADD_USERS_WHO_HAVE_MESSAGES, ASYNC_ADD_MESSAGE,
    ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES,
    ASYNC_GET_MESSAGES_USER,
    ASYNC_GET_USERS_WHO_HAVE_MESSAGES, CHANGE_USERS_WHO_HAVE_MESSAGES, GET_MESSAGES_USER, GET_USERS_WHO_HAVE_MESSAGES,
    IS_REDIRECT_FROM_ANY_PAGE, SET_CURRENT_USER} from "../../store/messageReducer";
import { CurrentUserType } from "../stateTypes";

interface MessageAndUsersType  {
    id: number | null,
    content: string | null,
    message:string | null,
    userToId:number | null,
    userFromId:number | null,
    login: string | null,
    created_at: string | null,
    avatar:string | null,
}

export type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    payload: AddMessageType
}

export type AddMessageType = Omit<MessageAndUsersType, 'content' | 'login' | 'avatar'>

export type AsyncAddMessageActionCreatorType = {
    type: typeof ASYNC_ADD_MESSAGE
    payload: MessageType
}

export type MessageType = Omit<MessageAndUsersType, 'id' | 'avatar' | 'content'>


export type AddUsersWhoHaveMessagesActionType = {
    type: typeof ADD_USERS_WHO_HAVE_MESSAGES
    payload: AddUsersMessagesType
}

export type AddUsersMessagesType = {
    id: number,
    login: string,
    avatar:string,
}

export type GetUsersWhoHaveMessagesActionType = {
    type: typeof GET_USERS_WHO_HAVE_MESSAGES
    payload: Array<MyUsersType>
}

export type MyUsersType = Omit<MessageAndUsersType, 'message' | 'userToId' | 'userFromId'>


export type AsyncGetUsersWhoHaveMessagesActionType = {
    type: typeof ASYNC_GET_USERS_WHO_HAVE_MESSAGES
    payload: number
}

export type ChangeUsersWhoHaveMessagesActionType = {
    type: typeof CHANGE_USERS_WHO_HAVE_MESSAGES
    payload: number | null
}

export type AsyncChangeUsersWhoHaveMessagesActionType = {
    type: typeof ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES
    payload: number | null
}


export type GetMessagesUserActionType = {
    type: typeof GET_MESSAGES_USER
    payload: Array<MessagesUser>
}


export type MessagesUser = Omit<MessageAndUsersType, 'message' | 'userToId' | 'avatar'>

export type AsyncGetMessagesUserActionType = {
    type: typeof ASYNC_GET_MESSAGES_USER
    payload: GetMessagesUsers
}

export type GetMessagesUsers = {
    userId:number | null,
    friendsId: number | null,
}

export type SetCurrentUserActionType = {
    type: typeof SET_CURRENT_USER
    payload: CurrentUserType
}

export type IsRedirectFromAnyPageActionType = {
    type: typeof IS_REDIRECT_FROM_ANY_PAGE
    payload: boolean
}

export type MessageReducerActionsType = AddMessageActionCreatorType | AddUsersWhoHaveMessagesActionType | GetUsersWhoHaveMessagesActionType |
    ChangeUsersWhoHaveMessagesActionType | GetMessagesUserActionType | SetCurrentUserActionType | IsRedirectFromAnyPageActionType
