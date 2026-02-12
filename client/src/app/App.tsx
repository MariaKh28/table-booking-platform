import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchPage from '../pages/SearchPage/SearchPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SearchPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
