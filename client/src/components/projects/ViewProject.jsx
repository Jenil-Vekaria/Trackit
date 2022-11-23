import {
	Button,
	Flex,
	Heading,
	IconButton,
	Spacer,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../../services/project-service";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AuthService from "../../services/auth-service";

const ViewProject = () => {
	const [projectInfo, setProjectInfo] = useState({});
	const { projectID } = useParams();
	const navigate = useNavigate();

	const isProjectAuthor = () => {
		const signedInUserID = AuthService.getCurrentUser().id;
		return projectInfo?.authorId === signedInUserID;
	};

	const getProjectInfo = async () => {
		const project = await ProjectService.getProjectInfo(projectID);
		if (project) {
			setProjectInfo(project);
		} else {
			navigate("/404");
		}
	};

	useEffect(() => {
		getProjectInfo();
	}, []);

	return (
		<Flex w="100%" direction="column">
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg">
					<IconButton
						icon={<ArrowBackIcon />}
						variant="link"
						size="lg"
						colorScheme="black"
						onClick={() => navigate(-1)}
					/>
					{projectInfo?.title}
				</Heading>

				<Spacer />

				<Button colorScheme="whatsapp" mr={5}>
					Add Ticket
				</Button>

				{isProjectAuthor() ? (
					<Button
						colorScheme="purple"
						onClick={() => navigate(`/projects/${projectID}/edit`)}
					>
						Edit Project
					</Button>
				) : null}
			</Flex>

			<Tabs variant="soft-rounded" colorScheme="purple" mt={5} h="100%">
				<TabList>
					<Tab>Tickets</Tab>
				</TabList>

				<TabPanels h="100%">
					<TabPanel>Ticket Panel</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default ViewProject;
