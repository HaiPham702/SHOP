import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../actions/action';
import "./ProductItem.css";
import showRatings from '../../utils/showRating';
import formatPrice from '../../utils/formartPrice';
import * as mess from '../../constants/message';

class ProductItem extends Component {

    // add product to cart
    onAddProductToCart = (products) =>{
        var {user} = this.props;
        if(user.status !== true){
            this.props.onShowNotify({
                title: 'Warning',
                message: mess.NOT_LOGGERIN_WARNING,
                type: 'warning'
            },true)
        }else{
            this.props.addProductToCart(products,1);
        }
    }

    viewProduct = (product) => {
        this.props.viewproductItem(product);
    }

    style = (url) => {
        return {
            backgroundImage: `url(${url})`,
        }
    }

   
    render() {
        var { name, price, image, status, ratings, discount,brand } = this.props.product;
        var col = this.props.col;
        return (

            <div className={`col-xs-${12/col} col-sm-${12/col} col-md-${12/col} col-lg-${12/col}`}>
                <div className='product_item'>
                    <div className='img_product' style={this.style(image)}></div>
                    <div className='product-conten'>
                        {discount === 0 ?
                            <p className='product-price'>
                                {formatPrice(price)}
                            </p> :
                            <div className='price_discounts'>
                                <p className='product-price-discount'>
                                {formatPrice(price)}
                            </p>
                            <span className='new_prices'>
                                 {formatPrice(price-(price*discount/100))}
                            </span>
                            </div>
                        }
                        <h4 className='name-product'>
                            {name}
                        </h4>
                        <div className={status === 'true' ? 'stocking' : 'out_of_stock'}>
                            {status === 'true' ? 'Còn hàng' : 'Hết hàng'}
                        </div>
                        <span className='rating'>
                            {showRatings(ratings)}
                        </span>
                        <span className='product_brand'>
                            {brand}
                        </span>
                    </div>
                    <div className='btn_add_to_cart' onClick={() =>{this.onAddProductToCart(this.props.product)}}>
                        <i className="fas fa-shopping-cart icon_add_cart"></i>
                        Thêm vào giỏ
                    </div>
                    <div className='view_product' onClick={() => this.viewProduct(this.props.product)}>
                        <i className="fas fa-eye"></i>
                    </div>
                    <div className='like-product'>
                        <i className="far fa-heart"></i>
                    </div>
                    <div className='compare_product'>
                        <i className="fas fa-compress-alt"></i>
                    </div>
                    {discount !== 0 ?
                        <div className='discount_products'>
                            -{discount}%
                        </div> : null}

                </div>
            </div>

        );
    }
}

const mapStateToProps = state =>{
    return {
        user : state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        viewproductItem: (product) => {
            dispatch(action.changeViewProduct(product));
        },
        addProductToCart: (product,quantity) =>{
            dispatch(action.actAddProductToCart(product,quantity));
        },
        onShowNotify: (content,ts) =>{
            dispatch(action.actShowNotify(content,ts))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);