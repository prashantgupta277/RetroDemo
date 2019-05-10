
import { BASE_URL } from '../constants';

class createThoughtApi {
    
    
    static createThought(data) {
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

    static fetchThought(data) {
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

    static updateThought(data) {
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


    static updateActivity(data) {
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
    static doUpdateRetroNote(data) {
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
    static doDeleteThought(data) {
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

export default createThoughtApi;