import { useState } from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import auth from './Firebase'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import { Link } from 'react-router-dom'


const Signin = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')    
const [signupError, setSignupError] = useState('');

let navigate = useNavigate(); 

const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');

    const email = e.target.username.value;
    const password = e.target.password.value;
    setEmail(email);
    setPassword(password);


    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);

        alert('A verification email has been sent. Please verify your email before completing registration.');
        
        let isVerified = false;
        while (!isVerified) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await user.reload();
            isVerified = user.emailVerified;

            if (isVerified) {
                alert('Email verified! Account creation complete.');
                console.log('User email verified:', user.email);
                navigate('/login');
            }
        }

        e.target.reset();
    } catch (error) {
        console.error('Sulogin pagep error:', error);
        setSignupError(error.message);
    }
    setTimeout(() => {
        setSignupError('');
    }, 5000);
    
};


  return (
    <>
    <div className='flex flex-col text-center items-center justify-center py-20 gap-8 h-screen'>
      <div className='sining-container flex flex-col gap-5'>

        
        <form className='mb-none w-sm signin-form' onSubmit={handleSignup}>
        <h1 className='pages-heading font-bold tracking-wide  text-3xl py-7'>Create Account</h1>
          
            <input className='mb-6 w-full outline-none'
            type="text"
            id="username"
            name="username" 
            autoComplete='username'
            placeholder='Username'
            required/>


            <input className='mb-6 w-full outline-none'
            type="password" 
            id="password" 
            name="password" 
            autoComplete='password'
            placeholder='Password'
            required />

            <input className='submit-btn py-1.5 px-1.5  cursor-pointer'
             type="submit" 
             value="Submit"/>

        <p className='mt-5'>
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signin