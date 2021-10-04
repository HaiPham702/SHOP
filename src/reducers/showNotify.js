import * as actiontype from '../constants/actiontype';

var initState = {
    status : false,
    content : {
        title: '',
        message : '',
        type : '',
    }
}

const appReducer = (state = initState,action) =>{
    switch (action.type) {
        case actiontype.SHOW_NOTIFY:
            state = {
                status : action.status,
                content: action.content
            }
            return state;
        default:
            return state;
    }
}

export default appReducer;