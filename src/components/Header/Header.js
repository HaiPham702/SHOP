import React, { Component } from 'react';
import './header.css';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import firebase from '../../firebase/config';
import * as actions from '../../actions/action';



class Header extends Component {

    style = (url) => {
        return {
            backgroundImage: `url(${url})`,
        }
    }

    async onLogout (){
        try{
            var user = await  firebase.auth().signOut();
            this.props.actsetUserLogger('');
            this.props.onShowNofity({
                title: 'Infor',
                message : 'Tài khoản đã được đăng xuất',
                type : 'info'
            },true)
        }catch{
            this.props.onShowNotify({
                title: 'Warning',
                message:'Xảy ra lỗi trong quá trình đăng xuất',
                type: 'warning'
            },true)
        }
    }

    render() {
        var { userLoggeds } = this.props;
        var userLogged = !!userLoggeds;
        return (
            <header>
                <div className="container">
                    <div className="top">
                    </div>
                    <div className="nav-bar">
                        <img className="logo" src="./get-image-v3.png" alt="logo-shop" />
                        <div className="box-search">
                            <input className="input-search" type="text" />
                            <i className="fas fa-search search-icon" />
                        </div>
                        <div className="tag">
                            <div className="promotion">
                                <i className="fas fa-tag" />
                                <p>Khuyến mãi</p>
                            </div>
                            <div className="account">
                                {userLoggeds.avatar !== null && userLogged ?
                                    <span className='account_avt' style={this.style(userLoggeds.avatar)} ></span> :
                                    <i className="fas fa-user-circle" />
                                }
                                <p>
                                    {userLogged ? userLoggeds.fullName :
                                        'Tài khoản'}
                                </p>
                                <ul className='login_register'>
                                    <li className='login'>
                                        <Link to='/login'>Đăng nhập</Link>
                                    </li>
                                    <li className='register'>
                                        <Link to='/register'>Đăng ký</Link>
                                    </li>
                                    {userLogged ?
                                        <li className='account_login'>
                                            <Link to='/account'>{userLoggeds.fullName}</Link>
                                        </li>
                                        : null}
                                    {userLogged ?
                                        <li className='account_login' onClick={this.onLogout}>
                                            Đăng xuất
                                        </li>
                                        : null}
                                </ul>
                            </div>
                            <Link to='/cart' className="cart">
                                <i className="fas fa-shopping-cart" />
                                <p>Giỏ hàng</p>
                            </Link>
                        </div>
                    </div>
                    <div className="menu">
                        <ul className="menu-list">
                            <li className="menu-item">
                                <NavLink to='/' exact activeClassName='active' className="menu-item-link">TRANG CHỦ</NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to='/introduce' activeClassName='active' className="menu-item-link">GIỚI THIỆU</NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to='/products' activeClassName='active' className="menu-item-link">
                                    SẢN PHẨM
                                    <i className="fas fa-angle-down header-more-icon"></i>
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to='/service' activeClassName='active' className="menu-item-link">DỊCH VỤ</NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to='/library-page' activeClassName='active' className="menu-item-link">TIN TỨC
                                    <i className="fas fa-angle-down header-more-icon"></i>
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to='contact-page' activeClassName='active' className="menu-item-link">LIÊN HỆ</NavLink>

                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        userLoggeds: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actsetUserLogger: (userLogger) => {
            dispatch(actions.actLogin(userLogger))
        },
        onShowNotify: (content,ts) =>{
            dispatch(actions.actShowNotify(content,ts))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);