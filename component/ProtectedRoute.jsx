import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './Firebase';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
  
    return <div>Loading...</div>;
  }

  if (!user || !user.emailVerified) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
