import express from "express";
import { getUserTickets, getProjectTickets, getTicketInfo, createTicket, updateTicket, deleteTicket } from "../controllers/ticket.controller.js";
import { validateResource } from "../middleware/middleware.js";
import { createTicketSchema } from "../schema/validation.schema.js";

const router = express.Router();

router.get("/user/:userId", getUserTickets);
router.get("/project/:projectId", getProjectTickets);
router.get("/:ticketId", getTicketInfo);

router.post("/project/:projectId", validateResource(createTicketSchema), createTicket);

router.patch("/project/:projectId", validateResource(createTicketSchema), updateTicket);

router.delete("/:ticketId", deleteTicket);

export default router;