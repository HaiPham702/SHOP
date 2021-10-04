import React, { Component } from 'react';
import './Notify.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/action';

class Notify extends Component {
    componentDidMount(){
        setTimeout(()=>{ 
            this.props.closeToast({},false)
         }, 3000);
    }

    closeToast = () =>{
        this.props.closeToast({},false)
    }

    render() {
        var { title, message, type } = this.props.content;
        var icon, types;
        switch (type) {
            case 'success':
                icon = <i className="far fa-check-circle"></i>;
                types = 'toast--success';
                break;
            case 'info':
                icon = <i className="fas fa-info-circle"></i>;
                types = 'toast--info';
                break;
            case 'warning':
                icon = <i className="fas fa-exclamation-triangle"></i>;
                types = 'toast--warning';
                break;
            case 'error':
                icon = <i className="fas fa-exclamation-circle"></i>;
                types = 'toast--error';
                break;
            default:

                break;
        }

        return (
            <div className='Notify'>
                <div className={`toast ${types}`}>
                    <div className='toast__icon'>
                        {icon}
                    </div>
                    <div className='toast_bory'>
                        <h3 className='toast__title'>{title}</h3>
                        <p className='toast__mgs'>{message}</p>
                    </div>
                    <div className='toast_close' onClick={this.closeToast}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeToast: (data, st) => {
            dispatch(actions.actShowNotify(data, st))
        }
    }
}

export default connect(null, mapDispatchToProps)(Notify);