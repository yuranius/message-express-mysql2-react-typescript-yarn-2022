import React, {useEffect, useState} from "react"
import { useMassage } from "../../hooks/message.hook"
import {AuthPage} from "./AuthPage";
import {useDispatch, useSelector} from "react-redux";
import {AsyncSetAuthUserAction, AsyncSetRegisterUserAction } from "../../store/authReducer";
import {deleteShowMessageAction} from "../../store/overReducer";



export const AuthPageContainer: React.FC = () => {

    const dispatch = useDispatch()

    const [form, setForm] = useState({email:"", password:""})

    const [show, setShow] = useState(false)

    const [alertMessage, setAlertMessage] = useState('')

    const {loading, message} = useSelector((state:stateOverType) => state.over)


    type stateOverType = {
        over: stateOverReducerType
    }

    type stateOverReducerType = {
        loading: boolean
        message: string
    }

    useEffect(() => {
        setShow(false)
        message && dispatch(deleteShowMessageAction())
    },[])

    useEffect(() => {
        message && setShow(true)
        setAlertMessage(message)
    }, [message])

    const changeHandler = (event:any) => {
        setShow(false)
        message && dispatch(deleteShowMessageAction())
        setForm({ ...form, [event.target.id]: event.target.value })
    }

    const registerHandler = () => {
        (message && !show) && setShow(true)
        dispatch(AsyncSetRegisterUserAction(form))
    }

    const loginHandler = () => {
        (message && !show) && setShow(true)
        dispatch(AsyncSetAuthUserAction(form))
    }


    return <AuthPage
        loginHandler={loginHandler}
        registerHandler={registerHandler}
        changeHandler={changeHandler}
        loading={loading}
        show={show}
        setShow={setShow}
        alertMessage={alertMessage}/>
}