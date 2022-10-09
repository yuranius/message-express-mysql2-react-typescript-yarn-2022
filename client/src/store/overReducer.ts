import {ActionsType, DeleteShowMessageActionType, MessageType, SetLoadingProcessActionType, SetShowMessageActionType} from "../types/ReducerType/overReducerType";

export const LOADING_PROCESS = 'LOADING_PROCESS'
export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const ASYNC_SET_SHOW_MESSAGE = 'ASYNC_SET_SHOW_MESSAGE'

export const DELETE_MESSAGE = 'DELETE_MESSAGE'


const defaultState = {
    message: '',
    loading: false,
    statusMessage: null,
};



export const overReducer = (state = defaultState, action:ActionsType) => {

       switch (action.type) {
           case SHOW_MESSAGE:
               return {...state, message: action.payload.message, statusMessage: action.payload.statusMessage};
           case LOADING_PROCESS:
               return {...state, loading: action.payload}
           case DELETE_MESSAGE:
               return {...state, message: ''}
       default:
           return state;
    }
};


export const setLoadingProcessAction = (payload:boolean):SetLoadingProcessActionType => ({type: LOADING_PROCESS, payload})

export const setShowMessageAction = (payload:MessageType):SetShowMessageActionType => ({type: SHOW_MESSAGE, payload})

export const deleteShowMessageAction = ():DeleteShowMessageActionType => ({type: DELETE_MESSAGE})





