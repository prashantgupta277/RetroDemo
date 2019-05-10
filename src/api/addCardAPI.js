
import { BASE_URL } from '../constants';

class addCardAPI {
    
    static submit_CreteCard(data) {

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

            console.log(err)

        }
    }
}  

export default addCardAPI;