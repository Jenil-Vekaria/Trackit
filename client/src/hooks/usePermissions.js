import { useState, useEffect } from "react";
import AuthService from "../services/auth-service";
import MiscellaneousService from "../services/miscellaneous-service";


export const usePermissions = (permissionCheck) => {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        setPermissions(user.roleId.permissions);
    }, []);

    return permissionCheck(permissions);
};