import { combineReducers } from 'redux';
import viewproduct from './viewproduct';
import getproducts from './getproducts';
import showNotify from './showNotify';
import productsCart from './cart';
import user from './user';



const appReducer = combineReducers({
    viewproduct,
    getproducts,
    showNotify,
    productsCart,
    user
})

export default appReducer;