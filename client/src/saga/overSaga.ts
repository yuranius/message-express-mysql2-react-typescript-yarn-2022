import {put, takeEvery} from 'redux-saga/effects'
import {
    ASYNC_SET_SHOW_MESSAGE,
    setShowMessageAction,
} from "../store/overReducer";
import {SetShowMessageActionType} from "../types/ReducerType/overReducerType";


function* getMassageWorker({payload}:SetShowMessageActionType) {
    yield put(setShowMessageAction(payload))
}


export function* overWatcher() {
    yield takeEvery(ASYNC_SET_SHOW_MESSAGE, getMassageWorker)
}