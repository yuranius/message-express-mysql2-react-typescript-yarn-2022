import {ObjUsersType} from "../stateTypes";
import {
	ADD_FRIEND,
	ASYNC_ADD_FRIEND,
	ASYNC_DELETE_FRIEND,
	ASYNC_FIND_USERS,
	ASYNC_GET_ALL_USERS,
	DELETE_FRIEND,
	FIND_USERS,
	GET_ALL_USERS
} from "../../store/usersReducer";

export type FindUsersActionType = {
	type: typeof FIND_USERS,
	payload: UsersType,
}

export type UsersType = Omit<ObjUsersType, 'userId' | 'pageSize'>

export type AsyncFindUsersActionType = {
	type: typeof ASYNC_FIND_USERS,
	payload: FindUsersType
}

export type FindUsersType = {
	userId: number,
	value: string,
	pageNumber: number,
	pageSize: number,
}

export type GetAllUsersActionType = {
	type: typeof GET_ALL_USERS,
	payload: UsersType,
}

export type AsyncGetAllUsersActionType = {
	type: typeof ASYNC_GET_ALL_USERS,
	payload: GetAllUsersType,
}

export type GetAllUsersType = Pick<ObjUsersType, 'pageNumber' | 'pageSize' | 'userId'>

export type AddFriendActionType = {
	type: typeof ADD_FRIEND,
	payload: number,
}

export type ChangeFriendType = {
	userId: number,
	friendId: number,
}

export type AsyncAddFriendActionType = {
	type: typeof ASYNC_ADD_FRIEND,
	payload: ChangeFriendType,
}

export type DeleteFriendActionType = {
	type: typeof DELETE_FRIEND,
	payload: number,
}

export type AsyncDeleteFriendActionType = {
	type: typeof ASYNC_DELETE_FRIEND,
	payload: ChangeFriendType,
}

export type UserReducerActionsType =
		FindUsersActionType
		| GetAllUsersActionType
		| AddFriendActionType
		| DeleteFriendActionType