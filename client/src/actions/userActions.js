import axios from 'axios';

export const getProjects = (user_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/dashboard/projects/${user_id}`)
            dispatch({
                type: 'GET_PROJECTS_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'GET_PROJECTS_ERROR',
                err: err.response.data
            })
        }
    }
}

export const submitEntry = (entry) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/dashboard/entries', entry)
            dispatch({
                type: 'SUBMIT_ENTRY_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'SUBMIT_ENTRY_ERROR',
                err: err.response.data
            })
        }
    }
}

export const getEntries = (user_id, week_start, week_end) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/dashboard/entries/${user_id}/${week_start}/${week_end}`)
            dispatch({
                type: 'GET_ENTRIES_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'GET_ENTRIES_ERROR',
                err: err.response.data
            })
        }
    }
}

export const getEntriesForTimesheet = (user_id, start_date, end_date) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/dashboard/entries/search?user_id=${user_id}&start_date=${start_date}&end_date=${end_date}`)
            dispatch({
                type: 'GET_ENTRIES_FOR_TIMESHEET_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'GET_ENTRIES_FOR_TIMESHEET_ERROR',
                err: err.response.data
            })
        }
    }
}

export const deleteEntry = (entry_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/dashboard/entries/${entry_id}`)
            dispatch({
                type: 'DELETE_ENTRY_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'DELETE_ENTRY_ERROR',
                err: err.response.data
            })
        }
    }
}

export const submitTimesheet = timesheet => {
    return async (dispatch) => {
        try {
            const res = await axios.post('dashboard/timesheets', timesheet)
            dispatch({
                type: 'SUBMIT_TIMESHEET_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'SUBMIT_TIMESHEET_ERROR',
                err: err.response.data
            })
        }
    }
}