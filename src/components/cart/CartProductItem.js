import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import formatPrice from '../../utils/formartPrice';
import { connect } from 'react-redux';
import * as actions from '../../actions/action';

const CartProductItem = props => {
    const  [quantity,setQuantity] = useState(1);

    useEffect(() => {
            setQuantity(props.data.quantity)
      },[]);

    function changeQuantity(value) {
        if((quantity + value) > 0){
            setQuantity(quantity + value);
            props.onChangeQuantity(props.data.id,value)
        }
    }

    function style(url) {
        return {
            backgroundImage: `url(${url})`

        }
    }
    var { name, price, image, discount } = props.data;
    return (
        <tr>
            <td className='image_product_cart_td'>
                <div className='image_product_cart' style={style(image)}></div>
            </td>
            <td className='name_product_cart'>{name}</td>
            <td className='price_product_cart'>
                <div>Đơn giá:
                    <span>
                        {formatPrice(price*((100-discount)/100))}
                    </span>
                </div>
                <div>Số lượng:
                    <span className='cart-product-btn'>
                        <div className='set-quantity-btn'>
                            <span onClick={()=>changeQuantity(-1)}>
                                <i className="fas fa-minus-circle"></i>
                            </span>
                            <input className='input-quality' type='number' value={quantity} size='1' disabled name='quality' />
                            <span onClick={()=>changeQuantity(1)}>
                                <i className="fas fa-plus-circle"></i>
                            </span>
                        </div>
                    </span>
                </div>
                <div>Thành tiền: {formatPrice(price*((100-discount)/100)*quantity)}</div>
            </td>
            <td>
                <div className='btn_delete_product_cart'>
                    <i className="fas fa-trash-alt"></i>
                </div>
            </td>
        </tr>
    );
};

CartProductItem.propTypes = {
    data: PropTypes.object,
};

const mapDispatchToProps = dispatch =>{
    return {
        onChangeQuantity : (id,value) =>{
            dispatch(actions.actChangeQuantityInCart(id,value));
        }
    }
}

export default connect(null,mapDispatchToProps)(CartProductItem);