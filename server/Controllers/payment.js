import dotenv from 'dotenv'
import Stripe from 'stripe';
import mailSender from '../utils/mailSender.js';
import receiptSendTemplate from '../mail/templates/receiptSendTemplate.js';
import Users from '../Models/userSchema.js';
import generatePDF from '../utils/generatePdf.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIVATE);

const stripePay = async (req, res) => {

    const { products } = req.body;

    const pId = products.map((product) => {
        return product._id
    })

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.recipe_name
            },
            unit_amount: product.price * 100,
        },
        quantity: 1,
    }))

    const session = await stripe.checkout.sessions.create(
        {
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}&order=${encodeURIComponent(JSON.stringify(pId))}`,
            cancel_url: "http://localhost:3000/cancel",
        });
    res.json({ id: session.id });
}

const receiptByMail = async (req, res) => {
         const{receiptURL} = req.body;
    try {
        const userEmail = req.user.email;
        const userName = await Users.findOne({ _id: req.user.id }, { name: 1 });
        await mailSender
            (
                userEmail,
                `TasteBite Purchase Receipt`,
                receiptSendTemplate(userName),
                generatePDF(receiptURL)
            );

        return res.status(200)
            .json({
                success: true,
                message: "Mail sent successfully"
            })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Mail Failed ${error}`
        })
    }

}

export { stripePay, receiptByMail }