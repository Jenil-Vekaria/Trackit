import { Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const Projects = () => {
	return (
		<Flex w="100%" maxHeight="100vh" p={10}>
			<Outlet />
		</Flex>
	);
};

export default Projects;
