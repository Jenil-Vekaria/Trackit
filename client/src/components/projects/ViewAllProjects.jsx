import { Flex, Heading, Button, Spacer, useDisclosure } from "@chakra-ui/react";
import { getProjects } from "../../features/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Link as ReachLink, useNavigate } from "react-router-dom";
import { PROJECTS_COLUMNS } from "../../util/TableDataDisplay";
import React, { useEffect } from "react";
import ProjectService from "../../services/project-service";
import Table from "../others/Table";

const ViewAllProjects = () => {
	const projects = useSelector(getProjects);
	const dispatch = useDispatch();
	const disclosure = useDisclosure();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(ProjectService.getMyProjects());
	}, []);

	const handleRowClick = (rowProps, event) => {
		const projectId = projects[rowProps.rowIndex]._id;
		//TODO
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
					<Button
						colorScheme="purple"
						variant="solid"
						onClick={disclosure.onOpen}
					>
						Add Project
					</Button>
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
