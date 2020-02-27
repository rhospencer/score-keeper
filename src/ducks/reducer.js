// INITIAL STATE
const initialState = {
    loggedIn: false,
    user: null
}

// ACTION CONSTANTS
const UPDATE_USER = 'UPDATE_USER'

// ACTION BUILDERS
export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

// REDUCER FUNCTION
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_USER:
            return {...state, user: action.payload.user, loggedIn: action.payload.loggedIn}
        default:
            return state
    }
}

export default reducer