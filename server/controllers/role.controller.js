import Role from "../models/role.model.js";
import User from "../models/user.model.js";

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({});

        return res.json({ roles });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const addRole = async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const exisitingRole = await Role.findOne({ name });

        if (exisitingRole) {
            return res.status(400).json({ message: "Role already exist" });
        }

        const role = await Role.create({ name, permissions });

        return res.json({ role });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteRole = async (req, res) => {
    const { roleId } = req.params;

    try {
        const totalUserWithThisRole = await User.find({ roleId }).count();

        if (totalUserWithThisRole > 0) {
            return res.status(405).json({ message: `Forbidden: ${totalUserWithThisRole} user(s) is associated with this role. ` });
        }

        await Role.deleteOne({ _id: roleId });

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateRole = async (req, res) => {
    const { roleId } = req.params;
    const { name, permissions } = req.body;

    try {
        const updatedRole = await Role.findOneAndUpdate({ _id: roleId }, { name, permissions }, { new: true });

        return res.json({ updatedRole });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }

};