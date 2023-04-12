import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('BASE_URL', BASE_URL);

// console.log("JSON.parse(localStorage.getItem('user_data'))?.acces_token", JSON.parse(localStorage.getItem('user_data'))?.acces_token);
const AxiosInterceptor = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'access-token': JSON.parse(localStorage.getItem('user_data'))?.acces_token ?? 565,
  },
});

AxiosInterceptor.interceptors.request.use(
    config => {
      const token = JSON.parse(localStorage.getItem('user_data'))?.acces_token ?? "";
      if (token) {
        config.headers['access-token'] = token
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

export default AxiosInterceptor;