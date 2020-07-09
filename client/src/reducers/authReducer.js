const iniState = {
    auth: false,
    authError: null
}

export default (state = iniState, action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS':
            return {
                ...state,
                auth: action.payload
            }
        case 'SIGNIN_FAIL':
            return {
                ...state,
                authError: action.err
            }
        default:
            return state;
    }
}