import express from 'express';
import { addTicketType, deleteTicketType, updateTicketType } from '../controllers/ticketType.controller.js';
import { validateResource } from "../middleware/middleware.js";
import { createTicketTypeSchema } from '../schema/ticketType.schema.js';

const router = express.Router();

router.post("/", validateResource(createTicketTypeSchema), addTicketType);
router.patch("/", validateResource(createTicketTypeSchema), updateTicketType);
router.delete("/:name", deleteTicketType);

export default router;