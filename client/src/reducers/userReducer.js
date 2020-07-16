const initState = {
    submitMessage: '',
    submitSuccess: false
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
                submitMessage: action.payload.message,
                submitSuccess: true
            }
        case 'SUBMIT_ENTRY_ERROR':
            return {
                ...state,
                submitMessage: action.err,
                submitSuccess: false
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
        case 'DELETE_ENTRY_SUCCESS':
            return {
                ...state
            }
        case 'DELETE_ENTRY_ERROR':
            return {
                ...state
            }
        default:
            return state
    }
}