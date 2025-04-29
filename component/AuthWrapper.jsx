import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './Firebase';

const AuthWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (
        user &&
        user.emailVerified &&
        (location.pathname === '/' || location.pathname === '/login')
      ) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  return null; // no UI, just logic
};

export default AuthWrapper;
