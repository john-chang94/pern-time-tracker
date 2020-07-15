const initState = {
    submitError: '',
    submitSuccess: ''
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
        case 'SUBMIT_ENTRY_SUCCESS':
            return {
                ...state,
                submitSuccess: action.payload.message,
                submitError: ''
            }
        case 'SUBMIT_ENTRY_ERROR':
            return {
                ...state,
                submitError: action.err,
                submitSuccess: ''
            }
        case 'GET_ENTRIES_SUCCESS':
            return {
                ...state,
                entries: action.payload
            }
        case 'GET_ENTRIES_ERROR':
            return {
                ...state
            }
        default:
            return state
    }
}