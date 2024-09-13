import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SignUp from './components/Signup.jsx';
import Login from './components/Signin.jsx';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { RecoilRoot } from 'recoil';



const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
          <App/>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RecoilRoot>
    <RouterProvider router={router} />
    </RecoilRoot>,
  </StrictMode>,
)
