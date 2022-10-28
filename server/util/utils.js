import Role from "../models/role";
import UserRole from "../models/userRole";

export const getUserRole = async (userId) => {

    try {
        const userRole = await UserRole.findOne({ userId });
        const role = await Role.findOne({ _id: userRole.roleId });

        if (!role)
            throw "Role not found";

        return role;
    } catch (error) {
        console.error(error);
    }
}; 