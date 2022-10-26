import Role from "../models/role.js";

export const addRole = async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const exisitingRole = await Role.findOne({ name });

        if (exisitingRole) {
            return res.status(400).json({ error: "Role already exist" });
        }

        await Role.create({ name, permissions });

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};