import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import roleRoutes from './routes/role.js';
import middlware from './middleware/middleware.js';
import middleware from './middleware/middleware.js';

dotenv.config();

const app = express();

//preconfigure express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Middleware
app.use('/auth', authRoutes);
app.use('/role', middlware.authMiddleware, roleRoutes);

app.use(middleware.handleError);
app.use(middleware.routeNotFound);

export default app;