import React from 'react'
import { register } from '../firebase'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const user = await register(email,password)
      if(user){
        navigate("/")

      }
      console.log(user)


  
    }
  
  return (

    <div className='bg-indigo-400'>
    <form className=' max-w-xl mx-auto grid gap-y-4 py-4' onSubmit={ handleSubmit }>
       
      <input className=' shadow-sm focus:ring-indigo-500 block bg-black focus:border-indigo-500 sm:text-sm border-gray-500 rounded-full text-white' type="text" placeholder="e posta" value={email} onChange={e => setEmail(e.target.value)} />
      <input className=' shadow-sm focus:ring-indigo-500 block bg-black focus:border-indigo-500 sm:text-sm border-gray-500 rounded-full text-white'  type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" disabled={!email || !password} className=' cursor-pointer inline-flex item-center px-4 py-2 border border-transparent text-white mt-2 bg-zinc-500 rounded-full hover:bg-neutral-800'>kayıt Ol</button>
      </form>
    </div>
  )
}

export default Register
// form kurabilmek için npm i @tailwindcss/forms yükle 2 adımda tailwindcss.config dosyasına git ve yükle