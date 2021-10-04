import * as actiontype from '../constants/actiontype';

var initState = []

function findIndexById(state,id) {
    var index = null;
    state.forEach((element,i) => {
        if(element.id === id){
            index = i;
        }
    });
    return index;
}

const appReducer = (state = initState,action) =>{
    switch (action.type) {
        case actiontype.ADD_PRODUCT_TO_CART:
            state.push(Object.assign({},action.product,{quantity : action.quantity}))
            return [...state];
        case actiontype.CHANGE_QUANTITY_IN_CART:
            var index = findIndexById(state,action.id);
            state[index].quantity += action.value;
            return [...state];
        default:
            return state;
    }
}

export default appReducer;