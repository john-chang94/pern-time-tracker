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