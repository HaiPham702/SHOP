import * as actiontype from '../constants/actiontype';

var data = JSON.parse(localStorage.getItem('userLogged'))

var initState = data ? data : '';

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actiontype.LOGIN:
            localStorage.setItem('userLogged',JSON.stringify(action.user))
            console.log('act', action.user)
            return  action.user;
        case actiontype.CHANGE_INFOR_PROFILE:
            localStorage.setItem('userLogged',JSON.stringify(action.data))
            return  action.data
        default:
            return state;
    }
}

export default appReducer;