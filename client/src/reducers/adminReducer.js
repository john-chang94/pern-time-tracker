const iniState = {
    users: null,
    timesheets: null,
    timesheetsTotal: null,
    timesheetEntries: null,
    projects: null,
    adminMessage: '',
    updateUserSuccess: null
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
                adminMessage: action.err
            }
        case 'GET_TIMESHEET_ENTRIES_SUCCESS':
            return {
                ...state,
                timesheetEntries: action.payload
            }
        case 'GET_TIMESHEET_ENTRIES_ERROR':
            return {
                ...state
            }
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: action.payload
            }
        case 'GET_USERS_ERROR':
            return {
                ...state,
                adminMessage: action.err
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state
            }
        case 'REGISTER_ERROR':
            return {
                ...state,
                adminMessage: action.err
            }
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                updateUserSuccess: true
            }
        case 'UPDATE_USER_ERROR':
            return {
                ...state,
                updateUserSuccess: false
            }
        case 'UPDATE_PASSWORD_SUCCESS':
            return {
                ...state,
                updatePasswordMessage: action.payload.message,
                updateUserSuccess: true
            }
        case 'UPDATE_PASSWORD_ERROR':
            return {
                ...state,
                updatePasswordMessage: action.err
            }
        default:
            return state
    }
}