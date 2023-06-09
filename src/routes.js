import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SignupPage from './pages/SignupPage';
import AddProducts from './pages/AddProducts';

// ----------------------------------------------------------------------

function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'add-product', element: <AddProducts /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

function PrivateRoute() {
  const navigate = useNavigate();
  const userData = localStorage?.getItem('user_data');
  const accesstoken = JSON.parse(userData)?.acces_token;
  useEffect(() => {
    if (!accesstoken) {
      navigate('/');
    }
  }, [accesstoken]);
  return accesstoken && <Outlet />;
}

function PublicRoute() {
  const navigate = useNavigate();
  const userData = localStorage?.getItem('user_data');
  const accesstoken = JSON.parse(userData)?.acces_token;
  useEffect(() => {
    if (accesstoken) {
      navigate('/dashboard/app');
    }
  }, [accesstoken]);
  return !accesstoken && <Outlet />;
}

export { PrivateRoute, PublicRoute, Router };
