
import { BASE_URL } from '../constants';
// import { sha3_512 } from 'js-sha3';

class editTemplateApi {
    
    static getEditTemplate(data) {

        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            });
            let body = {
                method: 'post',
                headers: ajaxRequestHeaders,
                body: JSON.stringify(data)
            }
            return fetch(BASE_URL, body).then(response => {
                return response.json();
            }).catch(error => {
                console.log(error);
                return error;
            });
        }catch(err){

        }
    }
}  

export default editTemplateApi;