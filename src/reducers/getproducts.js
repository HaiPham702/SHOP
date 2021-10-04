import * as actiontype from '../constants/actiontype';

var initState = [];

const appReducer = (state = initState,action) =>{
    switch (action.type) {
        case actiontype.GET_PRODUCTS:
            state = action.products
            return [...state];
        case actiontype.POST_PRODUCT:
            state.push(action.product);
            return [...state]
        default:
            return state;
    }
}

export default appReducer;