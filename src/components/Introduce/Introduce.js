import React, { Component } from 'react';
import listIntroduce from './listIntroduce';
import './introduce.css';
import "animate.css";

class Introduce extends Component {
    showIntroduce = (introduces) =>{
        var result = null;
        if(introduces.length > 0){
            result = introduces.map((introduce,index) =>{
                return <div className='item-introduce' key={index}>
                            <h4 className='heading-introduce animate__animated animate__fadeInUp animate__delay-1.5'>{introduce.title}</h4>
                            {!introduce.image ? undefined : introduce.image.map((img,index) =>{
                                return  <img src={img} alt='img-introduce animate__animated animate__flipInY animate__delay-1.5' key={index}/>
                                          
                            })}
                        </div>
            })
        }
        return result;
    }
    render() {
        return (
            <React.Fragment>
                <img className='img-introduce animate__animated animate__bounceInLeft animate__delay-1.5' src='https://demo037082.web30s.vn/image-process/get-image-v3?path=/datafiles/web30s/upload/images/7000-7100/30S-03-7082/banner-detail.png&width=0' alt='img-introduce' />
                <div className='conten-introduce animate__animated animate__bounceInUp animate__delay-1.5'>
                    <p>
                        Xuất thân từ cửa hàng kinh doanh máy tính được thành lập từ năm 1997, Intech được biết đến là đơn vị bán lẻ lâu đời và uy tín tại Việt Nam. Intech chuyên kinh doanh các sản phẩm công nghệ thông tin, thiết bị giải trí game, thiết bị văn phòng và thiết bị hi-tech của nhiều nhãn hàng lớn như Dell, Asus, HP, MSI, Lenovo…
                        Sau 23 năm phát triển không ngừng, Intech hướng đến mục tiêu không chỉ là nơi kinh doanh máy tính mà còn là nơi khách hàng có thể tìm thấy mọi tiện ích công nghệ hiện đại và dịch vụ chất lượng cao.
                    </p>
                </div>
                {this.showIntroduce(listIntroduce)}
            </React.Fragment>
        );
    }
}

export default Introduce;