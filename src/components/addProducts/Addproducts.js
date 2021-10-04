import React, { Component } from 'react';
import './Addproducts.css';
import * as mess from '../../constants/message'
import listproducts from '../HomePage/HomepageSideBar/listproducts';
import { connect } from 'react-redux'
import * as action from '../../actions/action';

class Addproducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            status: true,
            discription: '',
            ratings: 0,
            count: 0,
            discount: 0,
            image: '',
            image1: '',
            image2: '',
            image3: '',
            brand: '',
            model: '',
            classify: -1,
            category: '',
            origin: ''
        }
    }

    componentDidMount = () =>{
        document.addEventListener('keydown',(e)=>{
            switch (e.which) {
                case 13:
                    this.addProduct();
                    break;
            
                default:
                    break;
            }
        })
    }

    onchanges = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }

    //push product to api
    addProduct = () => {
        var { history } = this.props;
        var { name, price, status, discription, ratings, count, image, image1, image2, image3, brand, model, classify, category } = this.state;
        if (name && price && status !== 0 && discription && ratings && count && image && image1 && image2 && image3 && brand && model && classify !== -1 && category !== -1) {
            history.goBack('/');
           this.props.postProduct(this.state)
        } else {
            this.props.showNotify({
                title: 'Warning',
                message: mess.POST_PRODUCT_WARNING,
                type: 'warning',
            }, true);
        }
    }

    showclassify = (listclassify) => {
        var result = null;
        if (listclassify && listclassify.length > 0) {
            result = listclassify.map((classify, index) => {
                return <option value={classify.id}
                    key={index}
                >{classify.name}
                </option>
            })
        }
        return result;
    }

    categorizationList = (listclassify, id) => {
        var result = null;
        for (var i = 0; i < listclassify.length; i++) {
            if (listclassify[i].id === Number(id) && listclassify[i].more !== null) {
                result = listclassify[i].more.map((value, index) => {
                    return <option key={index} value={value.id}>{value.name}</option>
                })
            }
        }
        return result;
    }

    checkValidaton = (e) => {
        var inputElement = e.target;
        var messageElement = inputElement.parentElement.querySelector('.message');
        if (e.target.value === '') {
            inputElement.classList.add('invalit');
            messageElement.innerText = 'Vui lòng nhập trường này !!';
        } else {
            inputElement.classList.remove('invalit');
            messageElement.innerText = '';
        }

    }

    render() {
     

        return (
            <div>

                <form >
                    <legend>Thêm sản phẩm mới</legend>

                    <div className='row'>
                        <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                            <div className="form-group">
                                <label >Tên sản phẩm: </label>
                                <i className="fas fa-star-of-life start_caution"></i>
                                <input type="text" className="form-control" onChange={this.onchanges} name='name' placeholder='VD: Sản phẩm 1'
                                    onBlur={this.checkValidaton}
                                    onInput={this.checkValidaton}
                                />
                                <div className='message'></div>
                            </div>
                            <div className="form-group">
                                <label >Mã sản phẩm:</label>
                                <i className="fas fa-star-of-life start_caution"></i>
                                <input type="text" className="form-control" onChange={this.onchanges} name='model' placeholder='VD: SP01'
                                    onBlur={this.checkValidaton}
                                    onInput={this.checkValidaton}
                                />
                                <div className='message'></div>
                            </div>
                            <div className="form-group">
                                <label >Xuất xứ</label>
                                <i className="fas fa-star-of-life start_caution"></i>
                                <input type="text" className="form-control" onChange={this.onchanges} name='origin' placeholder='VD: Japan'
                                    onBlur={this.checkValidaton}
                                    onInput={this.checkValidaton}
                                />
                                <div className='message'></div>
                            </div>
                            <div className="form-group">
                                <label >Giá bán :</label>
                                <i className="fas fa-star-of-life start_caution"></i>
                                <input type="number" className="form-control" onChange={this.onchanges} name='price' placeholder='VD: 2000'
                                    onBlur={this.checkValidaton}
                                    onInput={this.checkValidaton}
                                />
                                <div className='message'></div>
                            </div>
                            <div className="form-group">
                                <label >Đánh giá :</label>
                                <i className="fas fa-star-of-life start_caution"></i>
                                <input className="form-control" type="number" name='ratings' onChange={this.onchanges} placeholder='VD: 3.5'
                                    onBlur={this.checkValidaton}
                                    onInput={this.checkValidaton}
                                />
                                <div className='message'></div>
                            </div>
                            <div className="form-group">
                                <label >Lượt đánh giá :</label>
                                <i className="fas fa-star-of-life start_caution"></i>
                                <input className="form-control" type="number" name='count' onChange={this.onchanges} placeholder='VD: 150'
                                    onBlur={this.checkValidaton}
                                    onInput={this.checkValidaton}
                                />
                                <div className='message'></div>
                            </div>

                            <div className='row'>

                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <select className="form-select form-select-lg mb-3" name='classify'
                                        onChange={this.onchanges}
                                    >
                                        <option value={-1}>Phân loại sản phẩm</option>
                                        {this.showclassify(listproducts)}
                                    </select>
                                    <i className="fas fa-star-of-life start_caution"></i>

                                </div>

                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                                    <select className="form-select form-select-lg mb-3" name='category'
                                        onChange={this.onchanges}
                                    >
                                        <option value={-1}>Danh Mục</option>
                                        {this.categorizationList(listproducts, this.state.classify)}
                                    </select>

                                    <i className="fas fa-star-of-life start_caution"></i>
                                </div>

                            </div>

                        </div>

                        <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>

                            <div className="form-group">
                                <label >Giảm giá :</label>
                                <i className="fas fa-star-of-life start_caution"></i>
                                <input type="range" value={this.state.discount} min="0" max="100" step='1' name='discount' onChange={this.onchanges} />
                                {this.state.discount}%
                            </div>
                            <div className="form-group">
                                <label >Thương hiệu</label>
                                <i className="fas fa-star-of-life start_caution"></i>
                                <input type="text" className="form-control" onChange={this.onchanges} name='brand' placeholder='VD: SAMSUNG'
                                    onBlur={this.checkValidaton}
                                    onInput={this.checkValidaton}
                                />
                                <div className='message'></div>
                            </div>
                            <div className="form-group">
                                <label >Mô tả :</label>
                                <i className="fas fa-star-of-life start_caution"></i>
                                <textarea type="text" className="form-control text_area_addproducts" onChange={this.onchanges} name='discription' placeholder='VD: mô tả về sản phẩm'
                                    onBlur={this.checkValidaton}
                                    onInput={this.checkValidaton}
                                />
                                <div className='message'></div>
                            </div>

                            <div className="row">

                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div className="form-group">
                                        <label >Ảnh chính</label>
                                        <i className="fas fa-star-of-life start_caution"></i>
                                        <input type="text" className="form-control" onChange={this.onchanges} name='image' placeholder='VD: URL-image'
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div className="form-group">
                                        <label >Ảnh 1</label>
                                        <i className="fas fa-star-of-life start_caution"></i>
                                        <input type="text" className="form-control" onChange={this.onchanges} name='image1' placeholder='VD: URL-image' />
                                    </div>
                                </div>
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div className="form-group">
                                        <label >Ảnh 2</label>
                                        <i className="fas fa-star-of-life start_caution"></i>
                                        <input type="text" className="form-control" onChange={this.onchanges} name='image2' placeholder='VD: URL-image' />
                                    </div>
                                </div>
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div className="form-group">
                                        <label >Ảnh 3</label>
                                        <i className="fas fa-star-of-life start_caution"></i>
                                        <input type="text" className="form-control" onChange={this.onchanges} name='image3' placeholder='VD: URL-image' />
                                    </div>
                                </div>

                            </div>

                            <select className="form-select" onChange={this.onchanges} name='status' >
                                <option value={0}>Tình trạng</option>
                                <option value={true} >Còn hàng</option>
                                <option value={false}>Hết hàng</option>
                            </select>
                            <i className="fas fa-star-of-life start_caution"></i>
                        </div>
                    </div>


                    <div type="submit" className="btn_add_product" onClick={this.addProduct}>Thêm sản phẩm</div>
                </form>

            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        showNotify: (content, st) => {
            dispatch(action.actShowNotify(content, st));
        },
        postProduct : (product) =>{
            dispatch(action.actPostProductRequest(product))
        }
    }
}

export default connect(null, mapDispatchToProps)(Addproducts);