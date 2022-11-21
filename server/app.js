import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import roleRoutes from './routes/role.route.js';
import projectRoutes from './routes/project.route.js';
import userRoutes from "./routes/user.route.js";
import { handleError, routeNotFound, authMiddleware } from './middleware/middleware.js';

dotenv.config();

const app = express();

//preconfigure express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Middleware
app.use('/auth', authRoutes);
app.use('/user', authMiddleware, userRoutes);
app.use('/role', authMiddleware, roleRoutes);
app.use('/project', authMiddleware, projectRoutes);

app.use(handleError);
app.use(routeNotFound);

export default app;