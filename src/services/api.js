import axios from 'axios';

let accesToken = '';
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('BASE_URL', BASE_URL);

const userData = localStorage.getItem('user_data');
const accesstoken = JSON.parse(userData)?.access_token;

if (accesstoken) {
  accesToken = accesstoken;
} else {
  accesToken = null;
}

const AxiosInterceptor = axios.create({
  baseURL: 'http://localhost:5500/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: accesToken,
  },
});

const signIn = (data) => AxiosInterceptor.post('/auth/signin', data);

const signUp = (data) => AxiosInterceptor.post('/user/signup', data);

const APIService = {
  signIn,
  signUp,
};

export default APIService;
