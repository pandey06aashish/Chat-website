import React, { useState } from 'react'
import './login.css'
import assets from '../../assets/assets'

const Login = () => {

      const [currentState,setCurrentState]=useState("Sign up")

  return (
    <div className='login'>
        <img src={assets.logo_big} alt=''className='logo'/>
        <form className='login-form'>
         <h2>{currentState}</h2>
         {currentState==="Sign up" ? <input type="text" placeholder='username' className='form-input' required/>:null}
        
         <input type="email" placeholder='Email address' className='form-input' required />
         <input type="password" placeholder='password' className='form-input' required />
         <button type='submit'>{currentState==='Sign up'?'Create Account':'Login'}</button>
         <div className="login-term">
            <input type='checkbox'/>
            <p>Agree to the terms of use & privacy policy.</p>
         </div>
         <div className="logo-forget">

            {
                currentState==='Sign up'?
                <p className='login-toggle'>Already have an Account <span onClick={()=>setCurrentState('Login')}>Login Here</span></p>:
                <p className='login-toggle'>Create an Account  <span onClick={()=>setCurrentState('Sign up')}>Click Here</span></p>
            }

         </div>
        </form>
    </div>

  )
}

export default Login