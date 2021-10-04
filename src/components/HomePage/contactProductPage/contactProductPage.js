import React, { Component } from 'react';
import './contactHomePage.css'
import {connect} from 'react-redux';
import * as actions from '../../../actions/action';

class contactProductPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : ''
        };
    }

    onchangEmail = (e) =>{
        this.setState({
            value : e.target.value
        })
    }

    onSubmit = () =>{
        var {value} = this.state;
        var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (filter.test(value))
        {
            this.props.showMessage({
                title : 'Success',
                message : 'Cảm ơn bạn đã đăng ký trên hệ thống của chúng tôi',
                type : 'success',
            },true)
        }else{
            this.props.showMessage({
                title : 'Warning',
                message : 'Email không hợp lệ',
                type : 'warning',
            },true)
        }
        this.setState({
            value: ''
        })    
    }
    render() {
        return (
            <div className='contact_home_page'>
                <div className='take_place'>
                    <h2 className='title_contact'>
                        THAM GIA BẢN TIN CỦA CHÚNG TÔI
                    </h2>
                    <p className='contact_discription'>
                        Xin chào, bạn chỉ mất vài giây để đăng kí để nhận được các thông báo mới nhất và <br/> trương trình khuyến mãi của chúng tôi
                    </p>
                    <div className='box_input_contact_homePage'>
                        <input className='input_contact_homePage' 
                            type='email' 
                            placeholder='Địa chỉ Email.....'
                            value = {this.state.value}
                            onChange = {this.onchangEmail}
                        />
                        <div className='register_btn_contact_homePage' 
                        onClick = {this.onSubmit}
                        >ĐĂNG KÝ</div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        showMessage : (content,st) =>{
            dispatch(actions.actShowNotify(content,st));
        }
    }
}

export default connect(null,mapDispatchToProps)(contactProductPage);