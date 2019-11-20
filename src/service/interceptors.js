import {setToken,getToken,KEYS,removeToken, projectName} from "./config"

import {API_Login} from "../api/api"


export default function (axios){
    // Add a request interceptor
    axios.interceptors.request.use( config => {
        console.log(config);
        let token = getToken();
        if(!config.headers){
            config.headers = {};
        }
        if(config.url!=API_Login){
            if(token){
                config.headers[KEYS.HEADER_KEY_TOKEN] ="Bearer "+ token;
            }
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use( response => {
        console.log('response=================:',response);
        // return;
        
        let token = getToken();
        console.log(token,'token');
        let code = response.data.code;
        if(code==401){
            removeToken();
            window.location.href=`${window.location.origin}/${projectName}`
            console.log(`${window.location.origin}/${projectName}`, 'window.location.origin');
        }
        // if(!token){
        //     window.location.href=`${window.location.origin}/authorize`
           
        // }
        // if(response.data){
        //     const result = response.data;
        //     if(result.ret === 1000 || result.ret === 10){
        //         if(window.location.href.indexOf('/authorize') == -1 ){
        //             // window.location.href="http://172.16.19.163:8080/#/reauthorize";
        //             let fromUrl = escape(window.location.href);
        //             removeToken();
        //             removeWxSession();
        //             let count = getAuthorizeCount();
        //             if(count>8){
        //                 window.location.href=`${window.location.origin}${dynamicProjectName}/h5.html#/reauthorize`
        //             } else {
        //                 setAuthorizeCount();
        //                 let testUrl = `${window.location.origin}${dynamicProjectName}/h5.html?fromUrl=${fromUrl}#/authorize`;
        //                 // console.log("testUrl",testUrl);
        //                 window.location.href=testUrl
        //             }
        //         }
        //     }
        // }
        return response;
    }, error => {
        return Promise.reject(error);
    });
}
