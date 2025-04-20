import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './src/config/db.config.js';
import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js';

dotenv.config({
  path:'./.env',
});

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'], 
  credentials: true,
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoute); 
app.use('/api/user', userRoute);


app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});