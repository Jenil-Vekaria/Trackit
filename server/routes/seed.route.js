import express from "express";
import { seedDatabase } from "../controllers/seed.controller.js";

const router = express.Router();

router.post("/", seedDatabase);

export default router;