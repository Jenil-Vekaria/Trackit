import Project from "../models/project.model.js";
import Ticket from "../models/ticket.model.js";
import * as permissionCheck from "../util/permissionCheck.js";
import { canPerformAction, validateObjectId } from "../util/utils.js";

export const getUserTickets = async (req, res) => {

    const { userId } = req.params;

    try {
        // Verify the permissions
        if (!req.user._id.equals(userId)) {
            return res.status(403).json({ message: "Not authorized to view the tickets" });
        }

        const tickets = await Ticket.find({ assignees: userId })
            .populate({ path: "projectId", select: { _id: 0, title: 1 } })
            .populate({ path: "type", select: { __v: 0 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 } });

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

        const tickets = await Ticket.find({ projectId })
            .populate({ path: "projectId", select: { _id: 0, title: 1 } })
            .populate({ path: "type", select: { _id: 0, __v: 0 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 } });

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
        const ticket = await Ticket.findOne({ _id: ticketId })
            .populate({ path: "projectId", select: { _id: 0, title: 1 } })
            .populate({ path: "type", select: { _id: 0, __v: 0 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 } });

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
        const project = await Project.findOne({ _id: projectId });

        if (!project.assignees.includes(userId)) {
            return res.status(403).json({ message: "Not authorized to add tickets to a project" });
        }

        const newTicket = await Ticket.create({ projectId, type, title, description, status, assignees, estimatedTime, estimatedTimeUnit, createdBy: userId });

        const ticket = await Ticket.findById(newTicket._id)
            .populate({ path: "projectId", select: { _id: 0, title: 1 } })
            .populate({ path: "type", select: { _id: 0, __v: 0 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 } });

        return res.json({ ticket });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateTicket = async (req, res) => {
    const { projectId } = req.params;

    try {
        validateObjectId(projectId, "Invalid project id", res);
        validateObjectId(req.body._id, "Invalid ticket id", res);

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


        await Ticket.findOneAndUpdate({ _id: req.body._id }, req.body);

        const updatedTicket = await Ticket.findById(req.body._id)
            .populate({ path: "projectId", select: { _id: 0, title: 1 } })
            .populate({ path: "type", select: { _id: 0, __v: 0 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 } });

        return res.json({ ticket: updatedTicket });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTicket = async (req, res) => {
    const { ticketId } = req.params;

    try {

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