import express from "express"
import auth from "../Middleware/auth.js";
import { stripePay } from "../Controllers/payment.js";
const paymentRouter = express.Router();

paymentRouter.post('/checkout',auth,stripePay);

export default paymentRouter;

