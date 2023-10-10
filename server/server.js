import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Connection/db.js';
import chalk from 'chalk';
import authRouter from './Routes/userRoute.js';
import recipeRouter from './Routes/recipeRoute.js';
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
dotenv.config();

connectDB();

// Define API routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', authRouter);
app.use('/api/recipe', recipeRouter);

app.listen(PORT, () => {
  console.log(chalk.bgBlue.black(`App is running successfully on port ${PORT}`));
});
