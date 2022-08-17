import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_DB_CONNECTION = process.env.MONGO_DB_CONNECTION;

//preconfigure express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Middleware
app.use('/auth', authRoutes);
app.get("/", (req, res) => {
    res.send("*** Welcome to Bug Tracker API ***");
});

//Connect to DB
mongoose.connect(MONGO_DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
        if (error) {
            console.error(error);
        }
        else {
            app.listen(PORT, () => console.log(`Successfully Connected to MongoDB\n Running on http://localhost:${PORT}`));
        }
    }
);