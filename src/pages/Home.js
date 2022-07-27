import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { logOut,auth, deleteTodo } from '../firebase';
import { logout as logoutHandle } from '../store/auth';
import { addTodo } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EmailVerification } from '../firebase';
import { useState } from 'react';
import todos from '../store/todos';

const Home = () => {

  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { todos } = useSelector(state => state.todos)
  console.log(todos.map(todo => todo))

  const [todo, setTodo] = useState('')

  const handleLogout = async () => {
    await logOut()
    dispatch(logoutHandle())
    navigate("/login",{
      replace:true
    })
    

}

const submitHandle = async (e) => {
  e.preventDefault()
  await addTodo({
    todo,
    uid:user.uid
  })

}

const handleVerification = async () => {
  await EmailVerification()
  return true
}

const handleDelete = async  (id) => {
  
  await deleteTodo(id)

}

if(user){
  return (
    <div className='max-w-xl mx-auto py-5 '>
            {!user.photoURL && <img src='https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png' className="w-10 h-10 rounded-full" /> }

      {user.photoURL && <img src={!auth.currentUser.photoURL ? auth.currentUser.photoURL : ''} className="w-10 h-10 rounded-full" /> }
      <h2>{auth.currentUser.displayName}</h2> 
      <h1 className='gap-x-4 flex items-center'>
      oturumun açık Hoşgeldin ( {user.email} )
      
        <Link to="/settings" className='h-10 rounded px-4 text-sm text-white bg-indigo-500 items-center pt-2 hover:bg-black justify-items-center'>Ayarlar </Link>
        <button onClick={handleLogout} className='h-10 hover:bg-black rounded px-4 text-sm text-white bg-indigo-500'>
          Çıkış Yap
        </button>
        {!user.emailVerified && 
            <button onClick={handleVerification} className='h-10 rounded px-4 text-sm text-white bg-indigo-500'>
          Email Güncelle
        </button>}
      </h1>
      <form onSubmit={submitHandle} className='flex gap-x-4'>
          <div className=' items-center justify-between fle'> 
          <input onChange={e => setTodo(e.target.value)} value={todo} className='shadow-sm h-10 focus:ring-indigo-500 block bg-gray-300 w-full focus:border-indigo-500 sm:text-sm border-gray-500 rounded-full text-white ' placeholder='Todo yaz ' type="text"></input>
        <button className='w-full h-10 /12 mx-auto items-center justify-center cursor-pointer inline-flex item-center px-4 py-2 border border-transparent text-white mt-2 bg-zinc-500 rounded-full hover:bg-neutral-800'>Ekle</button>

          </div>
      </form>
      {todos.length > 0 && (
              <ul className='mt-4 gap-y-2 mt-4 flex flex-col'>
              {todos.map((todo,index) => (<li className='flex h-max text-md  justify-between items-center rounded bg-indigo-200' key={index}>{todo.todo}
              <button onClick={() => handleDelete(todo.id)} className='h-7rounded px-3 text-xs bg-indigo-700 text-white'>Sil</button>
    
              </li>))}
          </ul>
      )}
      {todos.length === 0 && <h1>hiç todo eklemediniz</h1>}
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