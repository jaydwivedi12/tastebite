import express from 'express';
import { login, signup } from '../Controllers/Auth.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);

export default authRouter;
