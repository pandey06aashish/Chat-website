import React, { useContext, useEffect } from 'react'
import { Routes ,Route, useNavigate} from 'react-router-dom'
import Login from './pages/login/login'
import Chat from './pages/chat/Chat'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { AppContext } from './context/AppContext'

const App = () => {
   
  const navigate=useNavigate();
  const {loadUserData}=useContext(AppContext)

    useEffect(()=>{
      onAuthStateChanged(auth,async (user)=>{
       if(user){
        navigate('/chating')
        await loadUserData(user.uid)
       }
       else{
          navigate('/')
       }
      })
    },[])
    
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chating' element={<Chat/>}/>
      <Route path='/profile' element={<ProfileUpdate/>}/>
    </Routes>
    </>
  )
}

export default App