import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';


const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { 'content-type': 'application/json' },
    timeout: 10000
})


axiosInstance.interceptors.request.use(
    function (config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        // Stop global loader here
        return processResponse(response);
    },
    function (error) {
        // Stop global loader here
        return Promise.reject(processError(error));
    }
)


const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    }
    else {
        console.log("Reponse Data")
        console.log(response)
        console.log(response.data)

        return {
            isFailure: true,
            status: response?.status,
            msg: response?.data,
            code: response?.code
        }
    }
}


const processError = (error) => {
    if (error.response) {
        //when request is made is correct but received another response
        console.log("ERROR I RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: error.response.data.msg,
            code: error.response.status
        }
    }
    else if (error.request) {
        //when request is made and not get the response
        console.log("ERROR  RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else {
        //when request cant be made
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        })

}



export { API };