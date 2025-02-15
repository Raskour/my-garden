import { useState } from 'react';
import AboutUs from './AboutUs';
import './App.css';
import Home from './Home';
import PlantData from './PlantData';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { FavContext } from './favContex';
import Favourites from './Favourites';

function AppLayout() {
  const [favCount, setFavCount] = useState(0);
  const [fav, setFav] = useState([]);
  return (
    <FavContext.Provider value={{ favCount, setFavCount, fav, setFav }}>
      <div>
        <Outlet />
      </div>
    </FavContext.Provider>
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
      {
        path: '/fav',
        element: <Favourites />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
