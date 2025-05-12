import { useState } from 'react';
import AboutUs from './Components/AboutUs';
import './App.css';
import Home from './Components/Home';
import PlantData from './Components/PlantData';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { FavContext } from './context/favContex';
import Favourites from './Components/Favourites';
import Header from './Components/Header';
import Error from './Components/Error';
import { ThemeContext } from './context/themeContext';
import { Box } from '@mui/material';
import Authentication from './Components/Authentication';

function AppLayout() {
  const [favCount, setFavCount] = useState(0);
  const [fav, setFav] = useState([]);
  const [theme, setTheme] = useState('light');

  return (
    <FavContext.Provider value={{ favCount, setFavCount, fav, setFav }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: theme === 'light' ? 'white' : 'black',
            color: theme === 'light' ? '#000' : '#fff',
          }}
        >
          <Header />
          <main className="main">
            <Outlet />
          </main>
        </Box>
      </ThemeContext.Provider>
    </FavContext.Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home />, errorElement: <Error /> },
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
      {
        path: '/login',
        element: <Authentication />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
