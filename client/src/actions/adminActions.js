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

export const updateUser = (user_id, user) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/admin/users/${user_id}`, user)
            dispatch({
                type: 'UPDATE_USER_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'UPDATE_USER_ERROR',
                err: err.response.data
            })
        }
    }
}

export const updateUserPassword = (user_id, body) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/admin/users/change-password/${user_id}`, body)
            dispatch({
                type: 'UPDATE_PASSWORD_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'UPDATE_PASSWORD_ERROR',
                err: err.response.data
            })
        }
    }
}

export const getAllProjects = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/admin/projects');
            dispatch({
                type: 'GET_ALL_PROJECTS_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'GET_ALL_PROJECTS_ERROR',
                err: err.response.data
            })
        }
    }
}

export const createProject = project => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/admin/projects', project)
            dispatch({
                type: 'CREATE_PROJECT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'CREATE_PROJECT_ERROR',
                err: err.response.data
            })
        }
    }
}

export const assignUserProject = (user_project_ids) => {
    return async (dispatch) => {
        try {
            const res = axios.post('/admin/user-projects', user_project_ids)
            dispatch({
                type: 'ASSIGN_USER_PROJECT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ASSIGN_USER_PROJECT_ERROR',
                err: err.response.data
            })
        }
    }
}

export const removeUserProject = (user_id, project_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/admin/user-projects/${user_id}/${project_id}`)
            dispatch({
                type: 'REMOVE_USER_PROJECT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'REMOVE_USER_PROJECT_ERROR',
                err: err.response.data
            })
        }
    }
}

export const updateProject = (project_id, updatedProject) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/admin/projects/${project_id}`, updatedProject)
            dispatch({
                type: 'UPDATE_PROJECT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'UPDATE_PROJECT_ERROR',
                err: err.response.data
            })
        }
    }
}

export const getAllProjectMembers = project_id => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/admin/user-projects/${project_id}`)
            dispatch({
                type: 'GET_ALL_PROJECT_MEMBERS_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'GET_ALL_PROJECT_MEMBERS_ERROR',
                err: err.response.data
            })
        }
    }
}