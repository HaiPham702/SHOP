import React, { Component } from 'react';
import { connect } from 'react-redux';
import './featuredproducts.css';
import listproducts from '../HomepageSideBar/listproducts';
import showProduct from '../../../utils/showProduct';
import ProductItem from '../../ProductItem/ProductItem';


class FeaturedProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        var result = null;
        var { products } = this.props
        if (products) {
            result = products.filter((product) => {
                return product.classify === '1';
            })
        }
        this.setState({
            products: result
        })
        document.querySelector('.item_feature_products').classList.add('active_produts');
    }

    showProducts = (products) => {
        var result = null;
        result = products.map((product, index) => {
            return <ProductItem
                key={index}
                product={product}
                col={4}
            />
        })
        return result
    }

    setIdState = (event, id) => {
        var elementActive = document.querySelector('.item_feature_products.active_produts');
        console.log(id)
        if (elementActive) {
            elementActive.classList.remove('active_produts')
        }
        event.target.classList.add('active_produts');
        var result = null;
        var { products } = this.props
        if (products) {
            result = products.filter((product) => {
                return product.classify === String(id);
            })
        }
        this.setState({
            products: result
        })
    }

    showFeatureProducts = (listproducts) => {
        var result = null;
        if (listproducts && listproducts.length > 0) {
            result = listproducts.map((product, index) => {
                return <div className='item_feature_products'
                    key={index}
                    onClick={(event) => { this.setIdState(event, product.id) }}
                >
                    {product.name}
                </div>


            })
        }
        return result;
    }
    render() {
        var { products } = this.state;
        console.log(products)
        return (
            <div className='featuredProducts'>
                <h2 className='title_featureProducts'>SẢN PHẨM NỔI BẬT</h2>
                <div className='lits_feature_products'>
                    {this.showFeatureProducts(listproducts)}
                </div>
                <div className='featureProducts_products'>
                    {products !== [] ?
                        this.showProducts(products) : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.getproducts
    }
}

export default connect(mapStateToProps, null)(FeaturedProducts);