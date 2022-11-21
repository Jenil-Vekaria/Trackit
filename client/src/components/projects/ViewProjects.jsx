import { Flex, Heading, Button, Spacer, useDisclosure } from "@chakra-ui/react";
import { getProjects } from "../../features/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Link as ReachLink } from "react-router-dom";
import { PROJECT_COLUMNS } from "../../util/TableDataDisplay";
import React, { useEffect } from "react";
import ProjectService from "../../services/project-service";
import DataTable from "../others/DataTable";

const ViewProjects = () => {
	const projects = useSelector(getProjects);
	const dispatch = useDispatch();
	const disclosure = useDisclosure();

	useEffect(() => {
		dispatch(ProjectService.getMyProjects());
	}, []);

	const handleRowClick = (rowData) => {
		//TODO
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

			<DataTable
				data={projects}
				columns={PROJECT_COLUMNS}
				searchPlaceholder="Search projects"
				handleRowClick={handleRowClick}
				height={500}
			/>
		</Flex>
	);
};

export default ViewProjects;
