const LOADING_PROCESS = 'LOADING_PROCESS'
const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const ASYNC_SET_SHOW_MESSAGE = 'ASYNC_SET_SHOW_MESSAGE'

const DELETE_MESSAGE = 'DELETE_MESSAGE'
//export const ASYNC_DELETE_MESSAGE = 'ASYNC_DELETE_MESSAGE'

const defaultState = {
    message: '',
    loading: false,
};



export const overReducer = (state = defaultState, action) => {

       switch (action.type) {
           case SHOW_MESSAGE:
               return {...state, message: action.payload};
           case LOADING_PROCESS:
               return {...state, loading: action.payload}
           case DELETE_MESSAGE:
               return {...state, message: ''}
       default:
           return state;
    }
};


export const setLoadingProcessAction = (payload) => ({type: LOADING_PROCESS, payload})

export const setShowMessageAction = (payload) => ({type: SHOW_MESSAGE, payload})
export const AsyncSetShowMassageAction = (payload) => ({type: ASYNC_SET_SHOW_MESSAGE, payload})

export const deleteShowMessageAction = () => ({type: DELETE_MESSAGE})
//export const AsyncDeleteShowMassageAction = () => ({type: ASYNC_DELETE_MESSAGE})




