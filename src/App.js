import React, { Component } from 'react';
import Header from './components/Header/Header';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import routers from './router';
import Notify from './components/Notify/Notify';
import {connect} from 'react-redux';
import * as action from './actions/action';



class App extends Component {

    showContenPage = (routers) => {
        if (routers.length > 0) {
            var contenPages = routers.map((router,index) => {
                return <Route
                    key = {index}
                    path={router.to}
                    exact={router.exact}
                    component={router.main}
                />
            })
        }
        return contenPages;
    }

    showNotify = (data) =>{
        var result = null;
        if(data.status === true){
            result = <Notify
                    content = {data.content}
            />
        }
        return result;
    }

    render() {
        var {statusNotify} = this.props;
        return (
            <Router>
                <div className="app">
                    <Header />
                    {this.showNotify(statusNotify)}
                    <div className='container page-conten'>
                        <Switch>
                            {this.showContenPage(routers)}
                        </Switch>
                    </div>
                </div>
                <Footer/>
                
            </Router>
        );
    }
}

const mapStateToProps = state =>{
    return {
        statusNotify : state.showNotify
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        showNotify: (content,st) =>{
            dispatch(action.actShowNotify(content,st));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);