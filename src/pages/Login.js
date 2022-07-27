import React from 'react'
import { useState } from 'react'
import { login } from '../firebase'
//import {login as loginHandle } from "../store/auth"
import { useNavigate } from 'react-router-dom'
//import { useDispatch } from 'react-redux'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    //const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await login(email,password)
        if(user){
           // dispatch(loginHandle(user))
            navigate("/",{replace:true})
            console.log(user)
        }

        
    
      }
    



  return (
    <>
    
    <div className='bg-indigo-400'>
        Login Sayfası
        <form className=' max-w-xl mx-auto grid gap-y-4 py-4' onSubmit={ handleSubmit }>
        
        <input className=' shadow-sm focus:ring-indigo-500 block bg-black focus:border-indigo-500 sm:text-sm border-gray-500 rounded-full text-white' type="text" placeholder="e posta" value={email} onChange={e => setEmail(e.target.value)} />
        <input className=' shadow-sm focus:ring-indigo-500 block bg-black focus:border-indigo-500 sm:text-sm border-gray-500 rounded-full text-white'  type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" disabled={!email || !password} className=' cursor-pointer inline-flex item-center px-4 py-2 border border-transparent text-white mt-2 bg-zinc-500 rounded-full hover:bg-neutral-800'>Giriş yap</button>
        </form>
    </div>
    </>
  )
}

export default Login