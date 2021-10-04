import * as actiontype from '../constants/actiontype';
import callApi from '../utils/apiCaller';
import * as mess from '../constants/message';


// status close , opent box view products
export const changeViewProduct = (product) => {
    return {
        type: actiontype.CHANGE_VIEW_PRODUCT,
        product
    }
}


// update quantity in view box products 
export const updateQuantity = (value) => {
    return {
        type: actiontype.UPDATE_QUANTITY,
        value
    }
}

// fetch products with api and dispatch  
export const actGetProductsRequest = () => {
    return (dispatch) => {
        return callApi('products', 'GET', null)
            .then(res => {
                if (res === undefined) {
                    dispatch(actShowNotify({
                        title: 'Error',
                        message: mess.NETWORK_ERROR,
                        type: 'error',
                    }, true))
                } else {
                    dispatch(getProducts(res.data))
                }
            })
    }
}

// setch products to store
export const getProducts = (products) => {
    return {
        type: actiontype.GET_PRODUCTS,
        products
    }
}


// act post product to api
export const actPostProductRequest = (product) => {
    return (dispatch) => {
        callApi(`products`, 'POST', product)
            .then(res => {
                if (res === undefined) {
                    dispatch(actShowNotify({
                        title: 'Error',
                        message: mess.POST_PRODUCT_ERROR,
                        type: 'error',
                    }, true))
                }
                else if (res.status === 201) {
                    dispatch(actShowNotify({
                        title: 'Success',
                        message: mess.POST_PRODUCT_SUCCESS,
                        type: 'success',
                    }, true));
                    dispatch(actPostProduct(res.data))
                }
            })
    }
}

// post product to store
export const actPostProduct = (product) => {
    return {
        type: actiontype.POST_PRODUCT,
        product
    }
}


// show Notify
export const actShowNotify = (content, status) => {
    return {
        type: actiontype.SHOW_NOTIFY,
        content,
        status
    }
}

//
export const actAddProductToCart = (product,quantity) =>{
    return {
        type: actiontype.ADD_PRODUCT_TO_CART,
        product,
        quantity
    }
}

export const actChangeQuantityInCart = (id,value) =>{
    return {
        type : actiontype.CHANGE_QUANTITY_IN_CART,
        value,
        id

    }
}

export const actLogin = (user) =>{
    return {
        type : actiontype.LOGIN,
        user
    }
}

export const actChangeInforProfile = (data) =>{
    return {
        type : actiontype.CHANGE_INFOR_PROFILE,
        data
    }
}


