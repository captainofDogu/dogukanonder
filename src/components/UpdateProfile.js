import React from 'react'
import { useState } from 'react'
import { update ,auth,resetPassword } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/auth'

const UpdateProfile = () => {

    const { user } = useSelector(state => state.auth)
    const [displayName, setDisplayName] = useState(user.displayName || '')
    const [avatar, setAvatar] = useState(user.photoURL || '')
    const [password, setPassword] = useState()


    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await update({
            displayName:displayName, // hem veri tabanına alttakide redux 'a
            photoURL:avatar,
        })
        //console.log(auth.currentUser)
        dispatch(login({
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL,
            emailVerified:auth.currentUser.emailVerified,
            uid:auth.currentUser.uid

        }))
        console.log("currenUser =>",auth.currentUser)
        setDisplayName('')



    }
    const handleResetSubmit = async (e) => {
        e.preventDefault()
        await resetPassword(password)
        setPassword('')
        console.log('reset password',auth.currentUser)

    }

  return (
      <>
    <form onSubmit={handleSubmit} className='grid gap-y-4'>
        <h1 className='text-xl font-bold mb-4'>Profili Güncelle</h1>
        
        <input className=' shadow-sm focus:ring-indigo-500 block bg-black focus:border-indigo-500 sm:text-sm border-gray-500 rounded-full text-white' type="text" placeholder="ad soyad" value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <input className=' shadow-sm focus:ring-indigo-500 block bg-black focus:border-indigo-500 sm:text-sm border-gray-500 rounded-full text-white' type="text" placeholder="resim ekle" value={avatar} onChange={e => setAvatar(e.target.value)} />


      <button type="submit"  className=' cursor-pointer inline-flex item-center px-4 py-2 border border-transparent text-white mt-2 bg-zinc-500 rounded-full hover:bg-neutral-800'>
          güncelle
      </button>
    </form>

    <form onSubmit={handleResetSubmit} className='grid gap-y-4'>
    <h1 className='text-xl font-bold mb-4'>Şifre Güncelle</h1>

    <input className=' shadow-sm focus:ring-indigo-500 block bg-black focus:border-indigo-500 sm:text-sm border-gray-500 rounded-full text-white' type="password" placeholder="1 sifre" value={password} onChange={e => setPassword(e.target.value)} />


    <button disabled={!password} type="submit"  className=' cursor-pointer inline-flex item-center px-4 py-2 border border-transparent text-white mt-2 bg-zinc-500 rounded-full '>
    şifreyi güncelle
    </button>
    </form>
</>
  )
}

export default UpdateProfile