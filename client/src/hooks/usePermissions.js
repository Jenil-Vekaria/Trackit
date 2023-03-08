import { useState, useEffect } from "react";
import AuthService from "../services/auth-service";


export const usePermissions = (permissionCheck) => {
    const [permissionsList, setPermissionsList] = useState([]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        setPermissionsList(user.roleId.permissions);
    }, []);

    return permissionCheck(permissionsList);
};