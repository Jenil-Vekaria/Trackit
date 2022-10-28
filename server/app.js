import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import roleRoutes from './routes/role.route';
import projectRoutes from './routes/project.route';
import { handleError, routeNotFound, authMiddleware } from './middleware/middleware.js';

dotenv.config();

const app = express();

//preconfigure express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Middleware
app.use('/auth', authRoutes);
app.use('/role', authMiddleware, roleRoutes);
app.use('/project', authMiddleware, projectRoutes);

app.use(handleError);
app.use(routeNotFound);

export default app;