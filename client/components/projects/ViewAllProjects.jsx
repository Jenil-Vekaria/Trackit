import { Flex, Heading, Button, Spacer, useDisclosure } from "@chakra-ui/react";
import { getProjects } from "../../features/projectSlice";
import { useSelector } from "react-redux";
import { Link, Link as ReachLink, useNavigate } from "react-router-dom";
import { PROJECTS_COLUMNS } from "../../util/TableDataDisplay";
import React, { useEffect } from "react";
import ProjectService from "../../services/project-service";
import Table from "../others/Table";
import PermissionsRender from "../others/PermissionsRender";
import { Permissions } from "../../util/Utils";

const ViewAllProjects = () => {
	const projects = useSelector(getProjects);
	const disclosure = useDisclosure();
	const navigate = useNavigate();

	const getMyProjects = async () => {
		await ProjectService.getMyProjects();
	};

	useEffect(() => {
		getMyProjects();
	}, []);

	const handleRowClick = (rowData) => {
		const projectId = rowData.data._id;
		navigate(`/projects/${projectId}`);
	};

	return (
		<Flex w="100%" maxHeight="100vh" direction="column">
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg">
					Projects
				</Heading>
				<Spacer />
				<Link to="/projects/add" as={ReachLink}>
					<PermissionsRender permissionCheck={Permissions.canManageProject}>
						<Button
							colorScheme="purple"
							variant="solid"
							onClick={disclosure.onOpen}
						>
							Add Project
						</Button>
					</PermissionsRender>
				</Link>
			</Flex>

			<br />

			<Table
				tableData={projects}
				columns={PROJECTS_COLUMNS}
				searchPlaceholder="Search for projects"
				onRowClick={handleRowClick}
			/>
		</Flex>
	);
};

export default ViewAllProjects;
