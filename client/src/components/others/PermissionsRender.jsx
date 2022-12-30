import { Box } from "@chakra-ui/react";
import React from "react";
import { usePermissions } from "../../hooks/usePermissions";

const PermissionsRender = ({ permissionCheck, children }) => {
	const canRender = usePermissions(permissionCheck);

	if (canRender) {
		return children;
	}
	return null;
	// return <Box display={canRender ? "block" : "none"}>{children}</Box>;
};

export default PermissionsRender;
