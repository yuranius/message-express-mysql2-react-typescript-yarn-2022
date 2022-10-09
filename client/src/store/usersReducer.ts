import {UsersStateType} from "../types/stateTypes";
import {
	AddFriendActionType,
	AsyncAddFriendActionType,
	AsyncDeleteFriendActionType,
	AsyncFindUsersActionType,
	AsyncGetAllUsersActionType,
	ChangeFriendType,
	DeleteFriendActionType,
	FindUsersActionType,
	FindUsersType,
	GetAllUsersActionType,
	GetAllUsersType,
	UserReducerActionsType,
	UsersType
} from "../types/ReducerType/usersReducerType";

export const ASYNC_FIND_USERS = 'ASYNC_FIND_USERS'
export const FIND_USERS = 'FIND_USERS'

export const ASYNC_GET_ALL_USERS = 'ASYNC_GET_ALL_USERS'
export const GET_ALL_USERS = 'GET_ALL_USERS'

export const ASYNC_ADD_FRIEND = 'ASYNC_ADD_FRIEND'
export const ADD_FRIEND = 'ADD_FRIEND'

export const ASYNC_DELETE_FRIEND = 'ASYNC_DELETE_FRIEND'
export const DELETE_FRIEND = 'DELETE_FRIEND'


const defaultState = {
	users: [],
	userId: null,
	pageNumber: 1,
	pageSize: 10,
	totalUsers: 0,
	totalPages: 0,
};

export const usersReducer = (state = defaultState, action: UserReducerActionsType) => {
	switch (action.type) {
		case GET_ALL_USERS:
			return {...state, ...action.payload};
		case FIND_USERS:
			return {...state, ...action.payload};
		case ADD_FRIEND:
			return {
				...state,
				users: state.users.map((c: UsersStateType) => {
					if (c.id === action.payload) {
						return {...c, friend: true}
					}
					return c;
				})
			}
		case DELETE_FRIEND:
			return {
				...state,
				users: state.users.map((c: UsersStateType) => {
					if (c.id === action.payload) {
						return {...c, friend: false}
					}
					return c;
				})
			}
		default:
			return state;
	}
}

export const findUsersAction = (payload: UsersType): FindUsersActionType => ({type: FIND_USERS, payload})
export const AsyncFindUsersAction = (payload: FindUsersType): AsyncFindUsersActionType => ({
	type: ASYNC_FIND_USERS,
	payload
})

export const getAllUsersAction = (payload: UsersType): GetAllUsersActionType => ({type: GET_ALL_USERS, payload})
export const AsyncGetAllUsersAction = (payload: GetAllUsersType): AsyncGetAllUsersActionType => ({
	type: ASYNC_GET_ALL_USERS,
	payload
})

export const addFriendAction = (payload: number): AddFriendActionType => ({type: ADD_FRIEND, payload})
export const AsyncAddFriendAction = (payload: ChangeFriendType): AsyncAddFriendActionType => ({
	type: ASYNC_ADD_FRIEND,
	payload
})

export const deleteFriend = (payload: number): DeleteFriendActionType => ({type: DELETE_FRIEND, payload})
export const AsyncDeleteFriendAction = (payload: ChangeFriendType): AsyncDeleteFriendActionType => ({
	type: ASYNC_DELETE_FRIEND,
	payload
})

