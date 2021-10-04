import React, { Component } from 'react';
import { connect } from 'react-redux';
import showProduct from '../../../utils/showProduct';
import Loading from '../../../utils/Loading';
import * as actions from '../../../actions/action';

class ProductHomePage extends Component {
   
    componentDidMount() {
        this.props.fetchProducts();
    }
    render() {
        var { products } = this.props;

        return (
            <div className="row product-bestter">
                {products.length > 0 &&
                products[0].name ?
                    showProduct(products, 4,4) :
                    Loading(4)}
            </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        products: state.getproducts
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchProducts : () =>{
            dispatch(actions.actGetProductsRequest())
        }
    }
}

export default connect(mapPropsToState, mapDispatchToProps)(ProductHomePage);