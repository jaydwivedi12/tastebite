import React, { useState } from 'react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { RxCross2} from "react-icons/rx"
import { NavLink,Link } from 'react-router-dom';
import logo from "../assets/logo.png"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <nav className='bg-blue-950 flex flex-row justify-between items-center px-4 md:px-24 py-2 relative text-white'>
        <Link to="/" className="h-20">
          <div>
            <img src={logo} alt="logo" className="h-20" />
          </div>
        </Link>

        <div className='md:hidden text-white cursor-pointer text-4xl' onClick={toggleMenu}>
        { showMenu ? <RxCross2 className='font-bold'/>:<FaBars  /> } 
        </div>

        <div className={`absolute top-24 p-3 right-0 bg-gray-700 flex-col gap-5 
        md:bg-inherit text-center md:static flex md:flex-row md:space-x-6 text-white 
        ${showMenu ? 'block' : 'hidden'}`}>
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          <NavLink to="/login">
            <p>Login</p>
          </NavLink>
          <NavLink to="/Signup">
            <p>SignUp</p>
          </NavLink>
          <NavLink to="/buy">
            <p>Buy Secret Recipe</p>
          </NavLink>
          <NavLink to="/sell">
            <p>Sell Secret Recipe</p>
          </NavLink>
          <Link to="/cart" className="relative">
          <p className='flex justify-center'> <FaShoppingCart className="text-2xl" /></p>  
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
