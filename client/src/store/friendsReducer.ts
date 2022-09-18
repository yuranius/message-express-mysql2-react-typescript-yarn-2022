
const GET_FRIENDS = 'GET_FRIENDS'
export const ASYNC_GET_FRIENDS = 'ASYNC_GET_FRIENDS'

const DEL_FRIEND = 'DEL_FRIEND'
export const ASYNC_DEL_FRIEND = 'ASYNC_DEL_FRIEND'



const defaultState = {
    friends: [] as Array<friend>
}
interface friend {
    id: number;
    login: string;
    friend: boolean;
}


export const friendsReducer = (state = defaultState, action:any) => {
       switch (action.type) {
           case GET_FRIENDS:
               return {...state, friends: action.payload};
           case DEL_FRIEND:
               return {...state, friends: state.friends.filter(f => (f.id !== action.payload)) }
       default:
           return state;
    }
};


type GetFriendsActionType = {
    type: typeof GET_FRIENDS
    payload: string
}

type AsyncGetFriendsActionType = {
    type: typeof ASYNC_GET_FRIENDS
    payload: number
}

type DelFriendActionType = {
    type: typeof DEL_FRIEND
    payload: number
}

// type PayloadDelFriendActionType = {
//     userId:number
//     friendId:number
// }

type AsyncDelFriendActionType = {
    type: typeof ASYNC_DEL_FRIEND
    payload: object
}


export const getFriendsAction = (payload:string):GetFriendsActionType => ({type: GET_FRIENDS, payload})
export const AsyncGetFriendsAction= (payload:number):AsyncGetFriendsActionType => ({type: ASYNC_GET_FRIENDS, payload})

export const delFriendAction = (payload:number):DelFriendActionType => ({type: DEL_FRIEND, payload})
export const AsyncDelFriendAction = (payload:object):AsyncDelFriendActionType => ({type: ASYNC_DEL_FRIEND, payload})



