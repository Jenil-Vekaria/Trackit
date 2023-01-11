import express from "express";
import { getUserTickets, getProjectTickets, getTicketInfo, createTicket, updateTicket, deleteTicket } from "../controllers/ticket.controller.js";
import { validateParamId, validateResource } from "../middleware/middleware.js";
import { createTicketSchema } from "../schema/validation.schema.js";

const router = express.Router();

router.get("/user/:userId", getUserTickets);
router.get("/project/:projectId", getProjectTickets);
router.get("/:ticketId", getTicketInfo);

router.post("/project/:projectId", [validateResource(createTicketSchema), validateParamId("projectId")], createTicket);

router.patch("/project/:projectId", validateParamId("projectId"), updateTicket);

router.delete("/:ticketId", deleteTicket);

export default router;