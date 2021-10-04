import React, { Component } from 'react';
import ProductItem from '../../ProductItem/ProductItem';
import './productBestSelling.css'
import { connect } from 'react-redux';
import showProducts from '../../../utils/showProduct';
import Loading from '../../../utils/Loading';

class productBestSelling extends Component {


    showproducts = (products) =>{
        var result = null;
        if(products.length > 0){
            result = products.map((product,index) =>{
                return <ProductItem
                            key={index}
                            product = {product}
                        />
            })
        }
        return result;
    }

    render() {
        var {products} = this.props;
     
        return (
            <div className='row'>

                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div>

                        <img className='products_best_selling_sidebar' src="https://demo037082.web30s.vn/image-process/get-image-v3?path=/datafiles/web30s/upload/images/7000-7100/30S-03-7082/spleft.png&width=0" alt="quảng cáo" />

                    </div>
                </div>

                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <div className='product_best_selling'>
                        <div className='top_product_best_selling'>
                            <div className='title_product_best_selling'>
                                <h2 className='heading_bestselling_product'>
                                    BÁN CHẠY NHẤT
                                </h2>
                                <p>Đừng bỏ nỡ những ưu đã mới nhất</p>
                            </div>
                            <div className='view_all_btn'>
                                Xem tất cả
                                <i className="fas fa-long-arrow-alt-right"></i>
                            </div>

                        </div>
                        <div className='show_product'>
                          {products.length > 0 &&
                          products[0].name
                          ?
                          showProducts(products.reverse(),3,3):
                          Loading(3)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        products : state.getproducts
    }
}

export default connect(mapStateToProps,null)(productBestSelling);