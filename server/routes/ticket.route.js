import express from "express";
import { getUserTickets, getProjectTickets, getTicketInfo, createTicket, updateTicket, deleteTicket } from "../controllers/ticket.controller.js";
const router = express.Router();

router.get("/user/:userId", getUserTickets);
router.get("/project/:projectId", getProjectTickets);
router.get("/:ticketId", getTicketInfo);

router.post("/project/:projectId", createTicket);

router.patch("/:ticketId", updateTicket);

router.delete("/:ticketId", deleteTicket);

export default router;