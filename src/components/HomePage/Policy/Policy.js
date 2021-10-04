import React, { Component } from 'react';
import listPolicys from './listPolicy';
import './Policy.css';



class Policy extends Component {
    showPolicy = (listPolicy)=>{
        var result = null;
        if(listPolicy.length > 0){
            result = listPolicy.map((policy,index) =>{
                return <div className='list-policy' key={index}>
                            <img src={policy.image} alt={index}/>
                            <div className='policy-conten'>
                                <h4 className='policy-title'>
                                    {policy.name}
                                </h4>
                                <p className='policy-text'>
                                    {policy.conten}
                                </p>
                            </div>
                        </div>
            })
        }
        return result;
    }
    render() {
        return (
            <div className='policy'>
              
                {this.showPolicy(listPolicys)}
            </div>
        );
    }
}

export default Policy;