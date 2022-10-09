import {put, takeEvery} from 'redux-saga/effects'

import {profileAPI} from "../api/api";
import {USER_DATA} from "../config";
import {setLoadingProcessAction, setShowMessageAction} from "../store/overReducer";
import {
    ASYNC_CHANGE_AVATAR_USER,
    ASYNC_CHANGE_LOGIN_USER, AsyncChangeAvatarUserActionType,
    AsyncChangeLoginUserActionType,
    changeAvatarUserAction
} from "../store/profileReducer";
import {setAuthUser} from "../store/authReducer";





function* setChangeLoginUserWorker({payload}:AsyncChangeLoginUserActionType) {
    try {
        yield put(setLoadingProcessAction(true))
        const {userLogin, message} = yield profileAPI.changeLogin(payload.userId, payload.userLogin)
        yield put(setLoadingProcessAction(false))
        //TODO уйти от локалсторадж, там хранить только токен
        // @ts-ignore
        let userData = JSON.parse(localStorage.getItem(USER_DATA));
        yield localStorage.setItem (USER_DATA, JSON.stringify({ userId: userData.userId, userLogin, avatar:userData.avatar }))
        yield put(setAuthUser({userLogin}))
        yield put(setShowMessageAction({statusMessage:0, message}))
    } catch (error:any) {
        yield put(setLoadingProcessAction(false))
        yield put(setShowMessageAction({statusMessage:2, message:error.response.data.message}))
    }

}

function* setChangeAvatarUserWorker({payload}:AsyncChangeAvatarUserActionType) {
    try {
        yield put(setLoadingProcessAction(true))
        const {avatar, message} = yield profileAPI.changeAvatar(payload)
        yield put(setLoadingProcessAction(false))
        yield put(changeAvatarUserAction(avatar)) // заносим название картинки в стейт
        // @ts-ignore
        const userData = JSON.parse(localStorage.getItem(USER_DATA))
        yield localStorage.setItem (USER_DATA, JSON.stringify({ userId: userData.userId, userLogin:userData.userLogin, avatar }))
        yield put(setAuthUser({avatar}))
        if (avatar === 0) {
            yield put(setShowMessageAction({statusMessage: 2, message}))
        } else {
            yield put(setShowMessageAction({statusMessage: 0, message}))
        }
    } catch (error:any) {
        yield put(setLoadingProcessAction(false))
        yield put(setShowMessageAction({statusMessage:2, message:error.response.data.message}))
    }

}


export function* profileWatcher() {
    yield takeEvery(ASYNC_CHANGE_LOGIN_USER, setChangeLoginUserWorker)
    yield takeEvery(ASYNC_CHANGE_AVATAR_USER, setChangeAvatarUserWorker)
}