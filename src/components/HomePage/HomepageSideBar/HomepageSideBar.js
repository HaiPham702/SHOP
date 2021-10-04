import React, { Component } from 'react';
import listproducts from './listproducts';

class HomepageSideBar extends Component {
    showListProducts = (listProducts) => {
        var result = null;
        if (listProducts.length > 0) {
            result = listProducts.map((listProduct, index) => {
                return <li className='product-list-item' key={index}>
                    <a className='product-item-link'>
                        <img src={listProduct.icon} className='icon-product-list' alt='danh sách sản phẩm'/>
                        {listProduct.name}
                        {listProduct.more === null ? undefined : <i className="fas fa-angle-right more-icon"></i>}
                    </a>
                    {listProduct.more === null ? undefined : <ul className='list-more-products'>
                        {listProduct.more.map((listMore, index) => {
                            return <li className='more-item-products' key={index}>
                                <a className='more-item-link' >
                                    {listMore.name}
                                </a>
                            </li>
                        })}
                    </ul>}
                </li>
            })
        }
        return result;
    }
    render() {
        return (
            <div className='Side-bar'>
                <h3 className='Heading-products'>
                    <i className="fas fa-bars icon-menu"></i>
                    Sản phẩm</h3>
                <ul className='product-list'>
                    {this.showListProducts(listproducts)}
                </ul>
            </div>
        );
    }
}

export default HomepageSideBar;