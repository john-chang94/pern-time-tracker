const iniState = {
    users: null,
    timesheets: null,
    timesheetsTotal: null,
    timesheetEntries: null,
    projects: null,
    adminMessage: '',
    registerSuccess: null,
    updateUserSuccess: null,
    updatePasswordMessage: '',
    createProjectSuccess: null,
    createProjectMessage: '',
    updateProjectSuccess: null,
    project_id: '',
    members: []
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
                ...state,
                adminMessage: action.payload.message,
                registerSuccess: true
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
        case 'GET_ALL_PROJECTS_SUCCESS':
            return {
                ...state,
                projects: action.payload
            }
        case 'GET_ALL_PROJECTS_ERROR':
            return {
                ...state
            }
        case 'CREATE_PROJECT_SUCCESS':
            return {
                ...state,
                createProjectSuccess: true,
                project_id: action.payload.project.project_id
            }
        case 'CREATE_PROJECT_ERROR':
            return {
                ...state,
                createProjectMessage: action.err,
                createProjectSuccess: false
            }
        case 'ASSIGN_USER_PROJECT_SUCCESS':
            return {
                ...state
            }
        case 'ASSIGN_USER_PROJECT_ERROR':
            return {
                ...state
            }
        case 'UPDATE_PROJECT_SUCCESS':
            return {
                ...state,
                updateProjectSuccess: true
            }
        case 'UPDATE_PROJECT_ERROR':
            return {
                ...state
            }
        case 'REMOVE_USER_PROJECT_SUCCESS':
            return {
                ...state
            }
        case 'REMOVE_USER_PROJECT_ERROR':
            return {
                ...state
            }
        case 'GET_ALL_PROJECT_MEMBERS_SUCCESS':
            return {
                ...state,
                members: action.payload
            }
        case 'GET_ALL_PROJECT_MEMBERS_ERROR':
            return {
                ...state
            }
        default:
            return state
    }
}