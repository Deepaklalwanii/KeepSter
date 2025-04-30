import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Signin from '../component/Signin.jsx';
import VerifyEmail from '../component/VerifyEmail.jsx';
import LoginPage from '../component/LoginPage.jsx';
import Dashboard from '../component/Dashboard.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';
import ForegetPassword from '../component/ForgetPassword.jsx';
import ProtectedRoute from '../component/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <Signin />
      },
      {
        path: 'forgetpassword',
        element: <ForegetPassword />
      },
      {
        path: 'verify-email',
        element: <VerifyEmail />
      },

      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>   
    <RouterProvider router={router} /> 
    </ThemeProvider>
  </StrictMode>
);
