import axios from "axios";
import * as Config from '../constants/config';

export default function callApi(endpoint, method = 'GET', body){
    return  axios({
        method : method,
        url : `${Config.apiUrl}/${endpoint}`,
        data : body
    }).catch(err=>{
        console.log(err);
    });
}