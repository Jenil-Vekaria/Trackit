import Project from "../models/project.model.js";
import Ticket from "../models/ticket.model.js";
import { validateObjectId } from "../util/utils.js";

export const getUserTickets = async (req, res) => {

    const { userId } = req.params;

    try {

        const tickets = await Ticket.find({ assignees: userId })
            .populate({ path: "projectId", select: { title: 1 } })
            .populate({ path: "type", select: { __v: 0 } })
            .populate({ path: "createdBy", select: { firstName: 1, lastName: 1 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 } });

        return res.json(tickets);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }

};

export const getProjectTickets = async (req, res) => {
    const { projectId } = req.params;

    try {
        const userId = req.user._id;

        // Ensure the user belongs to the project
        const project = await Project.findById(projectId);

        if (!project.assignees.includes(userId)) {
            return res.status(403).json({ message: "Not authorized to get project tickets" });
        }

        const tickets = await Ticket.find({ projectId })
            .populate({ path: "projectId", select: { title: 1 } })
            .populate({ path: "createdBy", select: { firstName: 1, lastName: 1 } })
            .populate({ path: "type", select: { __v: 0 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 }, populate: { path: "roleId", select: { _id: 0, name: 1 } } });

        return res.json(tickets);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const getTicketInfo = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const userId = req.user._id;

        // Ensure the ticket exist
        const ticket = await Ticket.findOne({ _id: ticketId })
            .populate({ path: "projectId", select: { title: 1 } })
            .populate({ path: "type", select: { __v: 0 } })
            .populate({ path: "createdBy", select: { firstName: 1, lastName: 1 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 } });

        // Ensure the user belongs to the project
        const project = await Project.findById({ _id: ticket.projectId });

        if (!project.assignees.includes(userId)) {
            return res.status(403).json({ message: "Not authorized to view the ticket" });
        }

        if (!ticket) {
            return res.status(403).json({ message: "Ticket does not exist" });
        }

        return res.json(ticket);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
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
        const userId = req.user._id;

        // Ensure the user belongs to the project
        const project = await Project.findOne({ _id: projectId });

        if (!project.assignees.includes(userId)) {
            return res.status(403).json({ message: "Not authorized to add tickets to a project" });
        }

        const newTicket = await Ticket.create({ projectId, type, title, description, status, assignees, estimatedTime, estimatedTimeUnit, createdBy: userId });

        const ticket = await Ticket.findById(newTicket._id)
            .populate({ path: "projectId", select: { title: 1 } })
            .populate({ path: "type", select: { __v: 0 } })
            .populate({ path: "createdBy", select: { firstName: 1, lastName: 1 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 } });

        return res.json(ticket);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const updateTicket = async (req, res) => {
    const { projectId } = req.params;

    try {
        const userId = req.user._id;

        validateObjectId(req.body._id, "Invalid ticket id", res);

        // Ensure the user belongs to the project
        const project = await Project.findById(projectId);

        if (!project.assignees.includes(userId)) {
            return res.status(403).json({ message: "Not authorized to add tickets to a project" });
        }


        await Ticket.findOneAndUpdate({ _id: req.body._id }, { ...req.body, updatedOn: Date.now() });

        const updatedTicket = await Ticket.findById(req.body._id)
            .populate({ path: "projectId", select: { title: 1 } })
            .populate({ path: "type", select: { __v: 0 } })
            .populate({ path: "createdBy", select: { firstName: 1, lastName: 1 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 } });

        return res.json(updatedTicket);


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const deleteTicket = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const result = await Ticket.deleteOne({ _id: ticketId });

        if (result.deletedCount === 0) {
            return res.status(403).json({ message: "Ticket does not exist" });
        }

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};