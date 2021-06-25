import axios from "axios"
import { API_URL } from './config'

export const httpDefault = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"       
    }
})

export const http = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})