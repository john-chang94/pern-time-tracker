export const verifyToken = credentials => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/auth/signin', credentials);
            dispatch({
                type: 'SIGNIN_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'SIGNIN_FAIL',
                err: err.response.data
            })
        }
    }
}