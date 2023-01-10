import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import roleRoutes from './routes/role.route.js';
import projectRoutes from './routes/project.route.js';
import ticketTypeRoutes from './routes/ticketType.route.js';
import userRoutes from "./routes/user.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import commentRoutes from "./routes/comment.route.js";
import testRoutes from "./routes/test.route.js";
import { handleError, routeNotFound, authMiddleware } from './middleware/middleware.js';
import { isProduction } from "./config/config.js";

const app = express();

//preconfigure express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Middleware
app.get("/", (_, res) => res.send("Welcome to TrackIt API"));
app.use('/auth', authRoutes);
app.use('/user', authMiddleware, userRoutes);
app.use('/role', authMiddleware, roleRoutes);
app.use('/project', authMiddleware, projectRoutes);
app.use('/comment', authMiddleware, commentRoutes);
app.use('/ticket', authMiddleware, ticketRoutes);
app.use('/ticketType', authMiddleware, ticketTypeRoutes);

if (!isProduction) {
    app.use("/test", testRoutes);
}

app.use(handleError);
app.use(routeNotFound);

export default app;