import React, { useState } from 'react';
import './LoginRegister.css';
import * as mess from '../../constants/message';
import {connect} from 'react-redux';
import * as actions from '../../actions/action';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/config';
import { useHistory } from 'react-router';

const LoginRegister = props => {
    var history = useHistory();

    const [register,setRegister] = useState({
        fullName: '',
        email: '',
        password: '',
        rePassword: ''
    })
    
    const [checkbox,setCheckbox] = useState(false)

    function checkValidation(e) {
        var inputElement = e.target;
        var messageElement = inputElement.parentElement.querySelector('.mess_validation');
        if (inputElement.value === '') {
            inputElement.classList.add('vadidate');
            messageElement.innerText = mess.VALIDATION_MESSAGE;
        } else if(inputElement.type === 'email') {
            var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if(filter.test(inputElement.value)){
                inputElement.classList.remove('vadidate');
                messageElement.innerText = '';
            }else{
                inputElement.classList.add('vadidate');
                messageElement.innerText = mess.VALIDATION_EMAIL_ERROR;
            }
        }else if(inputElement.name === 'password'){
            if(register.password.length < 8){
                inputElement.classList.add('vadidate');
                messageElement.innerText = mess.VALIDATION_PASSWORD_WARNING;
            }else{
                inputElement.classList.remove('vadidate');
                messageElement.innerText = '';
            }
        }
        else if(inputElement.name === 'rePassword'){
            if(register.password !== register.rePassword){
                inputElement.classList.add('vadidate');
                messageElement.innerText = mess.REPASSWORD_NO_EXACT;
            }
        }
        else{
            inputElement.classList.remove('vadidate');
            messageElement.innerText = '';
        }
    }

    function onchanges(e) {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        setRegister(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    function checkValidationkeyDown(e) {
        var inputElement = e.target;
        var messageElement = inputElement.parentElement.querySelector('.mess_validation');

        inputElement.classList.remove('vadidate');
        messageElement.innerText = '';
    }

    function onRegister (){
        var validation = Array.from(document.querySelectorAll('.vadidate'));
        var {fullName,email,password,rePassword} = register;
        console.log(validation.length)
        if(!validation.length && fullName && email && password && rePassword) {
                props.onShowNofity({
                    title: 'Success',
                    message : mess.REGISTER_SUCCESS,
                    type : 'success'
                },true)        
            
        }else{
            props.onShowNofity({
                title: 'Warning',
                message : mess.LOGIN_VALIDATIN_WARNING,
                type : 'warning'
            },true)
        }
    }

    // show password
    function onChecked(e){
        var value = e.target.checked;
        setCheckbox(value)
    }


    //create user with emil and password
    const registerWithEmailPassword = () => {
        //warning when validation
        var validation = Array.from(document.querySelectorAll('.vadidate'));
        var {fullName,email,password,rePassword} = register;
        //registe when validation
        if(!validation.length && fullName && email && password && rePassword) {
            // create user with email
            firebase.auth().createUserWithEmailAndPassword(register.email, register.password)
            .then((userCredential) => {
                console.log(userCredential.user);
                props.onShowNofity({
                    title: 'Success',
                    message: 'Đăng ký thành công',
                    type: 'success'
                }, true);
                history.push('/');
                const user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: register.fullName,
                  }).then(() => {
                    console.log('user register: ',user)
                  }).catch((error) => {
                   
                  });
            })
            .catch((error) => {
                props.onShowNofity({
                    title: 'Error',
                    message: 'Email đã tồn tại',
                    type: 'error'
                }, true)
            });     
            
        }else{
            props.onShowNofity({
                title: 'Warning',
                message : mess.LOGIN_VALIDATIN_WARNING,
                type : 'warning'
            },true)
        }
    }

        
    

    return (
        <div className='login-register'>
            <h3 className='heding_login'>
               Đăng ký
            </h3>
            <form>
                <div className="form-group">
                    <label >Tên đầy đủ: </label>
                    <input type="text" className="form-control" value={register.fullName} placeholder="VD: Phạm Văn Hải" name='fullName'
                        onChange={onchanges}
                        onBlur={checkValidation}
                        onKeyDown={checkValidationkeyDown}
                    />
                    <span className='mess_validation'></span>
                </div> 
                
                <div className="form-group">
                    <label >Email: </label>
                    <input type="email" className="form-control" value={register.email} placeholder="VD: email@domain.com" name='email'
                        onChange={onchanges}
                        onBlur={checkValidation}
                        onKeyDown={checkValidationkeyDown}
                    />
                    <span className='mess_validation'></span>
                </div>
                <div className="form-group">
                    <label >Mật khẩu: </label>
                    <input type={checkbox ? 'text' : 'password'} className="form-control" placeholder="Nhập mật khẩu" name='password'
                        value = {register.password}
                        onChange={onchanges}
                        onBlur={checkValidation}
                        onKeyDown={checkValidationkeyDown}
                    />
                    <span className='mess_validation'></span>
                </div>
                <div className="form-group">
                    <label >Nhập lại mật khẩu: </label>
                    <input type={checkbox ? 'text' : 'password'} className="form-control" placeholder="Nhập lại mật khẩu" name='rePassword'
                        value = {register.rePassword}
                        onChange={onchanges}
                        onBlur={checkValidation}
                        onKeyDown={checkValidationkeyDown}
                    />
                    <span className='mess_validation'></span>
                </div>
                
                <div className="checkbox">
                    <label>
                        <input type="checkbox" value={checkbox}
                        onChange = {onChecked}
                        />
                        Hiển thị mật khẩu
                    </label>
                </div>
                <div className="btn_login" onClick={registerWithEmailPassword}>ĐĂNG KÝ</div>
    
                <div className='login_policy'>
                    Bằng với việc đăng ký bạn đã đồng ý về điều khoản & dịch vụ của Website    
                 </div>
          
            
                <div className='login_to_register'>
                    Bạn đã có tài khoản? <Link to='/login'>ĐĂNG NHẬP</Link>
                </div>
                
            </form>

        </div>
    );
};

const mapDispacthToProps = dispatch =>{
    return {
        onShowNofity : (content,st) =>{
            dispatch(actions.actShowNotify(content,st))
        },
        onShowNofity : (content,st) =>{
            dispatch(actions.actShowNotify(content,st))
        }
    }
}

export default connect(null,mapDispacthToProps)(LoginRegister);