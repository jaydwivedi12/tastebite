import React, { useState } from 'react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { RxCross2} from "react-icons/rx"
import { NavLink,Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { toast } from 'react-toastify';
import Profile from './Profile';
import axios from 'axios';


const Navbar = () => {
  const navigate=useNavigate();
  const cart=useSelector((state)=>state.cart);
  const [showMenu, setShowMenu] = useState(true);
  const[showProfile,setShowProfile]=useState(false);
  const {loggedIn,setLoggedIn}=useContext(AuthContext);
  

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleProfile=()=>{
    setShowProfile(!showProfile);
  }

  const logoutHandler= async()=>{
    await axios.post("/api/auth/logout")
    localStorage.removeItem("token")
    localStorage.removeItem("isloggedIn")
    toast.success("Logged Out")
    navigate("/")
    setLoggedIn(false);

  }
  return (
    <div>
      <nav className=' bg-blue-950 flex flex-row justify-between items-center px-4 md:px-24 py-2 relative text-white'>
        <Link to="/" className="h-20">
          <div>
            <img src={logo} alt="logo" className="h-20" />
          </div>
        </Link>

        <div className='md:hidden text-white cursor-pointer text-4xl' onClick={toggleMenu}>
        { showMenu ? <RxCross2 className='font-bold'/>:<FaBars  /> } 
        </div>

        <div className={`hide-on-print absolute top-24 p-3 right-0 bg-gray-700 flex-col gap-5 
        md:bg-inherit text-center md:static flex md:flex-row md:space-x-6 text-white 
        ${showMenu ? 'block' : 'hidden'}`}>
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          {loggedIn ===true ?
          ( <>
            <Link to="/">
            <p onClick={logoutHandler}>Logout</p>
          </Link>
            <p onClick={toggleProfile}>Profile</p>
            {showProfile && <Profile/> }
          </>):
          ( <>
            <NavLink to="/login">
            <p>Login</p>
          </NavLink>
            <NavLink to="/Signup">
            <p>SignUp</p>
          </NavLink>
          </>
          )}
          
         
          <NavLink to="/buy">
            <p>Buy Secret Recipe</p>
          </NavLink>
          <NavLink to="/sell">
            <p>Sell Secret Recipe</p>
          </NavLink>
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl" />
            {
              cart.length >0 && 
              <span className="absolute bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce -top-1 -right-2 rounded-full  text-white">
                {cart.length}
              </span>
            }
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
