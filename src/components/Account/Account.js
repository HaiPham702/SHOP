import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Account.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/action';
import firebase, { storage } from '../../firebase/config';

const Account = props => {

    var user = props.userLogged;
    const [profile, setProfile] = useState({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        sex: user.sex,
        birday: user.birday,
        avatar: user.avatar ? user.avatar : 'https://tse2.mm.bing.net/th?id=OIP.HAlzz7_SUXjXKwsKkyBmJQHaHa&pid=Api&P=0&w=300&h=300'
    })

    const [image,setImage] = useState(null);

    function style() {
        return {
            backgroundImage: `url(${profile.avatar})`,
        }
    }

    function setState(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function saveProfile() {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: profile.fullName,
            email: profile.email,
            phoneNumber: profile.phone,
            sex: profile.sex,
            birday: profile.birday,
            photoURL: profile.avatar,
        }).then(() => {
            props.onchangeProfile(profile);
            props.onShowNofity({
                title: 'Success',
                message: 'Cập nhật thành công',
                type: 'success'
            }, true);
        }).catch(() => {
            props.onShowNofity({
                title: 'Error',
                message: 'Cập nhật thất bại',
                type: 'error'
            }, true);
        });
    }

    const uploatFile = () => {
        var metadata = {
            contentType: 'image/jpeg'
        };

        var uploadTask = storage.ref(`image/user/${image.name}`).put(image);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;


                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                    var avatar = await downloadURL;
                    setProfile((a)=>{
                        return {
                            ...a,
                            avatar
                        }
                    })
                });
            }
        );

    }

    const onFileDrop  = (e) => {
        const newFile = e.target.files[0];
        setImage(newFile);
    }

    return (
        <div className='account_user'>
            <div className='account_heading'>
                <h3>Hồ sơ của tôi</h3>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <div className='row profile'>

                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">

                    <table className="table_profile">
                        <tbody>
                            <tr>
                                <td className='col_1'>
                                    <span>Tên</span>
                                </td>
                                <td className='col_2'>
                                    <input type='text' onChange={setState} name='fullName'
                                        value={profile.fullName}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='col_1'>
                                    <span>
                                        Email

                                    </span>
                                </td>
                                <td className='col_2'>
                                    <input type='text' onChange={setState} name='email'
                                        value={profile.email}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='col_1'>
                                    <span>
                                        Số điện thoại
                                    </span>
                                </td>
                                <td className='col_2'>
                                    <input type='text' className='phone_profile'
                                        value={profile.phone}
                                        name='phone'
                                        onChange={setState}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='col_1'>
                                    <span> Giới tính</span>
                                </td>
                                <td className='col_2'>
                                    <input type="radio" id='male' value='male' name='sex' onChange={setState} />
                                    <label htmlFor='male'>Nam</label>
                                    <input type="radio" id='female' value='female' name='sex' onChange={setState} />
                                    <label htmlFor='female'>Nữ</label>
                                    <input type="radio" id='more' value='more' name='sex' onChange={setState} />
                                    <label htmlFor='more'>Khác</label>
                                </td>
                            </tr>
                            <tr>
                                <td className='col_1'>
                                    <span>
                                        Ngày sinh
                                    </span>
                                </td>
                                <td className='col_2'>
                                    <input type="date" name="birday"
                                        value={profile.birday}
                                        onChange={setState}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='btn_save_profile'
                        onClick={saveProfile}
                    >Lưu</div>
                </div>

                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col_img">
                    <div className='image_account'>
                        <div className='image_profile' style={style()}></div>
                        <input type='text' className='URL_image' placeholder='URL avarta'
                            onChange={setState}
                            name='avatar'
                        />

                        <input type="file" value="" onChange={onFileDrop}/>
                        <div className='btn_save_profile' onClick={uploatFile} >Tải tệp lên</div>

                    </div>
                </div>


            </div>
        </div>
    );
};

Account.propTypes = {
    use: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        userLogged: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onchangeProfile: (data) => {
            dispatch(actions.actChangeInforProfile(data))
        },
        onShowNofity: (content, st) => {
            dispatch(actions.actShowNotify(content, st))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Account);