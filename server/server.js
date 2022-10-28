import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 5000;
const MONGO_DB_CONNECTION = process.env.MONGO_DB_CONNECTION;


//Connect to DB
await mongoose.connect(MONGO_DB_CONNECTION,
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
