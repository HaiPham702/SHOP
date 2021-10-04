
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Cart.css';
import CartProductItem from './CartProductItem';
import formatPrice from '../../utils/formartPrice';
import * as mess from '../../constants/message';
import {Link} from 'react-router-dom'

const Cart = props => {

    function showItemProductCart(products) {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return <CartProductItem
                    key={index}
                    data={product}
                />
            })
        } else {
            result = <div className='mess_emty_cart'>{mess.EMTY_CART}</div>
        }
        return result;

    }


    function TotalPrice(products) {
        var result = null;
        var moneySaved = null;
        if (products.length > 0) {
            products.forEach(product => {
                var { quantity, price, discount } = product
                result += (quantity) * (price * ((100 - discount) / 100));
                moneySaved += ((quantity * price) - result);
            })
        }
        return <div className='cart_total_price'>
                    <span className = 'total_price'>Tổng tiền:
                        <span>
                        {formatPrice(result)}

                        </span>
                    </span>
                    <span>Tiết kiệm được: {formatPrice(moneySaved)}</span>
                </div>;
    }

    return (
        <div>

            <h1 className='headin_cart'>GIỎ HÀNG</h1>
            <hr className='hr_cart'/>
            <table className="table">
                <tbody>
                    {showItemProductCart(props.productsCart)}
                </tbody>
            </table>

            {TotalPrice(props.productsCart)}
            <div className='btn_cart'>
                <span className='pay_cart_btn'>
                    THANH TOÁN
                </span>
                <Link to='/' className='back_home_page'>
                        XEM THÊM SẢN PHẨM
                </Link>
            </div>
        </div>
    );
};

Cart.propTypes = {
    productsCart: PropTypes.array,
};

const mapStateToProps = state => {
    return {
        productsCart: state.productsCart
    }
}

export default connect(mapStateToProps, null)(Cart);