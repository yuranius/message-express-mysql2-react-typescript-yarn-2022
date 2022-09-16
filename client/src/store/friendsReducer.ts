const GET_FRIENDS = 'GET_FRIENDS'
export const ASYNC_GET_FRIENDS = 'ASYNC_GET_FRIENDS'

const DEL_FRIEND = 'DEL_FRIEND'
export const ASYNC_DEL_FRIEND = 'ASYNC_DEL_FRIEND'

const defaultState = {
    friends: [],
};

type friendsStateType = typeof defaultState


export const friendsReducer = (state = defaultState, action): friendsStateType => {
       switch (action.type) {
           case GET_FRIENDS:
               return {...state, friends: action.payload};
           case DEL_FRIEND:
               console.log( '📌:',action.payload,'🌴 🏁')
               
               return {...state, friends: state.friends.filter(f => f.id !== action.payload)}
       default:
           return state;
    }
};


export const getFriendsAction = (payload) => ({type: GET_FRIENDS, payload})
export const AsyncGetFriendsAction= (payload) => ({type: ASYNC_GET_FRIENDS, payload})

export const delFriendAction = (payload) => ({type: DEL_FRIEND, payload})
export const AsyncDelFriendAction = (payload) => ({type: ASYNC_DEL_FRIEND, payload})



