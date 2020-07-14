import axios from 'axios';



export const getProjects = (token, user_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`dashboard/projects/${user_id}`, token)
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