import dotenv from 'dotenv'
import Stripe from 'stripe';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIVATE);

const stripePay=async(req,res)=>{
      
    const {products}=req.body;
    const lineItems=products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.recipe_name
            },
            unit_amount:product.price*100,
        },
        quantity:1
    }))

    const session=await stripe.checkout.sessions.create(
        {
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:`http://localhost:3000/success?sessiond_id={CHECKOUT_SESSION_ID}&order=${encodeURIComponent(JSON.stringify(products))}`,
            cancel_url:"http://localhost:3000/cancel", 
        });
        res.json({id:session.id});
}

export {stripePay}