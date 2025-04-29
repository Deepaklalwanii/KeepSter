import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import auth from './Firebase';

function VerifyEmail() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else if (user.emailVerified) {
        navigate('/dashboard');
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleResend = async () => {
    if (user) {
      await sendEmailVerification(user);
      setEmailSent(true);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Please verify your email address</h2>
      <p>We have sent a verification link to your email.</p>
      <button onClick={handleResend}>Resend Verification Email</button>
      {emailSent && <p style={{ color: 'green' }}>Verification email sent!</p>}
    </div>
  );
}

export default VerifyEmail;
