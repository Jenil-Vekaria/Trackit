import { Avatar, Tooltip } from "@chakra-ui/react";
import React from "react";

const TooltipAvatar = (props) => {
	return (
		<Tooltip label={props.name}>
			<Avatar {...props} />
		</Tooltip>
	);
};

export default TooltipAvatar;
