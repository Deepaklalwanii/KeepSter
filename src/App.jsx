import './App.css';
import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import AuthWrapper from '../component/AuthWrapper'; // ✅ Import it

function App() {
  return (
    <>
      <AuthWrapper /> {/* for checking  authentication if the user is already logged in or not */}
      <Header />
      <Outlet />
    </>
  );
}

export default App;
