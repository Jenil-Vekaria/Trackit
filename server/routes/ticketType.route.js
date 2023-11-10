import express from 'express';
import { addTicketType, deleteTicketType, updateTicketType, getTicketType } from '../controllers/ticketType.controller.js';
import { checkUserPermissions, validateResource } from "../middleware/middleware.js";
import { createTicketTypeSchema } from '../schema/validation.schema.js';
import { Permissions } from '../util/utils.js';

const router = express.Router();
const validation = [checkUserPermissions("ticket type", Permissions.canManageAdminPage), validateResource(createTicketTypeSchema)];

router.get("/", getTicketType);
router.post("/", validation, addTicketType);
router.patch("/", validation, updateTicketType);
router.delete("/:ticketTypeId", deleteTicketType);

export default router;