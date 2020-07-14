const initState = {
    userError: null
}

export default (state = {initState}, action) => {
    switch(action.type) {
        case 'GET_PROJECTS_SUCCESS':
            return {
                ...state,
                projects: action.payload
            }
        case 'GET_PROJECTS_ERROR':
            return {
                ...state,
                userError: action.err
            }
        default:
            return state
    }
}