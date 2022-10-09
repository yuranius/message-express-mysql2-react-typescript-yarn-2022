import {DELETE_MESSAGE, LOADING_PROCESS, SHOW_MESSAGE} from "../../store/overReducer";

export type ActionsType = SetLoadingProcessActionType | SetShowMessageActionType | DeleteShowMessageActionType


export type SetLoadingProcessActionType = {
    type: typeof LOADING_PROCESS
    payload: boolean
}

export type SetShowMessageActionType = {
    type: typeof SHOW_MESSAGE
    payload: MessageType
}
export type MessageType = {
    statusMessage: 0 | 1 | 2 | null // 0 - success, 1 - warning, 2 - danger
    message: string
}

export type DeleteShowMessageActionType = {
    type: typeof DELETE_MESSAGE
}