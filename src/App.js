import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// routes
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import AddProducts from './pages/AddProducts';
import BlogPage from './pages/BlogPage';
import DashboardAppPage from './pages/DashboardAppPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import SignupPage from './pages/SignupPage';
import UserPage from './pages/UserPage';
import { PrivateRoute, PublicRoute } from './routes';
import ListSellers from './pages/ListSellers';

// ------------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          {/* <Router /> */}
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
                <Route path="list-seller" element={<ListSellers />} />
                <Route path="app" element={<DashboardAppPage />} />
                <Route path="blog" element={<BlogPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
