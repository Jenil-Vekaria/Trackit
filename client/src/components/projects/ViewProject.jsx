import {
	Flex,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectService from "../../services/project-service";

const ViewProject = () => {
	const [projectInfo, setProjectInfo] = useState({});
	const { projectID } = useParams();

	const getProjectInfo = async () => {
		const project = await ProjectService.getProjectInfo(projectID);
		console.log(project);
		setProjectInfo(project);
	};

	useEffect(() => {
		getProjectInfo();
	}, []);

	return (
		<Flex w="100%" direction="column">
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg">
					{projectInfo?.title}
				</Heading>
			</Flex>

			<Tabs
				isFitted
				variant="soft-rounded"
				colorScheme="purple"
				mt={5}
				h="100%"
			>
				<TabList
					backgroundColor={useColorModeValue("gray.50")}
					borderRadius="9999px"
				>
					<Tab>Tickets</Tab>
					<Tab>Contributors</Tab>
					<Tab>Project Setting</Tab>
				</TabList>

				<TabPanels h="100%">
					<TabPanel>Ticket Panel</TabPanel>
					<TabPanel>Contributors Panel</TabPanel>
					<TabPanel>Project Settings Panel</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default ViewProject;
