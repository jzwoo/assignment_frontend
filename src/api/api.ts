import axios from 'axios';

export const axiosUsers = axios.create({
    baseURL: "http://localhost:8000"
})