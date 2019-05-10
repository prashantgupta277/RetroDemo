
import { BASE_URL } from '../constants';
// import { sha3_512 } from 'js-sha3';

class superAdminTemplateApi {
    
    static fetchCustomTemplate(data) {

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

    static createCustomTemplateData(data) {
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

    static deleteCustomTemplate(data) {
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


    static updateEditTemplate(data) {
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

    static fetchGlobalTemplate(data) {
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

    static createGlobalTemplateData(data) {
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

    static deleteGlobalTemplate(data) {
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

    static getEditGlobalTemplate(data) {
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

    static updateEditGlobalTemplate(data) {
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

export default superAdminTemplateApi;