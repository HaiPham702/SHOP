import React, { Component } from 'react';
import "./ProductItem.css";

class LoadingProduct extends Component {
    showLoading = (col) => {
       var result = [];
        for (var i = 0; i < col;i++) {
             result.push(<div key={i} className={`col-xs-${12/col} col-sm-${12/col} col-md-${12/col} col-lg-${12/col}`}>
                <div className='placeholder-image'></div>
                <div className='placeholder-pirce'></div>
                <div className='placeholder-name'></div>
                <div className='placeholder-status'></div>
                <div className='placeholder-radit'></div>
                <div className='placeholder-btn'></div>

            </div>)
        }
        return result;
    }
    render() {
        var col = this.props.col;

        return (
            <React.Fragment>
                {this.showLoading(col)}
            </React.Fragment>
        );
    }
}

export default LoadingProduct;