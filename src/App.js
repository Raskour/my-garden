import { useState } from 'react';
import AboutUs from './Components/AboutUs';
import './App.css';
import Home from './Components/Home';
import PlantData from './Components/PlantData';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { FavContext } from './favContex';
import Favourites from './Components/Favourites';
import Header from './Components/Header';
import Error from './Components/Error';

function AppLayout() {
  const [favCount, setFavCount] = useState(0);
  const [fav, setFav] = useState([]);
  return (
    <FavContext.Provider value={{ favCount, setFavCount, fav, setFav }}>
      <div>
        <Header />
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
        errorElement: <Error />,
      },
      {
        path: '/about',
        element: <AboutUs />,
        errorElement: <Error />,
      },
      {
        path: '/fav',
        element: <Favourites />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
