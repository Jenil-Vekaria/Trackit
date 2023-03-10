import express from "express";
import { getUserTickets, getProjectTickets, getTicketInfo, createTicket, updateTicket, deleteTicket } from "../controllers/ticket.controller.js";
import { checkUserPermissions, validateParamId, validateResource } from "../middleware/middleware.js";
import { createTicketSchema } from "../schema/validation.schema.js";
import { Permissions } from "../util/utils.js";

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
    [checkUserPermissions("tickets", Permissions.canManageTickets), validateParamId("projectId")],
    updateTicket);

router.delete("/:ticketId",
    [checkUserPermissions("tickets", Permissions.canManageTickets), validateParamId("ticketId")],
    deleteTicket);

export default router;