import { useState, useEffect } from "react";
import AuthService from "../services/auth-service";
import useAuthStore from "./useAuth";


export const usePermissions = (permissionCheck) => {
    const [permissionsList, setPermissionsList] = useState([]);
    const useAuth = useAuthStore();

    useEffect(() => {
        const user = useAuth.userProfile;

        setPermissionsList(user?.roleId.permissions);
    }, []);

    return permissionCheck(permissionsList);
};