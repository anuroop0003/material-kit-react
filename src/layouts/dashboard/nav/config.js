// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'List Seller',
    path: '/dashboard/list-seller',
    icon: icon('ic_user'),
    usertype: ['admin'],
  },
  {
    title: 'add product',
    path: '/dashboard/add-product',
    icon: icon('ic_cart'),
    usertype: ['admin'],
  },
  {
    title: 'market',
    path: '/dashboard/market',
    icon: icon('ic_cart'),
    usertype: ['buyer'],
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
    usertype: ['buyer'],
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
    usertype: ['buyer'],
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
