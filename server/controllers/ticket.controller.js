import Project from "../models/project.model.js";
import Ticket from "../models/ticket.model.js";
import * as permissionCheck from "../util/permissionCheck.js";
import { canPerformAction } from "../util/utils.js";

export const getUserTickets = async (req, res) => {

    const { userId } = req.params;

    try {
        // Verify the permissions
        if (!req.user._id.equals(userId)) {
            return res.status(403).json({ message: "Not authorized to view the tickets" });
        }

        const tickets = await Ticket.find({ assignees: userId });

        return res.json({ tickets });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

export const getProjectTickets = async (req, res) => {
    const { projectId } = req.params;

    try {
        // Verify the permissions
        const userId = req.user._id;

        if (!canPerformAction(permissionCheck.canManageTicket, req.user)) {
            return res.status(403).json({ message: "Not authorized to get project tickets" });
        }

        // Ensure the user belongs to the project
        const project = await Project.findById(projectId);

        if (!project.assignees.includes(userId)) {
            return res.status(403).json({ message: "Not authorized to get project tickets" });
        }

        const tickets = await Ticket.find({ projectId });

        return res.json({ tickets });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTicketInfo = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const userId = req.user._id;

        // Verify the permissions
        if (!canPerformAction(permissionCheck.canManageTicket, req.user)) {
            return res.status(403).json({ message: "Not authorized to view the ticket" });
        }

        // Ensure the ticket exist
        const ticket = await Ticket.findOne({ _id: ticketId });

        // Ensure the user belongs to the project
        const project = await Project.findById({ _id: ticket.projectId });

        if (!project.assignees.includes(userId)) {
            return res.status(403).json({ message: "Not authorized to view the ticket" });
        }

        if (!ticket) {
            return res.status(403).json({ message: "Ticket does not exist" });
        }

        return res.json({ ticket });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTicket = async (req, res) => {
    const { projectId } = req.params;
    const {
        type,
        title,
        description,
        status,
        assignees,
        estimatedTime,
        estimatedTimeUnit
    } = req.body;

    try {
        // Verify the permissions
        const userId = req.user._id;

        if (!canPerformAction(permissionCheck.canManageTicket, req.user)) {
            return res.status(403).json({ message: "Not authorized to add tickets to a project" });
        }

        // Ensure the user belongs to the project
        const project = await Project.findById(projectId);

        if (!project.assignees.includes(userId)) {
            return res.status(403).json({ message: "Not authorized to add tickets to a project" });
        }

        const ticket = await Ticket.create({ projectId, type, title, description, status, assignees, estimatedTime, estimatedTimeUnit, createdBy: userId });

        return res.json({ ticket });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateTicket = async (req, res) => {
    const { projectId } = req.params;

    const {
        _id,
        type,
        title,
        description,
        status,
        tags,
        assignees,
        estimatedTime,
        estimatedTimeUnit
    } = req.body;

    try {

        // Verify the permissions
        const userId = req.user._id;

        if (!canPerformAction(permissionCheck.canManageTicket, req.user)) {
            return res.status(403).json({ message: "Not authorized to add tickets to a project" });
        }

        // Ensure the user belongs to the project
        const project = await Project.findById(projectId);

        if (!project.assignees.includes(userId)) {
            return res.status(403).json({ message: "Not authorized to add tickets to a project" });
        }

        // Ensure the ticket exist
        const ticket = await Ticket.findOne({ _id });

        if (!ticket) {
            return res.status(403).json({ message: "Ticket does not exist" });
        }

        ticket.type = type || ticket.type;
        ticket.title = title || ticket.title;
        ticket.description = description || ticket.description;
        ticket.status = status || ticket.status;
        ticket.tags = tags || ticket.tags;
        ticket.assignees = assignees || ticket.assignees;
        ticket.estimatedTime = estimatedTime || ticket.estimatedTime;
        ticket.estimatedTimeUnit = estimatedTimeUnit || ticket.estimatedTimeUnit;
        ticket.updatedOn = Date.now();


        const updatedTicket = await ticket.save({ validateBeforeSave: true });

        return res.json({ ticket: updatedTicket });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTicket = async (req, res) => {
    const { ticketId } = req.params;

    try {
        //Get user permssion
        const userId = req.user._id;

        if (!canPerformAction(permissionCheck.canManageTicket, req.user)) {
            return res.status(403).json({ message: "Not authorized to delete the ticket" });
        }

        const ticket = await Ticket.findOne({ _id: ticketId });

        if (!ticket) {
            return res.status(403).json({ message: "Ticket does not exist" });
        }

        await ticket.delete();

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};