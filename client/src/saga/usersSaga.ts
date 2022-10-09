import {put, takeEvery} from 'redux-saga/effects'
import {friendsAPI, usersAPI} from "../api/api";
import {
	addFriendAction,
	ASYNC_ADD_FRIEND,
	ASYNC_DELETE_FRIEND,
	ASYNC_FIND_USERS,
	ASYNC_GET_ALL_USERS,
	deleteFriend,
	findUsersAction,
	getAllUsersAction
} from "../store/usersReducer";
import {setLoadingProcessAction, setShowMessageAction} from "../store/overReducer";
import {
	AsyncAddFriendActionType,
	AsyncDeleteFriendActionType,
	AsyncFindUsersActionType,
	AsyncGetAllUsersActionType
} from "../types/ReducerType/usersReducerType";


function* findUsersWorker({payload}: AsyncFindUsersActionType) {
	try {
		const {pageNumber} = payload
		yield put(setLoadingProcessAction(true))
		const {users, totalPages, totalUsers, message} = yield usersAPI.findUsers(payload)
		yield put(findUsersAction({users, totalUsers, totalPages, pageNumber}))
		yield put(setLoadingProcessAction(false))
		if (users.length) {
			yield put(setShowMessageAction({statusMessage: 0, message: message}))
		} else {
			yield put(setShowMessageAction({statusMessage: 2, message: message}))
		}
	} catch (error: any) {
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({statusMessage: 2, message: error.response.data.message}))
	}
}

function* getAllUsersWorker({payload}: AsyncGetAllUsersActionType) {
	try {
		const {pageNumber} = payload
		yield put(setLoadingProcessAction(true))
		const {users, totalPages, totalUsers} = yield usersAPI.findAllUsers(payload)
		yield put(getAllUsersAction({users, totalUsers, totalPages, pageNumber}))
		yield put(setLoadingProcessAction(false))
	} catch (e) {
		yield put(setLoadingProcessAction(false))

		yield put(setShowMessageAction({statusMessage: 2, message: 'Что-то пошло не так... Попробуйте позже...'}))
	}
}

function* addFriendWorker({payload}: AsyncAddFriendActionType) {
	try {
		yield put(setLoadingProcessAction(true))
		const {friendId, message} = yield friendsAPI.addFriend(payload)
		yield put(addFriendAction(friendId))
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({statusMessage: 0, message}))
	} catch (error: any) {
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({statusMessage: 0, message: error.response.data.message}))
	}
}

function* deleteFriendWorker({payload}: AsyncDeleteFriendActionType) {
	try {
		yield put(setLoadingProcessAction(true))
		const {friendId, message} = yield friendsAPI.deleteFriend(payload)
		yield put(deleteFriend(friendId))
		yield put(setLoadingProcessAction(false))
		yield put(setShowMessageAction({statusMessage: 0, message}))
	} catch (error: any) {
		yield put(setShowMessageAction({statusMessage: 0, message: error.response.data.message}))
	}
}

export function* collocutorsWatcher() {
	yield takeEvery(ASYNC_FIND_USERS, findUsersWorker)
	yield takeEvery(ASYNC_GET_ALL_USERS, getAllUsersWorker)
	yield takeEvery(ASYNC_ADD_FRIEND, addFriendWorker)
	yield takeEvery(ASYNC_DELETE_FRIEND, deleteFriendWorker)
}