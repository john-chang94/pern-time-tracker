import axios from 'axios';

export const signIn = credentials => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/auth/signin', credentials);
            dispatch({
                type: 'SIGNIN_SUCCESS',
                payload: res.data
            })
            console.log(res.data)
        } catch (err) {
            dispatch({
                type: 'SIGNIN_FAIL',
                err: err.response.data
            })
        }
    }
}