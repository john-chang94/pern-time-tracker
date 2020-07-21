const iniState = {
    users: null,
    timesheets: null,
    timesheetsTotal: null,
    projects: null,
    adminError: ''
};

export default (state = iniState, action) => {
    switch(action.type) {
        case 'GET_TIMESHEETS_SUCCESS':
            return {
                ...state,
                timesheets: action.payload.userTimesheets,
                timesheetsTotal: action.payload.userTimesheetsTotal
            }
        case 'GET_TIMESHEETS_ERROR':
            return {
                ...state,
                adminError: action.err
            }
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: action.payload
            }
        case 'GET_USERS_ERROR':
            return {
                ...state,
                adminError: action.err
            }
        default:
            return state
    }
}