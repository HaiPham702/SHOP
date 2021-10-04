import * as actiontype from '../constants/actiontype';

var initState = {
    status : false,
    quatity : 1,
    product : {},
};

const appReducer = (state = initState,action) =>{
    switch (action.type) {
        case actiontype.CHANGE_VIEW_PRODUCT:
            return {
                status : !state.status,
                quatity : 1,
                product : action.product
            };
        case actiontype.UPDATE_QUANTITY:
            return {
                status : true,
                quatity : (state.quatity + action.value < 0) ?  state.quatity = state.quatity + 0: state.quatity +=  action.value,
                product : state.product
            }
        default:
            return state;
    }
}


export default appReducer;