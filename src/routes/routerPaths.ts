import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '@/layouts/Main/Main';
import Login from '@/pages/Auth/Login/Login';
import Cart from '@/pages/Cart/Cart';
import Favorites from '@/pages/Favorites/Favorites';
import NotFound from '@/pages/NotFound/NotFound';
import ProductCard from '@/pages/ProductCard/ProductCard';
import Products from '@/pages/Products/Products';

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
