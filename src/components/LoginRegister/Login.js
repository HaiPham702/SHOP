import React, { useState } from 'react';
import firebase from '../../firebase/config';
import { connect } from 'react-redux';
import * as actions from '../../actions/action';
import * as mess from '../../constants/message';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';


const Login = props => {
    var history = useHistory();

    const [valueRegister, setValueRegister] = useState({
        email: '',
        password: '',
    })

    const [checkbox, setCheckbox] = useState(false)
   

    async function onLoginWithGG() {
        var provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        try {
            const user = await firebase.auth().currentUser;
            props.actsetUserLogger({
                fullName: user.displayName,
                email: user.email,
                avatar: user.photoURL,
            });
            props.onShowNofity({
                title: 'Success',
                message: 'Đăng nhập thành công',
                type: 'success'
            }, true)
            history.push('/');
        } catch {
            props.onShowNofity({
                title: 'Error',
                message: 'Đăng nhập không thành công',
                type: 'error'
            }, true)
        }
    }

    // func Logout
    async function onLogout() {
        try {
            var user = await firebase.auth().signOut();
            props.actsetUserLogger('');
            props.onShowNofity({
                title: 'Infor',
                message: 'Tài khoản đã được đăng xuất',
                type: 'info'
            }, true);
            history.push('/');
        } catch {
            props.onShowNofity({
                title: 'Error',
                message: 'Xảy ra lỗi trong quá trình đăng xuất',
                type: 'error'
            }, true)
        }
    }

    

    // set value state to input when onchange
    function onchanges(e) {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        setValueRegister(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    // remove warning when keydown (input have value)
    function checkValidationkeyDown(e) {
        var inputElement = e.target;
        var messageElement = inputElement.parentElement.querySelector('.mess_validation');

        inputElement.classList.remove('vadidate');
        messageElement.innerText = '';
    }


    //check validation on blur
    function checkValidation(e) {
        var inputElement = e.target;
        var messageElement = inputElement.parentElement.querySelector('.mess_validation');
        //warning when input not value
        if (inputElement.value === '') {
            inputElement.classList.add('vadidate');
            messageElement.innerText = mess.VALIDATION_MESSAGE;
        }
        //warning when value is not email
        else if (inputElement.type === 'email') {
            var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (filter.test(inputElement.value)) {
                inputElement.classList.remove('vadidate');
                messageElement.innerText = '';
            } else {
                inputElement.classList.add('vadidate');
                messageElement.innerText = mess.VALIDATION_EMAIL_ERROR;
            }
            //warning when password less than 8 char
        } else if (inputElement.name === 'password') {
            if (inputElement.value.length < 8) {
                inputElement.classList.add('vadidate');
                messageElement.innerText = mess.VALIDATION_PASSWORD_WARNING;
            } else {
                inputElement.classList.remove('vadidate');
                messageElement.innerText = '';
            }
        }
        //when password not match
        else if (inputElement.name === 'rePassword') {
            if (inputElement.value !== valueRegister.rePassword) {
                inputElement.classList.add('vadidate');
                messageElement.innerText = mess.REPASSWORD_NO_EXACT;
            }
        }
        else {
            inputElement.classList.remove('vadidate');
            messageElement.innerText = '';
        }
    }

    // show password
    function onChecked(e) {
        var value = e.target.checked;
        setCheckbox(value)
    }
    // login with email and password
    function loginWithEmailPassword  () {
        firebase.auth().signInWithEmailAndPassword(valueRegister.email, valueRegister.password)
            .then(async () => {
                const user = await firebase.auth().currentUser;
                props.actsetUserLogger({
                    fullName: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                });
                props.onShowNofity({
                    title: 'Success',
                    message: 'Đăng nhập thành công',
                    type: 'success'
                }, true);
                history.push('/');
            })
            .catch((error) => {
                props.onShowNofity({
                    title: 'Error',
                    message: 'Tên tài khoản hoặc mật khẩu không chính xác',
                    type: 'error'
                }, true)
            });
    }
    return (
        <div className='login-register'>
            <h3 className='heding_login'>
                Đăng nhập
            </h3>
            <div className="form-group">
                <label >Email: </label>
                <input type="email" className="form-control" value={valueRegister.email} placeholder="VD: email@domain.com" name='email'
                    onChange={onchanges}
                    onBlur={checkValidation}
                    onKeyDown={checkValidationkeyDown}
                />
                <span className='mess_validation'></span>
            </div>

            <div className="form-group">
                <label >Mật khẩu: </label>
                <input type={checkbox ? 'text' : 'password'} className="form-control" placeholder="Nhập mật khẩu" name='password'
                    value={valueRegister.password}
                    onChange={onchanges}
                    onBlur={checkValidation}
                    onKeyDown={checkValidationkeyDown}
                />
                <span className='mess_validation'></span>
            </div>

            <div className="checkbox">
                <label>
                    <input type="checkbox" value={checkbox}
                        onChange={onChecked}
                    />
                    Hiển thị mật khẩu
                </label>
            </div>

            <div className="btn_login"
                onClick={loginWithEmailPassword}
            >ĐĂNG NHẬP</div>
            <div className='login_to_register'>
                Bạn đã có tài khoản? <Link to='/register'>ĐĂNG KÝ</Link>
            </div>

            <div className='loginWithGg' onClick={onLoginWithGG}>
                <img src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' className='icon_login' />
                <p>Đăng nhập với Google</p>
            </div>
            <div className='loginWithGg' onClick={onLogout}>Đăng xuất</div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actsetUserLogger: (userLogger) => {
            dispatch(actions.actLogin(userLogger))
        },
        onShowNofity: (content, st) => {
            dispatch(actions.actShowNotify(content, st))
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);