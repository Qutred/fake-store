import { RouterProvider } from 'react-router-dom';
import { routerPaths as router } from './routerPaths';

export function Router() {
  return <RouterProvider router={router} />;
}
