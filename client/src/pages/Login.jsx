import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'

function Login() {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [redirect , setRedirect] = useState(false);

  const {setUser} = useContext(UserContext)

  async function handleLoginSubmit(ev){
    ev.preventDefault();
    try {
      const {data} = await axios.post('/login' , {email,password}); 
      setUser(data)
      alert('Login Successfull')
      setRedirect(true);
    } catch (error) {
      alert('Login Failed')
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='mt-4 flex grow justify-around items-center'>
      <div className='mb-64'>
      <h1 className='text-4xl text-center mb-4'>Login</h1>
      <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
        <input 
        type="email" 
        placeholder='your@email.com'
        value={email}
        onChange={e => setEmail(e.target.value)}
         />
        <input 
        type="password" 
        placeholder='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
         />
        <button className='primary'>Login</button>
        <div className='mt-2 text-gray-500 text-center'>Don't have an account yet ?
          <Link className = "underline text-black" to={'/register'}> Register now</Link>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login
