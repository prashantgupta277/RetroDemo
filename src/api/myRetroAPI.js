
import { BASE_URL } from '../constants';

class myRetroApi {
    
    
    static getRetroList(data) {
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

    static retroDetail(data) {
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

    static doUpdateRetro(data) {
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

    static doStartRetro(data) {
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

    static toJoinRetro(data) {
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

    static deleteRetro(data) {
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

export default myRetroApi;