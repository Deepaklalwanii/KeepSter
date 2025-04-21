import auth from './Firebase'
import {signOut, onAuthStateChanged} from 'firebase/auth'
import { useNavigate, useLocation } from 'react-router-dom'
import {useEffect, useState } from 'react'

const Header = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();
    let navigation = useNavigate(); // Initialize useNavigate

    const isDashboard = location.pathname === '/dashboard';
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser); 
      });
  
      return () => unsubscribe();
    }, [])

    

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigation('/login');// Redirect to the login page after sign out

        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <>
        <header>
            <div className='flex fixed w-full z-10 bg-[#fff]  text-center items-center justify-between gap-8 px-3 py-2 shadow-md'>
              
              <div className='Logo-box flex gap-1.5 items-center cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="cornflowerblue" className="bi bi-bookmarks" viewBox="0 0 16 16">
              <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1z"/>
              <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1"/>
              </svg>
                <h1 className='tracking-wide text-blue-400 text-xl'>KeepSter</h1>
              </div>

                <ul className="flex gap-4 text-blue-400 text-lg">
                {!isDashboard && !user && (
            <li className="cursor-pointer" onClick={handleSignOut}>
              Sign In
            </li>
          )}
          {user && isDashboard && (
            <li className="cursor-pointer" onClick={handleSignOut}>
              SignOut
            </li>
          )}
                </ul>
            </div>
        </header>
        </>
    );
};
export default Header