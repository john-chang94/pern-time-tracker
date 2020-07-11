import axios from 'axios';

export const signIn = credentials => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/auth/signin', credentials);
            dispatch({
                type: 'SIGNIN_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'SIGNIN_ERROR',
                err: err.response.data
            })
        }
    }
}

export const setIsLoading = bool => {
    return {
        type: 'SET_IS_LOADING',
        payload: bool
    }
}

export const getUserId = token => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/auth/verify/user', token)
            dispatch({
                type: 'GET_USER_ID_SUCCESS',
                payload: res.data.user_id
            })
        } catch (err) {
            dispatch({
                type: 'GET_USER_ID_ERROR',
                err: err.response
            })
        }
    }
}

// Verify token and find if isAdmin
export const verify = (token, user_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/auth/verify/${user_id}`, token)
            dispatch({
                type: 'VERIFY_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'VERIFY_ERROR',
                err: err.response.data
            })
        }
    }
}