import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { logOut,auth } from '../firebase';
import { logout as logoutHandle } from '../store/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UpdateProfile from '../components/UpdateProfile';
import { EmailVerification } from '../firebase';

const Home = () => {

  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await logOut()
    dispatch(logoutHandle())
    navigate("/login",{
      replace:true
    })
    

}

const handleVerification = async () => {
  await EmailVerification()
  return true
}

if(user){
  return (
    <div className='max-w-xl mx-auto py-5 '>
      {user.photoURL && <img src={auth.currentUser.photoURL ? auth.currentUser.photoURL : ''} className="w-10 h-10 rounded-full" /> }
      <h2>{auth.currentUser.displayName}</h2> 
      <h1 className='gap-x-4 flex items-center'>
      oturumun açık Hoşgeldin ( {user.email} )
      

        <button onClick={handleLogout} className='h-10 rounded px-4 text-sm text-white bg-indigo-500'>
          çıkış yap
        </button>
        {!user.emailVerified && 
            <button onClick={handleVerification} className='h-10 rounded px-4 text-sm text-white bg-indigo-500'>
          Email Güncelle
        </button>}
      </h1>
      <UpdateProfile />
      
    </div>
  )
}
  return (
    <div>
        <Link to="/register">Kayıt ol</Link><br/>
        <Link to="/login">giriş yap</Link>

    </div>
  )
}

export default Home