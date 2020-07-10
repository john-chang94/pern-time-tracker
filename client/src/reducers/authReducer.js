const iniState = {
    authorized: false,
    isAdmin: null,
    authError: null
}

export default (state = iniState, action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS':
            return {
                ...state,
                authorized: true,
                isAdmin: action.payload.isAdmin,
                user: action.payload
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