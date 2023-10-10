import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Connection/db.js';
import chalk from 'chalk';
import authRouter from './Routes/userRoute.js';
import recipeRouter from './Routes/recipeRoute.js';
import cors from "cors";
import morgan from 'morgan';

const PORT = process.env.PORT;
const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
dotenv.config();

connectDB();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', authRouter);
app.use('/api/recipe', recipeRouter);

app.listen(PORT, () => {
  console.log(chalk.bgBlue.black(`App is running successfully on port ${PORT}`));
});
