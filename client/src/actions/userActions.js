import axios from 'axios';

export const getProjects = (token, user_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/dashboard/projects/${user_id}`, token)
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

export const submitEntry = (token, entry) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/dashboard/entries', token, entry)
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

export const getEntries = (token, user_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/dashboard/entries/${user_id}`, token)
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