import { usePermissions } from "../../hooks/usePermissions";

const PermissionsRender = ({ permissionCheck, children }) => {
	const canRender = usePermissions(permissionCheck);

	if (canRender) {
		return children;
	}
	return null;
};

export default PermissionsRender;
