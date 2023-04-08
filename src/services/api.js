import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('BASE_URL', BASE_URL);

const AxiosInterceptor = axios.create({
  baseURL: 'http://localhost:5500/',
  headers: {
    'Content-Type': 'application/json',
    'access-token': JSON.parse(localStorage.getItem('user_data'))?.acces_token ?? null,
  },
});

const signIn = (data) => AxiosInterceptor.post('/auth/signin', data);

const signUp = (data) => AxiosInterceptor.post('/user/signup', data);

const AddProducts = (data) => AxiosInterceptor.post('/products/add', data);

const SellerRegister = (data) => AxiosInterceptor.post('/seller/register', data);

const SellerCheck = (data) => AxiosInterceptor.post('/seller/check', data);

const GetProfile = (data) => AxiosInterceptor.post('/user/profile', data);

const ProductStatus = (data) => AxiosInterceptor.post('/products/status', data);

const ListSellers = (data) => AxiosInterceptor.post(`/seller/list`, data);

const APIService = {
  signIn,
  signUp,
  AddProducts,
  SellerRegister,
  SellerCheck,
  GetProfile,
  ProductStatus,
  ListSellers,
};

export default APIService;
