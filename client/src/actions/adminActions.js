import axios from 'axios';

export const getTimesheets = (user_id, start_date, end_date) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/admin/timesheets/${user_id}/${start_date}/${end_date}`);
            dispatch({
                type: 'GET_TIMESHEETS_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'GET_TIMESHEETS_ERROR',
                err: err.response.data
            })
        }
    }
}

export const getUsers = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/admin/users')
            console.log(res)
            dispatch({
                type: 'GET_USERS_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'GET_USERS_ERROR',
                err: err.response.data
            })
        }
    }
}

export const register = user => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/auth/register', user);
            console.log(res)
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'REGISTER_ERROR',
                err: err.response.data
            })
            console.log(err.response)
        }
    }
}