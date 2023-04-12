import AxiosInterceptor from "./interceptor";

const signIn = (data) => AxiosInterceptor.post('/auth/signin', data);

const signUp = (data) => AxiosInterceptor.post('/user/signup', data);

const AddProducts = (data) => AxiosInterceptor.post('/products/add', data);

const SellerRegister = (data) => AxiosInterceptor.post('/seller/register', data);

const SellerCheck = (data) => AxiosInterceptor.post('/seller/check', data);

const GetProfile = (data) => AxiosInterceptor.post('/user/profile', data);

const ProductStatus = (data) => AxiosInterceptor.post('/products/status', data);

const ListSellers = (data) => AxiosInterceptor.post(`/seller/list`, data);

const ApproveSellers = (data) => AxiosInterceptor.post('/seller/approve', data);

const DeleteSellers = (data) => AxiosInterceptor.post(`/seller/delete`, data);

const APIService = {
  signIn,
  signUp,
  AddProducts,
  SellerRegister,
  SellerCheck,
  GetProfile,
  ProductStatus,
  ListSellers,
  ApproveSellers,
  DeleteSellers
};

export default APIService;
