import axios from "axios"
import { API_URL } from './config'

const defaultOptions = {
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",        
    }
}

export const httpDefault = axios.create(defaultOptions)

let http = axios.create(defaultOptions)
http.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
})

export { http }