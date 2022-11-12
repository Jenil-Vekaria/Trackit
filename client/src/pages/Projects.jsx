import { Flex, Heading, Button, Spacer, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchBarFilter from "../components/SearchBarFilter";
import ProjectService from "../services/project-service";
import { PROJECT_COLUMNS } from "../util/TableDataDisplay";
import DataTable from "../components/DataTable";
// import AddProjectModal from "../components/AddProjectModal";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	// const disclosure = useDisclosure();

	useEffect(() => {
		const getProjects = async () => {
			const projects = await ProjectService.getMyProjects();
			console.log(projects);
			setProjects(projects);
		};

		getProjects();
	}, []);

	return (
		<Flex w="100%" p={10} direction="column">
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg">
					Projects
				</Heading>
				<Spacer />
				<Button colorScheme="purple" variant="solid">
					Add Project
				</Button>
			</Flex>
			<SearchBar placeholder="Search projects">
				<SearchBarFilter
					name={"Author"}
					multiSelect={true}
					options={["Author #1", "Author #2", "Author #3", "Author #4"]}
				/>
			</SearchBar>

			<br />
			<DataTable data={projects} columns={PROJECT_COLUMNS} />

			{/* <AddProjectModal {...disclosure} /> */}
		</Flex>
	);
};

export default Projects;
