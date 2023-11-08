import TicketType from "../models/ticketType.model.js";
import Ticket from "../models/ticket.model.js";

export const getTicketType = async (req, res) => {
    try {

        const ticketType = await TicketType.find({});

        return res.json({ ticketType });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const addTicketType = async (req, res) => {
    const { name, iconName, colour } = req.body;

    try {
        //ensure no duplication
        const existingTicketType = await TicketType.findOne({ name });

        if (existingTicketType) {
            return res.status(403).json({ message: "Ticket type already exist with name as " + name });
        }

        const ticketType = await TicketType.create({ name, iconName, colour });

        return res.status(200).json({ ticketType });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const updateTicketType = async (req, res) => {
    const { _id, name, iconName, colour } = req.body;

    try {
        const ticketType = await TicketType.findOne({ _id });

        if (!ticketType) {
            return res.status(403).json({ message: "Ticket not found" });
        }

        ticketType.name = name;
        ticketType.iconName = iconName;
        ticketType.colour = colour;

        const updatedTicketType = await ticketType.save();

        return res.json({ ticketType: updatedTicketType });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const deleteTicketType = async (req, res) => {
    const { name } = req.params;

    try {
        const ticketType = await TicketType.findOne({ name });

        if (!ticketType) {
            return res.status(403).json({ message: "Ticket type not found" });
        }

        const totalTicketsWithThisTicketType = await Ticket.find({ type: ticketType._id }).count();

        if (totalTicketsWithThisTicketType > 0) {
            return res.status(405).json({ message: `Forbidden: ${totalTicketsWithThisTicketType} ticket(s) is associated with ticket type "${name}"` });
        }

        await TicketType.deleteOne({ name });

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};