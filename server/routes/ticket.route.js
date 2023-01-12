import express from "express";
import { getUserTickets, getProjectTickets, getTicketInfo, createTicket, updateTicket, deleteTicket } from "../controllers/ticket.controller.js";
import { checkUserPermissions, validateParamId, validateResource } from "../middleware/middleware.js";
import { createTicketSchema } from "../schema/validation.schema.js";
import { canManageTicket } from "../util/permissionCheck.js";

const router = express.Router();

router.get("/user/:userId", getUserTickets);

router.get("/project/:projectId",
    validateParamId("projectId"),
    getProjectTickets);

router.get("/:ticketId",
    validateParamId("ticketId"),
    getTicketInfo);

router.post("/project/:projectId",
    [validateResource(createTicketSchema), validateParamId("projectId")],
    createTicket);

router.patch("/project/:projectId",
    [checkUserPermissions("tickets", canManageTicket), validateParamId("projectId")],
    updateTicket);

router.delete("/:ticketId",
    [checkUserPermissions("tickets", canManageTicket), validateParamId("ticketId")],
    deleteTicket);

export default router;