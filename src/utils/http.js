import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_API_URL

const http = axios.create({
    baseURL
})



export {baseURL, http};
