import mongoose from 'mongoose';
import app from './app.js';
import { PORT, MONGO_DB_CONNECTION, CURRENT_ENVIRONMENT } from "./config/config.js";

//Connect to DB

try {
    await mongoose.connect(MONGO_DB_CONNECTION);
    app.listen(PORT, () => {
        console.log("\n");
        console.log("==========================================");
        console.info(`🚀 Running Environment: ${CURRENT_ENVIRONMENT}`);
        console.info(`✅ Server Running On: http://localhost:${PORT}`);
        console.info(`🔗 MongoDB Connection URL: ${MONGO_DB_CONNECTION}`);
        console.log("==========================================");
    });
} catch (error) {
    console.error(error);
}
