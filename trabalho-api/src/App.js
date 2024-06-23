import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import{ ChakraProvider } from  '@chakra-ui/react' ;
import LoginPage from './pages/Login/Login';
import CardPage from './pages/Card/CardDetail';
import ListPage from './pages/List/List';
import ErrorBoundary from './components/ErrorBoundary';



const router = createBrowserRouter([
  {
    path: "",
    element: <LoginPage />,
    errorElement:<ErrorBoundary/>
  },
  {
    path: "/cards/:id",
    element: <CardPage />,
    errorElement:<ErrorBoundary/>
    
  }, {
    path: "/list",
    element: <ListPage />,
    errorElement:<ErrorBoundary/>
  },
  {
    path:"*",
    element:<ErrorBoundary/>
  }
]);



function App() {
  return (
    
    <RouterProvider router={router} />
    
    
  );
}

export default App;
