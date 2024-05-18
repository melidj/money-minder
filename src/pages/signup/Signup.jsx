
import './signup.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { auth, provider } from "../../config/firebase-config";
import { AuthErrorCodes, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error1, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('Error');
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            navigate("/money-minder");

        } catch (error) {
            setError(error.message);  // Set error message to be displayed
            console.error("Error signing up:", error1);
        }
    }

    const navigate = useNavigate();


    const signUpWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const authInfo = {
              userId: result.user.uid,
              name: result.user.displayName,
              profilePhoto: result.user.photoURL,
              isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("/money-minder");
          } catch (error) {
            if (error instanceof AuthErrorCodes && error.code === 'auth/popup-closed-by-user') {
              console.log('Authentication popup was closed by the user.');
            } else {
              console.error('Google login error:', error.message);
            }
          }
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
                <form className="signup-form" onSubmit={handleSubmit} >
                    <p className='money-minder'>MoneyMinder</p>
                    <p className='login-1'>Sign Up</p>

                    <label className='username-email'>Username</label>
                    <div className='input-box'>
                        <input 
                            type="text" 
                            id='signup-username' 
                            placeholder="Enter Username"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                        <FaUser className='icon'/>
                    </div>

                    <label className='username-email'>Email</label>
                    <div className='input-box'>
                        <input 
                            type="signup-email" 
                            placeholder="Enter Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <FaEnvelope className='icon'/>
                    </div>

                    <label className='password'>New Password</label>
                    <div className='input-box'>
                        <input 
                            type="signup-password" 
                            placeholder="Enter Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <FaLock className='icon'/>
                    </div>

                    <button className='login-button'>
                        <span className='login-2'>Sign Up</span>
                    </button>

                </form>

                <div className="flex-row-de">
                    <div className="google-img">
                        <img src="images/google.png" alt='google' />
                    </div>
                    <div className="google-login" onClick={signUpWithGoogle}>
                        Sign Up with Google
                    </div>
                </div>

                <div className='flex-row-d'>
                    <span className='need-login'>Need to Login?</span>
                    <Link to="/auth" ><span className='login'>Login</span></Link>
                </div>

            </div>
        </div>
    );
}

export default Signup;