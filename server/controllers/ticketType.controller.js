import * as permissionCheck from "../util/permissionCheck.js";
import TicketType from "../models/ticketType.model.js";
import { getUserRole } from "../util/utils.js";

export const addTicketType = async (req, res) => {
    const { name, iconName, colour } = req.body;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        //Only admin should be able to add custom ticketType - if user can projectMemeber -> user is admin
        if (!permissionCheck.canManageProjectMember(userRole.permissions)) {
            return res.status(403).json({ message: "Not authorized to manage ticket types" });
        }

        //ensure no duplication
        const existingTicketType = await TicketType.findOne({ name });

        if (existingTicketType) {
            return res.status(403).json({ message: "Ticket already exist with name as " + name });
        }

        const ticketType = await TicketType.create({ name, iconName, colour });

        return res.status(200).json({ ticketType });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTicketType = async (req, res) => {
    const { name, iconName, colour } = req.body;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        //Only admin should be able to add custom ticketType - if user can projectMemeber -> user is admin
        if (!permissionCheck.canManageProjectMember(userRole.permissions)) {
            return res.status(403).json({ message: "Not authorized to manage ticket types" });
        }

        const ticketType = await TicketType.findOne({ name });

        if (!ticketType) {
            return res.status(403).json({ message: "Ticket not found" });
        }

        ticketType.name = name;
        ticketType.iconName = iconName;
        ticketType.colour = colour;

        const updatedTicketType = await ticketType.save();

        return res.json({ ticketType: updatedTicketType });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTicketType = async (req, res) => {
    const { name } = req.params;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        //Only admin should be able to add custom ticketType - if user can projectMemeber -> user is admin
        if (!permissionCheck.canManageProjectMember(userRole.permissions)) {
            return res.status(403).json({ message: "Not authorized to manage ticket types" });
        }

        const ticketType = await TicketType.findOne({ name });

        if (!ticketType) {
            return res.status(403).json({ message: "Ticket not found" });
        }

        await ticketType.delete();

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};