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

export const setToken = token => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}

export const setIsLoading = bool => {
    return {
        type: 'SET_IS_LOADING',
        payload: bool
    }
}

export const getUserId = () => {
    return async (dispatch) => {
        const res = await axios.get('/auth/verify/user')
        dispatch({
            type: 'GET_USER_ID',
            payload: res.data.user_id
        })
    }
}

// Verify token and find if isAdmin
export const verify = (user_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/auth/verify/${user_id}`)
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

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}