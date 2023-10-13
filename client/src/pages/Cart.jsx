import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../components/SecretRecipe/CartItem'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import { toast } from 'react-toastify'
import {loadStripe} from '@stripe/stripe-js';


const Cart = () => {
  const STRIPE_P_API = process.env.REACT_STRIPE_PUBLIC;
  const cart = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const {loggedIn}=useContext(AuthContext);
  const navigate=useNavigate();

  const checkoutHandler=async()=>{
    if (!loggedIn) {
      navigate("/login");
      toast.warn("Login to Sell Recipe");
      return;
    }
   
    const stripe=await loadStripe(STRIPE_P_API)
    const body={
      products:cart
    }
    const headers={
      "content-type":"application/json"
    }

    const response=await fetch("/api/payment/create-checkout-session",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)

    });
     
    const session =await response.json();
    
    const result=stripe.redirectToCheckout(
      {
        sessionId:session.id
      });
     
      if (result.error) {
        console.error(result.error);
      }
  }
  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart])
  return (
    <div>
      {
        cart.length > 0 ?
          (<div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center">
            <div>
              {
                cart.map((item) => {
                  return <CartItem key={item._id} item={item} />
                })
              }
            </div>
            <div className='w-[100%] md:w-[40%] mt-[20%] flex flex-col '>
              <div className="text-2xl uppercase text-green-900 font-semibold"> Your Cart</div>
              <div className='text-4xl uppercase text-green-700 font-bold'> Summary</div>
              <p className='py-4'>
                <span className='text-xl text-gray-700 font-semibold'> Total items:{cart.length}</span>
              </p>
              <p className='text-lg text-gray-700 font-medium'>
                Total amount: {totalAmount}
              </p>
                <button onClick={checkoutHandler} className=' text-lg mt-4 font-bold 
                bg-green-700 text-white rounded-full'>
                  Checkout Now
                </button>
            </div>


          </div>) :
          (<div className='min-h-[80vh] flex flex-col items-center justify-center'>
            <p className='font-medium text-4xl text-gray-700'>Cart is Empty</p>
            {<NavLink to="/buy">
              <button className='mt-4 text-lg font-semibold
                bg-green-700 text-white rounded-full px-10'>
                Shop Now
              </button>
            </NavLink>}
          </div>)
      }


      <div>

      </div>


    </div>



  )
}

export default Cart
