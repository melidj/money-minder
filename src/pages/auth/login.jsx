import React, { useState } from 'react';
import './login.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from 'react-icons/fa';
import { auth, provider } from "../../config/firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const Auth = () => {

  const navigate = useNavigate();
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            navigate("/money-minder");

        } catch(error){
            console.error(error);
        }
    }

  const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log('User logged in with Google:', result.user);
        navigate("/money-minder");
    } catch (error) {
        console.error('Google login error:', error.message);
    }
};

const handleForgotPassword = () => {
  console.log('Forgot password clicked');
};

    return (
        <div className='main-container'>
          
          <div className='left-login'>
            <div className='dollar-image'>
              <img src="/images/US_Dollar.png" alt="Dollar"/>
            </div>
            <p className='welcome-message'>Welcome to MoneyMinder</p>
            <p className='welcome-statement'>
              "Your personal finance companion! Let's track your expenses and keep
              your finances in check together."
            </p>
          </div>

          <div className='right-login'>
            <form onSubmit={handleSubmit}>
              <p className='money-minder'>MoneyMinder</p>
              <p className='login-1'>Login</p>

              <lable className='username-email'>Email</lable>
              <div className='input-box'>
                <input type="email" placeholder="Enter Email" required value={email} onChange={(e) => setEmail(e.target.value) } />
                <FaUser className='icon'/>
              </div>

              <lable className='password'>Password</lable>
              <div className='input-box'>
                <input type="password" placeholder="Enter Password" required  value={password} onChange={(e) => setPassword(e.target.value)} />
                <FaLock className='icon'/>
              </div>

              <div className='forgot-password'>
                <lable><input type="checkbox" />Remember me</lable>
                <span className='forgot-password' onClick={handleForgotPassword}>forgot password?</span>
              </div>

              <button className='login-button' type='submit'>
                <span className='login-2'>Login</span>
              </button>

              <div className='flex-row-b-4'>
                <p className='new-user'>New user?
                <Link to="/signup" className='create-account'>Create Account</Link></p>
              </div>

            </form>
            
            <div className="flex-row-de">
            <div className="google">
              <img src="images/google.png"  alt='google' />
            </div>
            <div className="login-with-google" onClick={signInWithGoogle}>
              Login with Google
            </div>
            </div>

          </div>
        </div>
      );
};

