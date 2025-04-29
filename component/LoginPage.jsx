import { Link } from 'react-router-dom'
import auth from './Firebase'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const  LoginPage = () => {


const [email, setEmail] = useState('')
const [password, setPassword] = useState('')   
let navigate = useNavigate(); 
let navigateToForgetpassword = useNavigate();

const handleForgetPassword = () => {
  navigateToForgetpassword('/forgetpassword')
}

const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setEmail(email);
    setPassword(password);


    try {
        await signInWithEmailAndPassword(auth, email, password)
        if(!auth.currentUser.emailVerified) {
            alert('Please verify your email before logging in.');
            return;
        }
        navigate('/dashboard'); 

        e.target.reset();
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
    }
}

  return (
    <>
    <div className='flex flex-col text-center items-center justify-center py-20 gap-8' onSubmit={handleLogin}>
    <form className='login-container flex flex-col gap-5'>

    <h1 className='pages-heading font-bold tracking-wide  text-3xl py-7 '>Good To See You Again!</h1>

    <input className='outline-none'
     type="email"
     name="email" 
     placeholder="Email" 
     autoComplete='username'
     required/>

    <input className='outline-none'
     type="password" 
     name="password"
     placeholder="Password" 
     autoComplete='current-password'
     required/>

    <div className='flex flex-col gap-4 py-4 text-center items-center justify-center'>
    <button className='submit-btn py-1.5 px-1.5  cursor-point' type="submit">Sign In</button>
    <span className=' py-1.5 px-1.5 cursor-pointer text-blue-500 hover:underline' type="button" onClick={handleForgetPassword}>Forget Password?</span>
    </div>

    <p>Don't have an account?{' '}
          <Link className='text-blue-500 hover:underline'
           to="/signup">SignUp</Link>
    </p>

    </form>
    </div>
    </>
  )
}

export default LoginPage