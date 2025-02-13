import AboutUs from './AboutUs';
import './App.css';
import Home from './Home';
import PlantData from './PlantData';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/plants/:plantId',
        element: <PlantData />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
