import React, { useState } from 'react';
import './login.css';
import assets from '../../assets/assets';
import { signup, login, resetPass } from '../../config/firebase';

const Login = () => {
    const [currentState, setCurrentState] = useState("Sign Up");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (!agreedToTerms) {
            alert("You must agree to the terms and conditions.");
            return;
        }
        if (currentState === "Sign Up") {
            signup(userName, email, password);
        } else {
            login(email, password);
        }
    };

    return (
        <div className='login'>
            <img src={assets.logo_big} alt='' className='logo' />
            <form onSubmit={onSubmitHandler} className='login-form'>
                <h2>{currentState}</h2>
                {currentState === "Sign Up" && (
                    <input 
                        onChange={(e) => setUserName(e.target.value)} 
                        value={userName} 
                        type="text" 
                        placeholder='Username' 
                        className='form-input' 
                        required 
                    />
                )}
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    type="email" 
                    placeholder='Email address' 
                    className='form-input' 
                    required 
                />
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    type="password" 
                    placeholder='Password' 
                    className='form-input' 
                    required 
                />
                <button type='submit'>
                    {currentState === 'Sign Up' ? 'Create Account' : 'Login'}
                </button>
                <div className="login-term">
                    <input 
                        type='checkbox' 
                        checked={agreedToTerms} 
                        onChange={() => setAgreedToTerms(!agreedToTerms)} 
                    />
                    <p>Agree to the terms of use & privacy policy.</p>
                </div>
                <div className="logo-forget">
                    {currentState === 'Sign Up' ? (
                        <p className='login-toggle'>
                            Already have an Account? <span onClick={() => setCurrentState('Login')}>Login Here</span>
                        </p>
                    ) : (
                        <p className='login-toggle'>
                            Create an Account? <span onClick={() => setCurrentState('Sign Up')}>Click Here</span>
                        </p>
                    )}
                    {currentState === "Login" && (
                        <p className='login-toggle'>
                            Forgot Password?  
                            <span onClick={() => email ? resetPass(email) : alert("Please enter your email first.")}>
                                Reset Here
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
