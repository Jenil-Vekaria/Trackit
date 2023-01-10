import express from "express";
import { seedDatabase } from "../controllers/test.controller.js";

const router = express.Router();

router.post("/populate", seedDatabase);

export default router;