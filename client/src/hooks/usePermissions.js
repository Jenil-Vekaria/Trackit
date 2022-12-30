import { useState, useEffect } from "react";
import AuthService from "../services/auth-service";
import MiscellaneousService from "../services/miscellaneous-service";


export const usePermissions = (permissionCheck) => {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const currentUserRole = MiscellaneousService.getRoleInfo(
            AuthService.getCurrentUser().roleId,
        );

        setPermissions(currentUserRole.permissions);
    }, []);

    return permissionCheck(permissions);
};