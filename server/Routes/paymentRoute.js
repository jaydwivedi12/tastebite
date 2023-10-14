import express from "express"
import auth from "../Middleware/auth.js";
import { stripePay,receiptByMail } from "../Controllers/payment.js";
const paymentRouter = express.Router();

paymentRouter.post('/checkout',auth,stripePay);
paymentRouter.post('/receiptbymail',auth,receiptByMail)

export default paymentRouter;

