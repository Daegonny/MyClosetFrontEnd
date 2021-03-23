import axios from 'axios'
//const baseURL = 'http://192.168.15.32:5000/' 
const baseURL = 'https://localhost:5001/' 
//const baseURL = 'http://localhost:5000/' 

//const baseURL = 'http://192.168.15.11:5000/' //prod
const http = axios.create({
    baseURL
})

export {http, baseURL};
