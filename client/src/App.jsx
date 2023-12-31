import React from 'react'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import {logo} from  './assets';
import { Home, CreatePost } from './pages';
import toast, { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    
    <BrowserRouter>
      <Toaster />
    <header className='w-full flex justify-between items-center bg-white
    sm:px-8 px-2 py-2 border-b border-b-[#e6ebf4]'>
      <Link to= "/">
        <img src={logo} alt='logo'
        className='w-28 object-contain'/>
      </Link>
      <Link to= "/create-post"
      className='bg-[#6469ff] hover:bg-slate-500 font-inter font-medium text-white px-4 py-2 rounded-md'>
        Create
      </Link>
    </header>
    <main className='sm:p-8 px-4 py-8 w-full bg-slate-100 min-h-[calc(100vh-73px)]'>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/create-post" element={<CreatePost/>}/>
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App
