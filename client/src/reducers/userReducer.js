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
                entryMessage: action.payload.message,
                entrySuccess: true
            }
        case 'SUBMIT_ENTRY_ERROR':
            return {
                ...state,
                entryMessage: action.err,
                entrySuccess: false
            }
        case 'GET_ENTRIES_SUCCESS':
            return {
                ...state,
                entries: action.payload.entries,
                entriesTotal: action.payload.entriesTotal
            }
        case 'GET_ENTRIES_ERROR':
            return {
                ...state
            }
        case 'GET_ENTRIES_FOR_TIMESHEET_SUCCESS':
            return {
                ...state,
                entriesForTimesheet: action.payload
            }
        case 'GET_ENTRIES_FOR_TIMESHEET_ERROR':
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
        case 'SUBMIT_TIMESHEET_SUCCESS':
            return {
                ...state,
                timesheetMessage: action.payload.message,
                timesheetSuccess: true
            }
        case 'SUBMIT_TIMESHEET_ERROR':
            return {
                ...state,
                timesheetMessage: action.err,
                timesheetSuccess: false
            }
        default:
            return state
    }
}