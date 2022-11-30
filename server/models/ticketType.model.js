import mongoose from "mongoose";

const TicketType = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    iconName: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        default: "#000000"
    }
});

export default mongoose.model("TicketType", TicketType);