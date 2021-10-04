import React, { Component } from 'react';
import './viewproduct.css';
import * as action from '../../actions/action'
import { connect } from 'react-redux';
import showRatings from '../../utils/showRating';
import formatPrice from '../../utils/formartPrice';

class Viewproduct extends Component {

    //close modal view product
    closeViewProduct = () => {
        this.props.closeViewProduct({});
    }

    //StopPropagation
    StopPropagation = (e) => {
        e.stopPropagation();
    }

    //style background image 
    style = (url) => {
        return {
            backgroundImage: `url(${url})`,
        }
    }

    changeQuantity = (value) => {
        this.props.changeQuantity(value)
    }

    //show rating stars

    // format price VND
    formatPrice = (price) => {
        price = Number(price);
        return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKey);
      }
    

    // add event keydown
    handleKey = e =>{
        console.log(e.which)
        switch (e.which) {

            case 27:
                this.props.closeViewProduct({});
                break;
            case 39:
                this.changeQuantity(1)
                break;
            case 37:
                this.changeQuantity(-1)
                break;
            default:
                break;
        }
    }
    //display conten modal view product
    showViewProduct = (data) => {
        var result = null;
        if (data.status === true && data.product) {

            var { name, price, image, status, ratings, discount, brand, count, discription, model } = data.product;
            result = <div className='layout' onClick={this.closeViewProduct}>
                <div className='modal_view_product' onClick={this.StopPropagation}>
                    <div className='close_modal_btn'>
                        <i className="fas fa-window-close" onClick={this.closeViewProduct}></i>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                <div className='img-view-products' style={this.style(image)}></div>
                            </div>

                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                <h3 className='view-product-name'>
                                    {name}
                                </h3>

                                {discount === 0 ?
                                    <span className='view-product-price'>
                                        {formatPrice(price)}
                                    </span> :
                                    <div className='price_discount'>
                                        <p className='view-price-discount'>
                                            {formatPrice(price)}
                                        </p>
                                        <span className='new_price'>
                                            {formatPrice(price - (price * discount / 100))}
                                        </span>
                                        <span className='discount_view_product'>
                                            -{discount}%
                                        </span>
                                    </div>
                                }
                                <div className='view-product-code'>
                                    MÃ SẢN PHẨM:
                                    <span>
                                        {model}
                                    </span>
                                </div>
                                <div className='view-product-status'>
                                    <i className="fas fa-check"></i>
                                    Tình trạng :
                                    <span className={status === 'true' ? 'stocking' : 'out_of_stock'}>
                                        {status === 'true' ? ' Còn hàng' : ' Hết hàng'}
                                    </span>

                                </div>
                                <div className='view-product-rating'>
                                    <i className="fas fa-check"></i>

                                    Đánh giá :
                                    <span>
                                        {showRatings(ratings)}
                                    </span>
                                    {ratings}
                                    <div className='count'>
                                        <i className="fas fa-user"></i>
                                        {count}
                                    </div>
                                </div>
                                <div className='view-product-brand'>
                                    <i className="fas fa-check"></i>
                                    Thương hiệu:    <span>   {brand} </span>
                                </div>
                                <div className='view-product-discript'>
                                    {discription}
                                </div>
                                <div className='view-product-btn'>
                                    <div className='set-quantity-btn'>
                                        <span onClick={() => this.changeQuantity(-1)}>
                                            <i className="fas fa-minus-circle"></i>
                                        </span>
                                        <input className='input-quality' type='number' value={data.quatity} size='1' disabled name='quality' />
                                        <span onClick={() => this.changeQuantity(1)}>
                                            <i className="fas fa-plus-circle"></i>
                                        </span>
                                    </div>
                                    <div className='like-btn'>
                                        YÊU THÍCH
                                    </div>
                                    <div className='compare-btn'>
                                        SO SÁNH
                                    </div>
                                </div>
                                <div className='add_to_cart_btn'>
                                    <i className="fas fa-shopping-cart"></i>
                                    THÊM VÀO GIỎ HÀNG
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        }
        return result;
    }

    render() {
        var { viewproduct } = this.props;
        return (
            <React.Fragment>
                {this.showViewProduct(viewproduct)}
            </React.Fragment>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        viewproduct: state.viewproduct,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeViewProduct: (product) => {
            dispatch(action.changeViewProduct(product))
        },
        changeQuantity: (value) => {
            dispatch(action.updateQuantity(value))
        }
    }
}


export default connect(mapPropsToState, mapDispatchToProps)(Viewproduct);