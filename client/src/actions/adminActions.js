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

export const getTimesheetEntries = (user_id, week_start, week_end) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/admin/entries/${user_id}/${week_start}/${week_end}`)
            console.log(res.data)
            dispatch({
                type: 'GET_TIMESHEET_ENTRIES_SUCCESS',
                payload: res.data.entries
            })
        } catch (err) {
            dispatch({
                type: 'GET_TIMESHEET_ENTRIES_ERROR',
                err: err.response.data
            })
        }
    }
}

export const getUsers = (is_admin) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/admin/users?is_admin=${is_admin}`)
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

export const getAllUsers = () => {
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

export const register = user => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/auth/register', user);
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'REGISTER_ERROR',
                err: err.response.data
            })
        }
    }
}