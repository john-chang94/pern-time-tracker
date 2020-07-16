const iniState = {
    authorized: false,
    authError: null,
    isLoading: true,
    isAdmin: false,
    token: ''
}

export default (state = iniState, action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS':
            return {
                ...state,
                authorized: true,
                user: action.payload.user,
                isAdmin: action.payload.user.is_admin,
                token: action.payload.token
            }
        case 'SIGNIN_ERROR':
            return {
                ...state,
                authError: action.err
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
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
                user: action.payload.user,
                isAdmin: action.payload.user.is_admin,
                isLoading: false
            }
        case 'VERIFY_ERROR':
            return {
                ...state,
                authError: action.err
            }
        case 'GET_USER_ID':
            return {
                ...state,
                userId: action.payload
            }
        case 'SIGN_OUT':
            return {
                state
            }
        default:
            return state;
    }
}