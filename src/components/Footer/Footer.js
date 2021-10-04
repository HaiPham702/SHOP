import React, { Component } from 'react';
import * as footer from './list-footer-contacts';
import './footer.css';

class Footer extends Component {
    showListFooterContacts = (list) => {
        var result = null;
        if (list.length > 0) {
            result = list.map((item, index) => {
                return item.title ? <div className='footer-contact' key={index}>
                    <i className={`${item.icon} icon-footer-contact`}></i>
                    <div className='colcation-conten'>
                        <h4 className='footer-contact-title'>
                            {item.title}
                        </h4>
                        <p className='footer-contact-conten'>
                            {item.content}
                        </p>
                    </div>
                </div> : <p className='footer-contact-conten' key={index}>
                            {item}
                        </p>
            })
        };
        return result;
    }

    showPaymentMethod = (listMethod) => {
        var result = null;
        if (listMethod.length > 0) {
          result =  listMethod.map((method, index) => {
                return   <div className='payment_methods' key={index}>
                            <img className='icon_pay_by' src={method.icon} alt='icon-pay-by' />
                            <p className='pay-for'>{method.method}</p>
                        </div>
            })
        }
        return result;
    }

    render() {
        return (
            <div className='footer'>
                <div className="container">
                    <div className="row footer-conten">
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 ">
                            <h3 className='footer-heading'>LIÊN HỆ</h3>
                            {this.showListFooterContacts(footer.listFooterContacts)}
                        </div>
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 ">
                            <h3 className='footer-heading'>DỊCH VỤ</h3>
                            {this.showListFooterContacts(footer.serviceFooter)}
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                            <h3 className='footer-heading'>XEM TRÊN GOOGLE MAP</h3>
                            <iframe className='location-footer' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4737883168486!2d105.73291811476372!3d21.05373098598486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1632146340909!5m2!1svi!2s" title='địa chỉ' loading="lazy"></iframe>
                        </div>
                      
                    </div>

                    <div className="row payment-methods">

                        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                            <h3 className='footer-heading'>Phương thức thanh toán</h3>
                            <div className='list_payment_methods'>
                            
                                {this.showPaymentMethod(footer.listpaymentmethods)}
                            </div>
                        </div>

                        <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                            <h3 className='footer-heading'>Danh sách các ngân hàng thanh toán online</h3>
                            <img className='img-sp-bank' src='https://demo037082.web30s.vn/datafiles/33401/upload/images/album/banklist.png?t=1630314984' alt='ngân hàng hỗ trợ'/>
                        </div>

                    </div>
                    <hr />
                    <h3 className='by'>Tiết kế wedsite bởi
                        <a href='https://www.facebook.com/pham.haj.988/'> Phạm Văn Hải</a>
                    </h3>

                </div>

            </div>
        );
    }
}

export default Footer;