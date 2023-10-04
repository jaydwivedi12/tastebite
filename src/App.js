import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Sell from './pages/Sell'
import Buy from './pages/Buy'
import './styles/App.css'

const App = () => {
  return (
  <div className='App'>
    <div>
      <Navbar/>
    </div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/buy' element={<Buy/>}/>
      <Route path='/sell' element={<Sell/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
  </div>
  )
}

export default App
