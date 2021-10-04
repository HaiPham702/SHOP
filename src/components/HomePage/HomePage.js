import React, { Component, Fragment } from 'react';
import HomepageSideBar from './HomepageSideBar/HomepageSideBar';
import Slideshow from './Slideshow';
import Policy from './Policy/Policy';
import ProductHomePage from './ProductHomePage/ProductHomePage';
import Viewproduct from '../Viewproducts/Viewproduct';
import ProductBestSelling from './best _selling_product/productBestSelling';
import ContactProductPage from './contactProductPage/contactProductPage';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import './HomePage.css';


class HomePage extends Component {
    render() {
        return (
            <Fragment>          
                <div className="row">
         

                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <HomepageSideBar />
                    </div>

                    <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                        <Slideshow />
                    </div>

                </div>
                    <Policy />
                    <ProductHomePage/>
                    <Viewproduct/>

                    <div className='advertisement_homePage'>
                        <div className='advertisement-item'>
                            <img src='https://demo037082.web30s.vn/datafiles/33401/upload/images/banner/4.png?t=1629427316' alt='Quảng cáo'/>
                        </div>
                        <div className='advertisement-item'>
                            <img src='https://demo037082.web30s.vn/image-process/get-image-v3?path=/datafiles/33401/upload/images/banner/3%20%281%29.png&width=0' alt='Quảng cáo'/>
                        </div>
                        <div className='advertisement-item'>
                            <img src='https://demo037082.web30s.vn/image-process/get-image-v3?path=/datafiles/33401/upload/images/banner/2%20%281%29.png&width=0' alt='Quảng cáo'/>
                        </div>
                        <div className='advertisement-item'>
                            <img src='https://demo037082.web30s.vn/image-process/get-image-v3?path=/datafiles/33401/upload/images/banner/1%20%281%29.png&width=0' alt='Quảng cáo'/>
                        </div>
                    </div>
                    <ProductBestSelling/>
                    <FeaturedProducts/>
                    <ContactProductPage />
            </Fragment>

        );
    }
}

export default HomePage;