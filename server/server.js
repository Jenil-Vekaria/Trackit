import mongoose from 'mongoose';
import app from './app.js';
import { PORT, MONGO_DB_CONNECTION, CURRENT_ENVIRONMENT } from "./config/config.js";

//Connect to DB
await mongoose.connect(MONGO_DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
        if (error) {
            console.error(error);
        }
        else {
            app.listen(PORT, () => {
                console.log("\n");
                console.log("==========================================");
                console.info(`🚀 Running Environment: ${CURRENT_ENVIRONMENT}`);
                console.info(`✅ Connected to MongoDB: http://localhost:${PORT}`);
                console.info(`🔗 Connection URL: ${MONGO_DB_CONNECTION}`);
                console.log("==========================================");

            });
        }
    }
);
