import mongoose from "mongoose";
import ProjectAssginee from "../models/projectAssignee.model.js";
import Ticket from "../models/ticket.model.js";
import * as permissionCheck from "../util/permissionCheck.js";
import { getUserRole } from "../util/utils.js";

export const getUserTickets = async (req, res) => {
};

export const getProjectTickets = async (req, res) => {
    const { projectId } = req.params;

    try {
        // Verify the permissions
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageTicket(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to get project tickets" });
        }

        // Ensure the user belongs to the project
        const projectAssingee = await ProjectAssginee.findOne({ projectId, userId });

        if (!projectAssingee) {
            return res.status(403).json({ error: "Not authorized to get project tickets" });
        }

        const tickets = await Ticket.aggregate([
            {
                $match: {
                    projectId: mongoose.Types.ObjectId(projectId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "assignees",
                    foreignField: "_id",
                    as: "assignees",
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                fullName: { $concat: ["$firstName", " ", "$lastName"] }
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "tickettypes",
                    localField: "type",
                    foreignField: "_id",
                    as: "type",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                                colour: 1,
                                iconName: 1
                            }
                        }
                    ]
                }
            }
        ]);

        return res.json({ tickets });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getTicketInfo = async (req, res) => {
    const { ticketId } = req.params;

    try {
        // Verify the permissions
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageTicket(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to view the ticket" });
        }

        // Ensure the ticket exist
        const ticket = await Ticket.findOne({ _id: ticketId });

        // Ensure the user belongs to the project
        const projectAssingee = await ProjectAssginee.findOne({ projectId: ticket.projectId, userId });

        if (!projectAssingee) {
            return res.status(403).json({ error: "Not authorized to view the ticket" });
        }

        if (!ticket) {
            return res.status(403).json({ message: "Ticket does not exist" });
        }

        return res.json({ ticket });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const createTicket = async (req, res) => {
    const { projectId } = req.params;
    const {
        type,
        title,
        description,
        status,
        tags,
        assignees
    } = req.body;

    try {

        // Verify the permissions
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageTicket(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to add tickets to a project" });
        }

        // Ensure the user belongs to the project
        const projectAssingee = await ProjectAssginee.findOne({ projectId, userId });

        if (!projectAssingee) {
            return res.status(403).json({ error: "Not authorized to add tickets to this project" });
        }

        const ticket = await Ticket.create({ projectId, type, title, description, status, tags, assignees });

        return res.json({ ticket });


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateTicket = async (req, res) => {
    const { ticketId } = req.params;
    const {
        type,
        title,
        description,
        status,
        tags,
        assignees
    } = req.body;

    try {

        // Verify the permissions
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageTicket(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to add tickets to a project" });
        }

        // Ensure the ticket exist
        const ticket = await Ticket.findOne({ _id: ticketId });


        // Ensure the user belongs to the project
        const projectAssingee = await ProjectAssginee.findOne({ projectId: ticket.projectId, userId });

        if (!projectAssingee) {
            return res.status(403).json({ error: "Not authorized to add tickets to this project" });
        }

        if (!ticket) {
            return res.status(403).json({ message: "Ticket does not exist" });
        }

        ticket.type = type || ticket.type;
        ticket.title = title || ticket.title;
        ticket.description = description || ticket.description;
        ticket.status = status || ticket.status;
        ticket.tags = tags || ticket.tags;
        ticket.assignees = assignees || ticket.assignees;
        ticket.updatedOn = Date.now();


        const updatedTicket = await ticket.save({ validateBeforeSave: true });

        return res.json({ ticket: updatedTicket });


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteTicket = async (req, res) => {

};