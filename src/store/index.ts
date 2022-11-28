import { createStore } from 'redux'


const reducerFn = (state = {}, action: any) => {
    // syncronous function
    // we should not mutate the original state

    switch(action.type){
        case 'LOGIN':
            const tokenData = {token: action.payload.token, type: action. payload.type}
            return {...state, ...tokenData}
        case 'login/status':
            return {...state, status: action.payload}
        case 'users/SetCurrentUser':
            return {...state, ...action.payload, status: true}
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}

const store = createStore(reducerFn)

export default store