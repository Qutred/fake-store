import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '@/pages/Auth/Login/Login';
import Main from '@/layouts/Main/Main';
import Products from '@/pages/Products/Products';
import Cart from '@/pages/Cart/Cart';
import Favorites from '@/pages/Favorites/Favorites';
import ProductCard from '@/pages/ProductCard/ProductCard';
import NotFound from '@/pages/NotFound/NotFound';

export const routerPaths = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Main,
    children: [
      {
        index: true,
        Component: Products,
      },
      {
        path: 'products',
        Component: Products,
      },
      { path: 'products/:id', Component: ProductCard },
      {
        path: 'cart',
        Component: Cart,
      },
      {
        path: 'favorites',
        Component: Favorites,
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            Component: Login,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
