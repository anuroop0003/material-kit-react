import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
// routes
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import Loader from './components/loader';
import { PrivateRoute, PublicRoute } from './routes';
import store from './stateManagement/store';

const CustomSnackbar = lazy(() => import('./components/snackbar/CustomSnackbar'));
const ScrollToTop = lazy(() => import('./components/scroll-to-top'));
const DashboardLayout = lazy(() => import('./layouts/dashboard/DashboardLayout'));
const AddProducts = lazy(() => import('./pages/AddProducts'));
const Market = lazy(() => import('./pages/Market'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const DashboardAppPage = lazy(() => import('./pages/DashboardAppPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Page404 = lazy(() => import('./pages/Page404'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const ListSellers = lazy(() => import('./pages/ListSellers'));

// ------------------------------------------------------------------------

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <HelmetProvider>
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider>
              <ScrollToTop />
              <StyledChart />
              <Routes>
                <Route path="/" element={<PublicRoute />}>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard/" element={<DashboardLayout />}>
                    <Route path="user" element={<UserPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="add-product" element={<AddProducts />} />
                    <Route path="market" element={<Market />} />
                    <Route path="list-seller" element={<ListSellers />} />
                    <Route path="app" element={<DashboardAppPage />} />
                    <Route path="blog" element={<BlogPage />} />
                  </Route>
                </Route>
                <Route path="*" element={<Page404 />} />
              </Routes>
            </ThemeProvider>
          </BrowserRouter>
          <CustomSnackbar />
        </Provider>
      </HelmetProvider>
    </Suspense>
  );
}
