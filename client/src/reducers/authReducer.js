const iniState = {
    authorized: false,
    isAdmin: null,
    authError: null,
    isLoading: true
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
        case 'SIGNIN_ERROR':
            return {
                ...state,
                authError: action.err
            }
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'VERIFY_SUCCESS':
            return {
                ...state,
                authorized: action.payload.authorized,
                isAdmin: action.payload.isAdmin,
                isLoading: false
            }
        case 'VERIFY_ERROR':
            return {
                ...state,
                authError: action.err
            }
        case 'GET_USER_ID_SUCCESS':
            return {
                ...state,
                userId: action.payload
            }
        default:
            return state;
    }
}