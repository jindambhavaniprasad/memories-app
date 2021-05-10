import { actionTypes } from "../constants/actionTypes"
import * as api from '../api/index.js'

export const authLogin = (profileObj, token) => (dispatch) => {
    try {
        dispatch({ type: actionTypes.AUTH, data: { profileObj, token } })
    } catch (error) {
        console.log(error);
    }
}

export const authLogout = () => (dispatch) => {
    try {
        dispatch({ type: actionTypes.LOGOUT, data: {} })
    } catch (error) {
        console.log(error);
    }
}

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: actionTypes.AUTH, data })
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: actionTypes.AUTH, data })
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}