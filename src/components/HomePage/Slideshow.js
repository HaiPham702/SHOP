import React, { Component } from 'react';

var t ;

class Slideshow extends Component {
      
    showslide = ()=>{
        var counter = 1;
       t = setInterval(() => {
                document.getElementById('radio' + counter).checked = true;
                counter++;
                if (counter  > 3) {
                    counter = 1;
                }
            }, 5000)
    }

    componentDidMount() {
       this.showslide();
    }

    componentWillUnmount(){
       clearInterval(t)
    }
    

    render() {
        return (
            <div className='slider'>
                <div className='slides'>
                    <input type='radio' name='radio-btn' id='radio1' />
                    <input type='radio' name='radio-btn' id='radio2' />
                    <input type='radio' name='radio-btn' id='radio3' />
                    <input type='radio' name='radio-btn' id='radio4' />

                    <div className='slide first'>
                        <img className='img-slide' src='https://demo037082.web30s.vn/datafiles/33401/upload/images/banner/banner3.png?t=1629946377' alt='' />
                    </div>
                    <div className='slide'>
                        <img className='img-slide' src='https://demo037082.web30s.vn/datafiles/33401/upload/images/banner/banner1.png?t=1629946377' alt='' />
                    </div>
                    <div className='slide'>
                        <img className='img-slide' src='https://demo037082.web30s.vn/datafiles/33401/upload/images/banner/banner2.png?t=1629946377' alt='' />
                    </div>


                </div>

                <div className='navigation-manual'>
                    <label htmlFor='radio1' className='manual-btn'></label>
                    <label htmlFor='radio2' className='manual-btn'></label>
                    <label htmlFor='radio3' className='manual-btn'></label>
                </div>
            </div>
        );
    }
}



export default Slideshow;